// Displays meals as a gallery
import type { MealSummary } from "../types/meal";
import MealCard from "./MealCard";

function MealGallery({ meals }: { meals: MealSummary[] }) {
    return (
        <div className="meal-gallery">
            {meals.map(meal => (<MealCard key={meal.idMeal} meal={meal} meals={meals}/>))}
        </div>
    );
}

export default MealGallery;