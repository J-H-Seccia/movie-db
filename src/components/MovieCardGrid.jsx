// import { useState } from "react";
import MovieCard from "./MovieCard";
// import useMeasure from "react-use-measure";
import isFav from '../utils/isFav';

// display movie cards in grid layout
const MovieCardGrid = ({movies, favs}) => {
    console.log(movies);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* revert default style on movie card, aka removing hard coded height and width */}
            {movies.map((movie) => {
                return <MovieCard 
                    key={movie.id} 
                    movie={movie}
                    style={{ width: 'unset', height: 'unset', margin: '13px'}}
                    isFav={isFav(favs, null, movie.id)}/>;
            })}
        </div>
    );
}

export default MovieCardGrid;
