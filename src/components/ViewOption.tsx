// List or gallery view
import { Link } from "react-router-dom";

function ViewOption() {
    return (
        <div className="view-option">
            <Link to="/">
                <button>List</button>
            </Link>

            <Link to="/gallery">
                <button>Gallery</button>
            </Link>
        </div>
    );
}

export default ViewOption;