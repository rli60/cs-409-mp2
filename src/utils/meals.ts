// Function implementations
import type { Meal } from "../types/meal";

// Filter meals
export function filterMealsBySearch(meals: Meal[], search: string): Meal[] {
    const query = search.trim().toLowerCase();
    if (query == "") {
        return meals;
    }

    const filteredMeals: Meal[] = [];
    for (const meal of meals) {
        if (meal.strMeal.toLowerCase().includes(query)) {
            filteredMeals.push(meal);
        }
    }

    return filteredMeals;
}

// Sort meals
// sortType: strMeal, strCategory, strArea
// sortDir: asc, desc
export function sortMeals(
    meals: Meal[], 
    sortType: "strMeal" | "strCategory" | "strArea", 
    sortDir: "asc" | "desc"
): Meal[] {
    const sortTypeMeals: Meal[] = [...meals].sort((a, b) => {
        const aVal = a[sortType] ?? "";
        const bVal = b[sortType] ?? "";
        return aVal.localeCompare(bVal);
    });

    if (sortDir == "desc") {
        return sortTypeMeals.reverse();
    }

    return sortTypeMeals;
}

// Displays filtered/sorted meals
export function displayMeals(
    meals: Meal[], 
    search: string,
    sortType: "strMeal" | "strCategory" | "strArea", 
    sortDir: "asc" | "desc"
): Meal[] {
    const filteredMeals: Meal[] = filterMealsBySearch(meals, search);
    const sortedMeals: Meal[] = sortMeals(filteredMeals, sortType, sortDir);
    return sortedMeals;
}