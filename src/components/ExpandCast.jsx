import React, { useState, useEffect } from 'react';
import ActorFallback from './FallBackProfile';

function ExpandCast({ cast }) {
    const [showAll, setShowAll] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
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
            <div className={`grid gap-4 ${showAll ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-3'}`}>
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
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleToggle}
                    className="bg-primary text-white px-4 py-2 rounded"
                >
                    {showAll ? 'See Less' : 'See More'}
                </button>
            </div>
        </div>
    );
}

export default ExpandCast;
