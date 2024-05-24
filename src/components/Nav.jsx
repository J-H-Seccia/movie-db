import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";

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
                             className={({ isActive, isPending }) => 
                                `px-3 hover:text-primary hover:underline ${
                                  isPending ? 'text-gray-500' : isActive ? 'font-bold text-primary underline' : ''
                                }`
                              }
                            >
                        About
                    </NavLink>

                    <NavLink to="/browse/movies" 
                             className={({ isActive, isPending }) => 
                                `px-3 hover:text-primary hover:underline ${
                                  isPending ? 'text-gray-500' : isActive ? 'font-bold text-primary underline' : ''
                                }`
                              }
                            >
                        Movies
                    </NavLink>

                    <NavLink to="/favourites" 
                             className={({ isActive, isPending }) => 
                                `px-3 hover:text-primary hover:underline ${
                                  isPending ? 'text-gray-500' : isActive ? 'font-bold text-primary underline' : ''
                                }`
                              }
                            >
                        Favourites
                    </NavLink>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleNavbar} 
                            className="text-3xl text-white">
                        {isOpen ? <IoMdClose/> : <CiMenuBurger/>}
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div className="md:hidden flex basis-full flex-col items-center text-2xl font-bold text-white">
                    <NavLink to="/about" 
                             className={({ isActive, isPending }) => 
                                `py-3 ${
                                  isPending ? 'text-gray-500' : isActive ? 'font-bold text-primary underline' : ''
                                }`}>
                        About
                    </NavLink>

                    <NavLink to="/browse/movies" 
                             className={({ isActive, isPending }) => 
                                `py-3 ${
                                  isPending ? 'text-gray-500' : isActive ? 'font-bold text-primary underline' : ''
                                }`}>
                        Movies
                    </NavLink>

                    <NavLink to="/favourites" 
                             className={({ isActive, isPending }) => 
                                `py-3 ${
                                  isPending ? 'text-gray-500' : isActive ? 'font-bold text-primary underline' : ''
                                }`}>
                        Favourites
                    </NavLink>
                </div>
            )}
        </>
    );
}

export default Nav;