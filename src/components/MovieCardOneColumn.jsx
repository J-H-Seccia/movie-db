import MovieCard from "./MovieCard";
import isFav from '../utils/isFav';
import {Link} from 'react-router-dom';

// display movie cards in flex column
const MovieCardOneColumn = ({ movies, favs }) => {
    return (
        <div className="flex flex-col bg-black">
            {movies.map((movie) => (
                <div key={movie.id} 
                     className="single-movie-wrapper flex flex-col items-center pb-6">

                    <MovieCard movie={movie} isFav={isFav(favs, null, movie.id)} />
                    
                    <Link to={`/movie/${movie.id}`} 
                          className=" bg-primary text-white px-4 py-2 rounded-lg">
                          More Info
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default MovieCardOneColumn;