import * as React from "react";
import { Link } from "react-router";

export function Navbar() {
    return (<nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="marks">Marks</Link></li>
                <li id="logout"><Link to="logout">Logout</Link></li>
            </ul>
        </nav>);
}
