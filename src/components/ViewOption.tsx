// List or gallery view
import { Link } from "react-router-dom";
import "./ViewOption.css";

function ViewOption() {
    return (
        <div className="view-option">
            <h1>Find a Recipe</h1>
            <div className="buttons">
                <Link to="/">
                    <button>List</button>
                </Link>

                <Link to="/gallery">
                    <button>Gallery</button>
                </Link>
            </div>
        </div>
    );
}

export default ViewOption;