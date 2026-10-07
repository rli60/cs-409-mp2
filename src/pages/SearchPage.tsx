// route: /
import { useState } from "react";
import { useMeals } from "../hooks/useMeals";
import { displayMeals } from "../utils/meals";
import type { SortType, SortDir } from "../utils/meals";
// import SearchBar from "../components/SearchBar";
// import SortControls from "../components/SortControls";
// import MealListItem from "../components/MealListItem";

function SearchPage() {
    const { meals, loading, error } = useMeals();
    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState<SortType>("strMeal");
    const [sortDir, setSortDir] = useState<SortDir>("asc");

    if (loading) {
        return <h2><b>Loading recipes...</b></h2>;
    }

    if (error) {
        return <p>{error}</p>
    }

    const allMeals = displayMeals(meals, search, sortType, sortDir);

    return (
        <div>

        </div>
    );
}

export default SearchPage();