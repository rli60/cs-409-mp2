// All fetch calls (search, categories, id, area)
import axios from 'axios'
import type { CategoriesResponse, Ingredient, Meal, MealsResponse, RawMeal, MealSummary, MealSummaryResponse } from "../types/meal";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

// Helper function
function convertMeal(rawMeal: RawMeal): Meal {
    const ingredients: Ingredient[] = [];
    for (let i = 0; i < 20; ++i) { // Extracting ingredient
        const name = rawMeal[`strIngredient${i+1}`];
        const measurement = rawMeal[`strMeasure${i+1}`];

        if (name != null && name.trim() != "") {
            ingredients.push({name: name.trim(), measurement: (measurement ?? "").trim()});
        }
    }

    const meal: Meal = { 
        idMeal: rawMeal.idMeal, 
        strMeal: rawMeal.strMeal,
        strCategory: rawMeal.strCategory,
        strArea: rawMeal.strArea,
        strInstructions: rawMeal.strInstructions,
        strMealThumb: rawMeal.strMealThumb,
        ingredients
    };

    return meal;
}

// Return meal by ID
export async function getMealById(id: string): Promise<Meal | null> {
    const resp = await axios.get(`${API_URL}/lookup.php?i=${encodeURIComponent(id)}`);
    const data: MealsResponse = resp.data;

    const extractedMeal = data.meals?.[0];
    if (!extractedMeal) return null;

    const meal: Meal = convertMeal(extractedMeal);
    return meal;
}

// Returns all meals with specified category
export async function filterMealsByCategory(category: string): Promise<MealSummary[]> {
    const resp = await axios.get(`${API_URL}/filter.php?c=${encodeURIComponent(category)}`);
    const data: MealSummaryResponse = resp.data;

    const meals: MealSummary[] = [];
    if (data.meals != null) {
        for (const meal of data.meals) {
            meals.push({
                idMeal: meal.idMeal,
                strMeal: meal.strMeal,
                strMealThumb: meal.strMealThumb,
                strCategory: category,
            });
        }
    }

    return meals;
}

// Returns all meals with specified name
export async function searchMealsByName(name: string): Promise<Meal[]> {
    const resp = await axios.get(`${API_URL}/search.php?s=${encodeURIComponent(name)}`);
    const data: MealsResponse = resp.data;

    const meals: Meal[] = [];
    if (data.meals != null) {
        for (const rawMeal of data.meals) {
            meals.push(convertMeal(rawMeal));
        }
    }

    return meals;
}

// Returns all meals with specified area
export async function filterMealsByArea(area: string): Promise<MealSummary[]> {
    const resp = await axios.get(`${API_URL}/filter.php?a=${encodeURIComponent(area)}`);
    const data: MealSummaryResponse = resp.data;

    const meals: MealSummary[] = [];
    if (data.meals != null) {
        for (const meal of data.meals) {
            meals.push({
                idMeal: meal.idMeal,
                strMeal: meal.strMeal,
                strMealThumb: meal.strMealThumb,
                strArea: area,
            });
        }
    }

    return meals;
}

// Returns all recipe categories
export async function getCategories(): Promise<string[]> {
    const resp = await axios.get(`${API_URL}/categories.php`);
    const data: CategoriesResponse = resp.data;

    const categories: string[] = [];
    if (data.categories != null) {
        for (const category of data.categories) {
            categories.push(category.strCategory);
        }
    }

    return categories;
}

// Return all recipes (gallery)
export async function getAllMeals(): Promise<MealSummary[]> {
    const categories = await getCategories();

    const results = await Promise.all(
        categories.map(category => filterMealsByCategory(category))
    );

    const combinedMeals = results.flat();
    const uniqueMeals = Array.from(
        new Map(combinedMeals.map(meal => [meal.idMeal, meal])).values()
    );

    return uniqueMeals;
}