// Used in the list filter
import { Link } from "react-router-dom";
import type { Meal } from "../types/meal";

interface MealListItemProps {
    meal: Meal;
    meals: Meal[];
}

function MealListItem({ meal, meals }: MealListItemProps) {
    return (
        <div className="list-item">
            <Link
                to={`/recipe/${meal.idMeal}`}
                state={{ meals }}
            >
                <img src={meal.strMealThumb}/>
                <div>
                    <b>{meal.strMeal}</b>
                    <p>{meal.strCategory}</p>
                    <p>{meal.strArea}</p>
                </div>
            </Link>
        </div>
    );
}

export default MealListItem;