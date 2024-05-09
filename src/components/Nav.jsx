import { NavLink } from "react-router-dom";

function Nav() {

    return ( 
        <nav>
            <ul className="p-4 flex gap-4">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/favourites">Favourites</NavLink>
                </li>
            </ul>
        </nav>
     );
}

export default Nav;