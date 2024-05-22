import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { imageBaseURL } from '../globals/globalVariables.js';
import { useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../features/favs/favsSlice';
import { FavButton } from './FavButton';
import MovieFallback from '../images/movieFallback.svg';



const CARD_WIDTH = 280;
const CARD_HEIGHT = 420;
const MARGIN = 20;

function MovieCard({ movie, isFav, style }) {
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

    const toggleInfoVisibility = () => {
        if (!setMediaQueryForLarge()) {
            setIsInfoVisible(!isInfoVisible);
        }
    };

    const setMediaQueryForLarge = () => window.innerWidth >= 1280;

    return (
        <div style={style}>
            <Link to={`/movie/${movie.id}`}>
            <div
                ref={cardRef}
                className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl"
                style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    margin: MARGIN,
                    //backgroundImage: `url(${imageBaseURL}w1280${movie.poster_path})`,
                    backgroundImage: `url(${MovieFallback})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    ...style
                }}
                
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={toggleInfoVisibility}
            >
                {movie.poster_path ? (
                    <img
                        src={`${imageBaseURL}w1280${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-2xl"
                    />
                ) : (
                    <img
                        src={MovieFallback}
                        alt="Fallback Image"
                        className="bg-blue-200 object-scale-down"
                    />
                )}
                {isHovered && !setMediaQueryForLarge() && (
                    <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-6 text-white">
                        <span className="text-m font-semibold uppercase text-violet-300">Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                        <p className="my-2 text-3xl font-bold">{movie.title}</p>
                        <p className="text-lg text-slate-300">{truncateOverview(movie.overview)}</p>
                    </div>
                )}
            </div>
            </Link>

            <div className="btn-fav absolute z-30 text-white">
                {isFav ?
                    <FavButton movieObj={movie} 
                               remove={true} 
                               handleFavClick={handleFavClick}
                               style={{ bottom: '0', left: '0.5rem' }} 
                               />
                    :
                    <FavButton movieObj={movie} 
                               handleFavClick={handleFavClick} 
                               style={{ bottom: '0', left: '0.5rem' }}
                               />
                }
            </div>
        </div>
    );
}

export default MovieCard;
