// Sorting logic
import type { SortType, SortDir } from "../utils/meals";

interface SortControlsProps {
    sortType: SortType;
    sortDir: SortDir;
    onSortTypeChange: (value: SortType) => void;
    onSortDirChange: (value: SortDir) => void;
}

function SortControls({ sortType, sortDir, onSortTypeChange, onSortDirChange }: SortControlsProps) {
    return (
        <div className="sort-controls">
            <select value={sortType} onChange={e => onSortTypeChange(e.target.value as SortType)}>
                <option value="strMeal">Name</option>
                <option value="strCategory">Category</option>
                <option value="strArea">Area</option>
            </select>
            <select value={sortDir} onChange={e => onSortDirChange(e.target.value as SortDir)}>
                <option value="asc">A to Z</option>
                <option value="desc">Z to A</option>
            </select>
        </div>
    );
}

export default SortControls;