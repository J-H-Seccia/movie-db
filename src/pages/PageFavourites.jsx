import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ExpandFavourites from '../components/ExpandFavourites';
import fallbackFavourites from '../images/fallbackFavourites_l.jpg';

function PageFavourites() {
    const favs = useSelector((state) => state.favs.items);

    // Page Title
    useEffect(() => {
        document.title = `Favourites | ${appTitle}`;
    }, []);

    return (
        <>
            <section className="favourites-wrapper bg-copy text-white text-center relative min-h-[calc(100vh-8rem)] w-full">
                <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold ml-10 mr-10 mb-2 py-4 uppercase no-underline">
                    Favourites
                </h1>
                {favs.length < 1 ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src={fallbackFavourites}
                            alt="No favourites"
                            className="absolute inset-0 w-full h-full object-cover z-0"
                        />
                        <div className="relative z-10 bg-black bg-opacity-50 p-6 rounded-lg w-full min-h-screen flex items-center justify-center lg:min-h-[calc(100vh-8rem)] lg:w-auto">
                            <p className="text-xl mb-4">
                                No favourite movies. Return to the <Link to="/" className="text-primary underline">home</Link> page to add some favourite movies.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center w-full">
                        <ExpandFavourites favourites={favs} />
                    </div>
                )}
            </section>
        </>
    );
}

export default PageFavourites;
