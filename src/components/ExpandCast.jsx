import React, { useState, useEffect } from 'react';
import ActorFallback from './FallBackProfile';
import castIcon from '../images/castIcon.png';

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

    // truncate the actor's name if the actor's name has more than 13 character so as not to skew the size of the actor card (and make the font size smaller)
    const truncateName = (name) => {
        if (name.length > 13) {
            return `${name.slice(0, 13)}...`;
        }
        return name;
    };

    return (
        <div>
            <div className={`grid gap-4 grid-cols-2 md:grid-cols-3`}>
                {displayedCast.map(actor => (
                    <div key={actor.name} className="bg-black bg-opacity-50 p-2 flex flex-col items-center rounded w-[140px] md:w-[225px] lg:w-[332px]">
                        <div className="flex-grow flex items-end">
                            {actor.image ? (
                                <img
                                    src={actor.image}
                                    alt={actor.name}
                                    className="w-[130px] md:w-[205px] lg:w-[312px] h-auto object-cover rounded mb-2"
                                />
                            ) : (
                                <ActorFallback />
                            )}
                        </div>
                        <p
                            className={`text-center text-white ${
                                isMobile && actor.name.length > 13 ? 'text-sm' : ''
                            }`}
                        >
                            {isMobile ? truncateName(actor.name) : actor.name}
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleToggle}
                    className="mt-2 mb-2 px-3 py-1 rounded-full bg-primary text-l w-22 text-center text-white-500 no-underline m-2 flex items-center md:hover:bg-secondary">
                    <img src={castIcon} alt="Cast Icon" className="w-6 h-6 mr-2" />
                    {showAll ? 'Show Less' : 'Show More'}
                </button>
            </div>
        </div>
    );
}

export default ExpandCast;
