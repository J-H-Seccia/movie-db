import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { imageBaseURL } from '../globals/globalVariables.js';
import { useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../features/favs/favsSlice';
import { FavButton } from './FavButton';

const CARD_WIDTH = 300;
const CARD_HEIGHT = 420;
const MARGIN = 10;

function MovieCard({ movie, isFav }) {
    //add a state to determine whether the mouse if within the movie poster when the screen is larger than 1280 pixels
    const [isHovered, setIsHovered] = useState(false);
    //add a state for mobile and desktop devices. if the movie information is visible, isInfoVisible is true, if the movie information is not visible, isInfoVisible is set to false.
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const dispatch = useDispatch();
    const cardRef = useRef(null);

    useEffect(() => {
        //if the user clicks outside the most recently clicked poster, the movie information for that poster should be hidden
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
        <div>
            <Link to={`/movie/${movie.id}`}>
            <div
                ref={cardRef}
                className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl"
                style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    margin: MARGIN,
                    backgroundImage: `url(${imageBaseURL}w1280${movie.poster_path})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {isHovered && (
                    <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-6 text-white">
                        <span className="text-m font-semibold uppercase text-violet-300">Rating: {movie.vote_average.toFixed(1)}</span>
                        <p className="my-2 text-3xl font-bold">{movie.title}</p>
                        <p className="text-lg text-slate-300">{truncateOverview(movie.overview)}</p>
                    </div>
                )}
            </div>
            </Link>

            <div className="btn-fav absolute z-30 text-white">
                {isFav ?
                    <FavButton movieObj={movie} remove={true} handleFavClick={handleFavClick} />
                    :
                    <FavButton movieObj={movie} handleFavClick={handleFavClick} />
                }
            </div>
        </div>
    );
}

export default MovieCard;
