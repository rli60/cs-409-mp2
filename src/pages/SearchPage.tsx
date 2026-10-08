// route: /
import { useState } from "react";
import { useMeals } from "../hooks/useMeals";
import { displayMeals } from "../utils/meals";
import type { SortType, SortDir } from "../utils/meals";
import SearchBar from "../components/SearchBar";
import SortControls from "../components/SortControls";
import MealList from "../components/MealList";
import ViewOption from "../components/ViewOption";

function SearchPage() {
    const { meals, loading, error } = useMeals();
    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState<SortType>("strMeal");
    const [sortDir, setSortDir] = useState<SortDir>("asc");

    if (loading) {
        return <h1>Loading recipes...</h1>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const allMeals = displayMeals(meals, search, sortType, sortDir);

    return (
        <div>
            
            <ViewOption />

            <SearchBar
                value={search}
                onChange={setSearch}
            />

            <b><h3>Sort by</h3></b>

            <SortControls
                sortType={sortType}
                sortDir={sortDir}
                onSortTypeChange={setSortType}
                onSortDirChange={setSortDir}
            />

            {allMeals.length === 0 ? (
                <p>No recipes match your search.</p>
            ) : (
                <MealList meals={allMeals} />
            )}
        </div>
    );
}

export default SearchPage;