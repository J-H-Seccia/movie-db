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


    //if there is no overview, return a "Details not provided" message
    //if there is an overview, make sure that it is truncated to 100 characters
    function truncateOverview(overview) {
        if (!overview) {
            return "Details Not Provided";
        } else if (overview.length > 100) {
            return overview.substring(0, 100) + '...';
        }
        return overview;
    }

    //sets a media query at 1280 pixels so that the hover effect can be applied for larger screens and the click effect applied for mobile and tablet devices
    const setMediaQueryForLarge = () => window.innerWidth >= 1280;


    // This line toggles the value of the isInfoVisible state using the setIsInfoVisible function. If isInfoVisible is true, it becomes false, and vice versa.
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
            //set the hover state to true if the mouse enters the poster
            onMouseEnter={() => { if (setMediaQueryForLarge()) setIsHovered(true); }}
            //set the hover state to false if the mouse leaves the poster
            onMouseLeave={() => { if (setMediaQueryForLarge()) setIsHovered(false); }}
            //call the toggleInfoVisibility function, which will display or hide the movie information when the poster is clicked on mobile or tablet devices
            onClick={toggleInfoVisibility}
        >
            {/* if the hover state is set to true, display the movie information on top of the movie's poster */}
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
            {/* for mobile and tables devices, display the movie information if not already visible */}
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
