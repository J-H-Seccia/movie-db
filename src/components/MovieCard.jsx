import React from 'react';
import { Link } from 'react-router-dom';
import {FavButton} from './FavButton';
import { useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../features/favs/favsSlice';


import {imageBaseURL} from '../globals/globalVariables.js';

function MovieCard({ movie, isFav }) {

    const dispatch = useDispatch();

    function handleFavClick(addToFav, movieObj){
        console.log(movieObj);
        if(addToFav === true){
            dispatch(addFav(movieObj));
        }else{
            dispatch(deleteFav(movieObj));
        }
    }
    return (
        <>
        <div>
            <div className="btn-favourite">
                {isFav ?
                        <FavButton movieObj={movie} remove={true} handleFavClick={handleFavClick} /> 
                        :
                        <FavButton movieObj={movie} handleFavClick={handleFavClick} />
                }
                
            </div>
            
            <Link to={`/single/${movie.id}`} className="more-info-button">
                <div className="movie-details">

                    <h2>{movie.title}</h2>
                    <img src={`${imageBaseURL}w500${movie.poster_path}`} ></img>

                    {/* More Info button */}

                </div>
            </Link>
        </div>
        
        </>
    );
}

export default MovieCard;
