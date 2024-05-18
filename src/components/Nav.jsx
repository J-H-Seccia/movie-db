import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";

const NavLinks = () => {
    return (
        <>
            <div className="font-serif">
                <NavLink to="/about" className="px-3 hover:text-primary hover:border-b-2 border-primary">About</NavLink>
                <NavLink to="/browse/movies" className="px-3 hover:text-primary hover:border-b-2 border-primary">Movies</NavLink>
                <NavLink to="/favourites" className="px-3 hover:text-primary hover:border-b-2 border-primary">Favourites</NavLink>
            </div>
        </>

    )
}

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }


    return ( 
        <>
            <nav className="flex justify-end">
                <div className="hidden text-white w-full justify-between text-3xl font-bold md:flex gap-4">
                <NavLink to="/about" 
                className="px-3 hover:text-primary hover:border-b-2 border-primary">
                    About
                </NavLink>
                <NavLink to="/browse/movies" 
                className="px-3 hover:text-primary hover:border-b-2 border-primary">
                    Movies
                </NavLink>
                <NavLink to="/favourites" 
                className="px-3 hover:text-primary hover:border-b-2 border-primary">
                    Favourites
                </NavLink>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleNavbar} className="text-3xl text-white">
                        {isOpen ? <IoMdClose/> : <CiMenuBurger/>}
                    </button>
                </div>
            </nav>
            {isOpen && (
                <div className="md:hidden flex basis-full flex-col items-center text-2xl font-bold text-white">
                    <NavLink to="/about" 
                    className="py-3 hover:text-primary hover:border-b-2 border-primary">
                        About
                    </NavLink>
                    <NavLink to="/browse/movies" 
                    className="py-3 hover:text-primary hover:border-b-2 border-primary">
                        Movies
                    </NavLink>
                    <NavLink to="/favourites" 
                    className="py-3 hover:text-primary hover:border-b-2 border-primary">
                        Favourites
                    </NavLink>
                </div>
            )}
        </>
    );
}

export default Nav;