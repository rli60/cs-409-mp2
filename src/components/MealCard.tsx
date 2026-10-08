// Used in the gallery filter
import { Link } from "react-router-dom";
import type { MealSummary } from "../types/meal";
import "./MealCard.css";

interface MealCardProps {
    meal: MealSummary;
    meals: MealSummary[];
}

function MealCard({ meal, meals }: MealCardProps) {
    return (
        <div className="meal-card">
            <Link to={`/recipe/${meal.idMeal}`} state={{ meals }}>
                <img src={meal.strMealThumb} />
                <div>
                    <b>{meal.strMeal}</b>
                </div>
            </Link>
        </div>
    );
}

export default MealCard;