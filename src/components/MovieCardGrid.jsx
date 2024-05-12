import React from 'react';
import { Link } from 'react-router-dom';
import {imageBaseURL} from '../globals/globalVariables.js';
import { useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../features/favs/favsSlice';
import {FavButton} from './FavButton';

// basically a lot of repetition from MovieCard.jsx...could probably optimize it lol
function MovieCardGrid({movie, isFav}) {
    
        const dispatch = useDispatch();
    
        function handleFavClick(addToFav, movieObj){
    
            if(addToFav === true){
                dispatch(addFav(movieObj));
            }else{
                dispatch(deleteFav(movieObj));
            }
        }

        // parse movie.overview to 100 characters as grid cards are smaller
        if (movie.overview.length > 100) {
            movie.overview = movie.overview.substring(0, 100) + "...";
        }
    
        return (
            // basically all the same as MovieCard.jsx without the stylel={{}} stuff
            <div className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl">
                <img className="rounded-t-2xl" src={`${imageBaseURL}w500${movie.poster_path}`} alt={movie.title} />
                <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-6 text-white transition-[backdrop-filter] hover:backdrop-blur-sm">
                    <span className="text-m font-semibold uppercase text-violet-300">
                        {movie.vote_average.toFixed(1)}
                    </span>
                    <Link to={`/movie/${movie.id}`}><p className="my-2 text-3xl font-bold">{movie.title}</p></Link>
                    <p className="text-lg text-slate-300">{movie.overview}</p>
                    {isFav ?
                        <FavButton movieObj={movie} remove={true} handleFavClick={handleFavClick} />
                        :
                        <FavButton movieObj={movie} handleFavClick={handleFavClick} />
                    }
                </div>
            </div>
        );
}

export default MovieCardGrid;