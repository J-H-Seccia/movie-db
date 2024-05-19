import React from 'react';

function ExpandCast({ cast }) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {cast.slice(0, 6).map(actor => (
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
    );
}

export default ExpandCast;
