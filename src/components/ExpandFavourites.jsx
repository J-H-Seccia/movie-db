import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import favouritesIcon from '../images/favouritesIcon.png';

function ExpandFavourites({ favourites }) {
    const [showAll, setShowAll] = useState(false);
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getDisplayCount = () => {
        if (screenSize >= 1280) return 4;
        if (screenSize >= 980) return 3;
        if (screenSize >= 768) return 2;
        return 1;
    };

    const displayCount = getDisplayCount();
    const displayedFavourites = showAll ? favourites : favourites.slice(0, displayCount);

    const handleToggle = () => {
        setShowAll(!showAll);
    };

    const shouldShowButton = () => {
        if (screenSize >= 1280) return favourites.length > 4;
        if (screenSize >= 980) return favourites.length > 3;
        if (screenSize >= 768) return favourites.length > 2;
        return favourites.length > 1;
    };

    return (
        <div>
            <div className={`grid gap-4 ${
                screenSize >= 1280
                ? 'grid-cols-4'
                : screenSize >= 980
                ? 'grid-cols-3'
                : screenSize >= 768
                ? 'grid-cols-2'
                : 'grid-cols-1'
            }`}>
                {displayedFavourites.map((movie, i) => (
                    <MovieCard key={i} movie={movie} isFav={true} />
                ))}
            </div>
            {shouldShowButton() && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleToggle}
                        className="mt-2 mb-2 px-3 py-1 rounded-full bg-primary text-l w-22 text-center text-white-500 no-underline m-2 flex items-center md:hover:bg-secondary">
                        <img src={favouritesIcon} alt="Favourites Icon" className="w-6 h-6 mr-2" />
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default ExpandFavourites;
