import React, { useState, useEffect } from 'react';
import ActorFallback from './FallBackProfile';
import castIcon from '../images/castIcon.png';

function ExpandCast({ cast }) {
    const [showAll, setShowAll] = useState(window.innerWidth >= 1024); // Initialize based on screen size
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isLarge, setIsLarge] = useState(window.innerWidth >= 1024); // Track if the screen is large or greater

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsLarge(window.innerWidth >= 1024);
            if (window.innerWidth >= 1024) {
                setShowAll(true); // Automatically show all on large screens
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const displayedCast = showAll ? cast.slice(0, 6) : (isMobile ? cast.slice(0, 2) : cast.slice(0, 3));

    const handleToggle = () => {
        setShowAll(!showAll);
    };

    return (
        <div>
            <div className={`grid gap-4 ${showAll ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3'}`}>
                {displayedCast.map(actor => (
                    <div key={actor.name} className="flex flex-col items-center">
                        {actor.image ? (
                            <img
                                src={actor.image}
                                alt={actor.name}
                                className="w-24 h-30 object-cover rounded mb-2"
                            />
                        ) : (
                            <ActorFallback />
                        )}
                        <p className="text-center">{actor.name}</p>
                    </div>
                ))}
            </div>
            {!isLarge && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleToggle}
                        className="mt-3 px-2 py-1 rounded-full bg-primary text-l w-22 text-center text-white-500 no-underline m-2 flex items-center">
                        <img src={castIcon} alt="Cast Icon" className="w-6 h-6 mr-2" /> {/* Add the Cast Icon */}
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default ExpandCast;
