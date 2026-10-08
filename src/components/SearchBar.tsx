// Search bar for filtering
interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search recipes"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;