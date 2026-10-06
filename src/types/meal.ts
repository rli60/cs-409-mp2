// Meal interfaces

// Ingredient with measurement
export interface Ingredient {
    name: string;
    measurement: string;
}

// Raw API meal details
export interface RawMeal {
    idMeal: string;
    strMeal: string;
    strCategory: string | null;
    strArea: string | null;
    strInstructions: string;
    strMealThumb: string;
    [key: string]: string | null;
}

// Clean meal details
export interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string | null;
    strArea: string | null;
    strInstructions: string;
    strMealThumb: string;
    ingredients: Ingredient[]; // maps strIngredient to strMeasure
}

// Partial meal details
export interface MealSummary {
    idMeal: string;
    strMeal: string;
    strArea?: string;
    strMealThumb: string;
    strCategory?: string;
}

// JSON response
export interface MealsResponse {
    meals: RawMeal[] | null;
}

// JSON response
export interface MealSummaryResponse {
    meals: MealSummary[] | null;
}

// JSON response
export interface CategoriesResponse {
    categories: { strCategory: string }[] | null;
}