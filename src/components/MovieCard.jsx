import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { imageBaseURL } from '../globals/globalVariables.js';
import { useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../features/favs/favsSlice';
import { FavButton } from './FavButton';

const CARD_WIDTH = 280;
const CARD_HEIGHT = 420;
const MARGIN = 20;

function MovieCard({ movie, isFav }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const dispatch = useDispatch();
    const cardRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setIsInfoVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function handleFavClick(addToFav, movieObj) {
        if (addToFav === true) {
            dispatch(addFav(movieObj));
        } else {
            dispatch(deleteFav(movieObj));
        }
    }

    function truncateOverview(overview) {
        if (!overview) {
            return "Details Not Provided";
        } else if (overview.length > 100) {
            return overview.substring(0, 100) + '...';
        }
        return overview;
    }

    const setMediaQueryForLarge = () => window.innerWidth >= 1280;

    const toggleInfoVisibility = () => {
        if (!setMediaQueryForLarge()) {
            setIsInfoVisible(!isInfoVisible);
        }
    };

    return (
        <div
            ref={cardRef}
            className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl"
            style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                marginRight: MARGIN,
                backgroundImage: `url(${imageBaseURL}w1280${movie.poster_path})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
            onMouseEnter={() => { if (setMediaQueryForLarge()) setIsHovered(true); }}
            onMouseLeave={() => { if (setMediaQueryForLarge()) setIsHovered(false); }}
            onClick={toggleInfoVisibility}
        >
            {isHovered && (
                <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-6 text-white transition-[backdrop-filter] hover:backdrop-blur-sm">
                    <span className="text-m font-semibold uppercase text-violet-300">Rating:
                        {movie.vote_average.toFixed(1)}
                    </span>
                    <Link to={`/movie/${movie.id}`}>
                        <p className="my-2 text-3xl font-bold">{movie.title}</p>
                    </Link>
                    <p className="text-lg text-slate-300">{truncateOverview(movie.overview)}</p>
                </div>
            )}
            {isInfoVisible && !setMediaQueryForLarge() && (
                <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-6 text-white transition-[backdrop-filter]">
                    <span className="text-m font-semibold uppercase text-violet-300">Rating:
                        {movie.vote_average.toFixed(1)}
                    </span>
                    <Link to={`/movie/${movie.id}`}>
                        <p className="my-2 text-3xl font-bold">{movie.title}</p>
                    </Link>
                    <p className="text-lg text-slate-300">{truncateOverview(movie.overview)}</p>
                </div>
            )}
            {isFav ?
                <FavButton movieObj={movie} remove={true} handleFavClick={handleFavClick} />
                :
                <FavButton movieObj={movie} handleFavClick={handleFavClick} />
            }
        </div>
    );
}

export default MovieCard;
