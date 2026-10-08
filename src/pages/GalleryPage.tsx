// route: /gallery
import { useEffect, useState } from "react";
import { filterMealsByCategory } from "../api/mealDb";
import type { MealSummary } from "../types/meal";
import ViewOption from "../components/ViewOption";
import CategoryFilter from "../components/CategoryFilter";
import MealGallery from "../components/MealGallery";
import { getAllMeals } from "../api/mealDb";

function GalleryPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [meals, setMeals] = useState<MealSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadMeals() {
            setLoading(true);
            setError(null);

            try {
                if (selectedCategories.length == 0) {
                    const allMeals = await getAllMeals();
                    setMeals(allMeals);
                } 
                else {
                    const results = await Promise.all(
                        selectedCategories.map(category => filterMealsByCategory(category))
                    );

                    const combinedMeals = results.flat();
                    const uniqueMeals = Array.from(
                        new Map(combinedMeals.map(meal => [meal.idMeal, meal])).values()
                    );

                    setMeals(uniqueMeals);
                }
            } 
            catch (err) {
                setError("Failed to load recipes.");
            } 
            finally {
                setLoading(false);
            }
        }

        loadMeals();
    }, [selectedCategories]);

    return (
        <div>
            <ViewOption />
            <CategoryFilter
                selectedCategories={selectedCategories}
                onChange={setSelectedCategories}
            />

            {loading && <b><p>Loading recipes...</p></b>}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <MealGallery meals={meals} />
            )}
        </div>
    );
}

export default GalleryPage;