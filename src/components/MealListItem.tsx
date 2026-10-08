// Used in the list filter
import { Link } from "react-router-dom";
import type { Meal } from "../types/meal";
import "./MealListItem.css";

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
                <div className="meal-img">
                    <img src={meal.strMealThumb}/>
                </div>
                <div className="meal-description">
                    <b>{meal.strMeal}</b>
                    <p>{meal.strCategory}</p>
                    <p>{meal.strArea}</p>
                </div>
            </Link>
        </div>
    );
}

export default MealListItem;