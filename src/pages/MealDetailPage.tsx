// route: /recipe/:id
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getMealById } from "../api/mealDb";
import type { Meal } from "../types/meal";
import MealNavigation from "../components/MealNavigation";
import { Link } from "react-router-dom";

function MealDetailPage() {
    const { id } = useParams();
    const location = useLocation();
    const [meal, setMeal] = useState<Meal | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const meals = location.state?.meals ?? [];

    useEffect(() => {
        async function loadMeal() {
            if (!id) {
                setError("Recipe ID is missing.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const result = await getMealById(id);

                if (result == null) {
                    setError("Recipe not found.");
                } 
                else {
                    setMeal(result);
                }
            } 
            catch (err) {
                setError(`Error loading recipe: ${err}`);
            } 
            finally {
                setLoading(false);
            }
        }

        loadMeal();
    }, [id]);

    if (loading) {
        return <h2>Loading recipe...</h2>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (meal == null) {
        return <p>Recipe not found.</p>;
    }

    return (
        <div className="meal-detail">

            <div className="detail-navigation">
                <Link to="/">
                    <button>List</button>
                </Link>

                <Link to="/recipe/gallery">
                    <button>Gallery</button>
                </Link>
            </div>

            <MealNavigation meals={meals} currentMealId={meal.idMeal}/>
            <h1>{meal.strMeal}</h1>
            <img src={meal.strMealThumb}/>

            <div className="meal-info">
                <p>{meal.strCategory}</p>
                <p>{meal.strArea}</p>
            </div>

            <div className="ingredients">
                <h2>Ingredients</h2>
                <ul>
                    {meal.ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.name} - {ingredient.measurement}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="instructions">
                <h2>Instructions</h2>

                <p>{meal.strInstructions}</p>
            </div>

        </div>
    );
}

export default MealDetailPage;