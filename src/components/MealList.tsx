// Displays meals as a list
import type { Meal } from "../types/meal";
import MealListItem from "./MealListItem";

function MealList({ meals }: { meals: Meal[] }) {
    return (
        <div className="meal-list">
            {meals.map(meal => (
                <MealListItem
                    key={meal.idMeal}
                    meal={meal}
                    meals={meals}
                />
            ))}
        </div>
    );
}

export default MealList;