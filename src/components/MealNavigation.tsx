// Previous and next arrows
import { Link } from "react-router-dom";
import type { Meal } from "../types/meal";
import "./MealNavigation.css";

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
            <div className="nav-buttons">
                <Link to={`/recipe/${previousMeal.idMeal}`} state={{ meals }}>
                    <button>← Previous</button>
                </Link>
                <Link to={`/recipe/${nextMeal.idMeal}`} state={{ meals }}>
                    <button>Next →</button>
                </Link>
            </div>
        </div>
    );
}

export default MealNavigation;