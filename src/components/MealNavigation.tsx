// Previous and next arrows
import { Link } from "react-router-dom";
import type { Meal } from "../types/meal";

interface MealNavigationProps {
    meals: Meal[];
    currentMealId: string;
}

function MealNavigation({ meals, currentMealId }: MealNavigationProps) {

    const currentIndex = meals.findIndex(meal => meal.idMeal == currentMealId);

    if (currentIndex == -1 || meals.length <= 1) {
        return null;
    }

    const previousIndex = (currentIndex - 1 + meals.length) % meals.length;
    const nextIndex = (currentIndex + 1) % meals.length;
    const previousMeal = meals[previousIndex];
    const nextMeal = meals[nextIndex];

    return (
        <div className="meal-navigation">
            <Link to={`/recipe/${previousMeal.idMeal}`} state={{ meals }}>
                ← Previous
            </Link>
            <Link to={`/recipe/${nextMeal.idMeal}`} state={{ meals }}>
                Next →
            </Link>
        </div>
    );
}

export default MealNavigation;