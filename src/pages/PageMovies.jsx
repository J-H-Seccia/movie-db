import { useEffect, useState } from "react";
import { appTitle, apiKey, listOfGenres, movieGenreBaseURL, movieGenreBaseURLAfterAPI } from "../globals/globalVariables";
import MovieCardGrid from '../components/MovieCardGrid';
import { useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";
import useLoadingTime from "../utils/useLoadingTime";

function PageMovies() {
    // state to store movies and genre
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    // default movie genre is action
    const [selectedGenre, setSelectedGenre] = useState(28);

    // loading and error states
    const [loading, startLoading, stopLoading] = useLoadingTime();
    const [error, setError] = useState(null);

    // setting favs from redux store
    const favs = useSelector((state) => {
        return state.favs.items;
    });

    useEffect(() => {
        document.title = `Browse Movies by Genre | ${appTitle}`;
    }, []);

    // fetch genre list using api key – each genre has an associated id and name
    // if no errors, set genre from the fetched data
    useEffect(() => {
        const fetchGenre = async () => {
            startLoading();
            try {
                const response = await fetch(`${listOfGenres}?api_key=${apiKey}`);
                const data = await response.json();
                if (data.genres && data.genres.length > 0) {
                    setGenre(data.genres);
                }
            } catch (error) {
                setError(error);
            }
            stopLoading();
        };

        fetchGenre();
    }, []);

    // fetching movies by genre using selected genre id
    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            startLoading();
            try {
                // this is how you build the url for fetching movies by genre: https://api.themoviedb.org/3/discover/movie?api_key=69bba2f5467e7c956ecaaa7af1cc21a6&with_genres=28
                // where 28 is the id for action movies
                const response = await fetch(`${movieGenreBaseURL}?api_key=${apiKey}${movieGenreBaseURLAfterAPI}${selectedGenre}`);

                const data = await response.json();

                // if there are results, set movies from the fetched data
                if (data.results && data.results.length > 0) {
                    setMovies(data.results);
                } else {
                    setError("No movies found for the selected genre.");
                }
            } catch (error) {
                setError("Failed to fetch movies. Please try again later.");
            } finally {
                stopLoading();
            }
        };

        // fetch movies by genre only if a genre is selected – hence the selectedGenre in dependency array
        if (selectedGenre) {
            fetchMoviesByGenre();
        }
    }, [selectedGenre]);

    // a simple function to handle genre change
    const handleChangeGenre = (genre) => {
        setSelectedGenre(genre);
    };

    return (
        <div>
            {/* Loading Screen */}
            {loading && 
                <LoadingScreen />}

            {/* errors */}
            {error && 
                <div className="bg-copy text-foreground min-h-screen">
                    <div className="text-center py-5">
                        <h1 className="text-2xl font-bold mb-2">Error</h1>
                        <p>{error}</p>
                    </div>
                </div>}

            {!loading && !error && (
                <div className="movie-container max-w-screen-lg m-auto">
                    <div className="outer-flex flex justify-center m-6">
                        <div className="inner-flex">
                            <h1 className="text-3xl font-bold text-center text-white p-4 border-4 border-double rounded-2xl uppercase">
                                Browse Movies by Genre
                            </h1>
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <select
                            onChange={(e) => handleChangeGenre(e.target.value)}
                            value={selectedGenre}
                            className="p-2 rounded-md border-2 border-primary bg-copy text-white"
                        >
                            {genre.map((genre) => (
                                <option value={genre.id} key={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <MovieCardGrid movies={movies} favs={favs} />
            </div>
            )}

        </div>
    );
}

export default PageMovies;
