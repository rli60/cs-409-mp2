// Multi-select buttons
import { useEffect, useState } from "react";
import { getCategories } from "../api/mealDb";
import "./CategoryFilter.css";

interface CategoryFilterProps {
    selectedCategories: string[];
    onChange: (categories: string[]) => void;
}

function CategoryFilter({ selectedCategories, onChange }: CategoryFilterProps) {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadCategories() {
            try {
                const result = await getCategories();
                setCategories(result);
            } 
            catch (err) {
                setError("Failed to load categories.");
            } 
            finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    function handleCategoryChange(category: string) {
        if (selectedCategories.includes(category)) {
            onChange(selectedCategories.filter(selected => selected != category)
            );
        } 
        else {
            onChange([...selectedCategories, category]);
        }
    }

    if (loading) {
        return <p>Loading categories...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="category-filter">
            <h3>Filter by Category</h3>

            {categories.map(category => (
                <label key={category}>
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                    />
                    {category}
                </label>
            ))}
        </div>
    );
}

export default CategoryFilter;