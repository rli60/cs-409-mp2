// Fetching, loading, and error state
import { useEffect, useState } from "react";
import { searchMealsByName } from "../api/mealDb";
import type { Meal } from "../types/meal";

export function useMeals() {
    const [meals, setMeals] = useState<Meal[]>([]); // updates meals
    const [loading, setLoading] = useState(true); // loading page
    const [error, setError] = useState<string | null>(null); // capturing errors

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const res = await searchMealsByName("");
                if (!cancelled) {
                    setMeals(res);
                }
            }
            catch (err) {
                if (!cancelled) {
                    setError(`Error loading recipes: ${err}`);
                }
            }
            finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        load();
        return () => { cancelled = true; };
    }, []);

    return { meals, loading, error };
}