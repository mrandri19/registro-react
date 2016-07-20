import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from 'react-router';

export function Navbar() {
    return (<nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="marks">Marks</Link></li>
            </ul>
        </nav>);
}