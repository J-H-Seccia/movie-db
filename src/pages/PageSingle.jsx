import React, { useState, useEffect } from "react";
import { appTitle, apiKey, endPointSearch, endPointMovieCredits, imageBaseURL } from "../globals/globalVariables";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ExpandText from '../components/ExpandText';
import { FavButton } from '../components/FavButton';
import TrailerData from '../components/TrailerData';
import { addFav, deleteFav } from '../features/favs/favsSlice';
import ExpandCast from '../components/ExpandCast';

function truncateOverview(overview, wordLimit) {
    if (!overview) {
        return "Overview: Not Provided";
    } else {
        const words = overview.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        } else {
            return overview;
        }
    }
}

function PageSingle() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const favs = useSelector(state => state.favs.items);
    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = `Single Info | ${appTitle}`;
    }, []);

    useEffect(() => {
        const fetchSingleMovie = async () => {
            setLoading(true);
            try {
                const api = `${endPointSearch}${id}?api_key=${apiKey}`;
                const response = await fetch(api);
                const data = await response.json();

                const creditsResponse = await fetch(`${endPointMovieCredits}${id}/credits?api_key=${apiKey}`);
                const creditsData = await creditsResponse.json();

                const castWithImages = await Promise.all(creditsData.cast.map(async credit => {
                    const imageUrl = await fetchActorImageUrl(credit.id);
                    return {
                        name: credit.name,
                        image: imageUrl,
                    };
                }));

                setMovieDetails({
                    title: data.title,
                    overview: truncateOverview(data.overview),
                    release_date: data.release_date ? data.release_date : "Not Available",
                    vote_average: typeof data.vote_average === 'number' ? data.vote_average : "Not Available",
                    genres: data.genres ? data.genres.map(genre => genre.name).join(", ") : "Not Available",
                    cast: castWithImages,
                    posterPath: data.poster_path,
                    backdrop_path: data.backdrop_path,
                    origin_country: data.origin_country ? data.origin_country.join(", ") : "Not Available",
                });

            } catch (error) {
                setError("Failed to fetch movie details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSingleMovie();
    }, [id]);

    const fetchActorImageUrl = async (personId) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`);
            const data = await response.json();
            return data.profile_path ? `https://image.tmdb.org/t/p/w500${data.profile_path}` : null;
        } catch (error) {
            console.error("Failed to fetch actor image:", error);
            return null;
        }
    };

    const handleFavClick = (addToFav, movieObj) => {
        if (addToFav) {
            dispatch(addFav(movieObj));
        } else {
            dispatch(deleteFav(movieObj));
        }
    };

    const isFav = favs.some(fav => fav.id === movieDetails.id);

    return (
        <div className="bg-copy text-foreground min-h-screen">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="movie-details mx-3">
                    <div className="relative md:flex md:flex-row">
                        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold ml-10 mr-10 mb-2 py-4 uppercase no-underline md:hidden text-center">
                            {movieDetails.title}
                        </h1>
                        <div className="md:w-1/3 md:mr-4">
                            <div className="relative inline-block w-full">
                                <img
                                    src={`${imageBaseURL}w1280${movieDetails.posterPath}`}
                                    alt={movieDetails.title}
                                    className="w-full max-w-full h-auto md:w-64 rounded-lg"
                                />
                                {movieDetails.title && (
                                    <FavButton
                                        movieObj={{
                                            id: movieDetails.id,
                                            title: movieDetails.title,
                                            poster_path: movieDetails.posterPath
                                        }}
                                        remove={isFav}
                                        handleFavClick={handleFavClick}
                                        className="absolute left-1/2 transform -translate-x-1/2"
                                        style={{ top: 'calc(100% + 10px)' }}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="md:w-2/3">
                        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold ml-10 md:ml-0 mr-10 mb-2 py-4 uppercase no-underline hidden md:block text-left">
                        {movieDetails.title}
                        </h1>

                            <section className="px-2 py-3">
                                <ExpandText text={movieDetails.overview} initialWordLimit={20} />
                                <section className="mb-3">
                                    <div className="grid grid-cols-2 gap-x-4">
                                        <p className="mt-3">Release Date:</p>
                                        <p className="mt-4 text-primary">{movieDetails.release_date}</p>
                                        <p className="mt-4">Rating:</p>
                                        <p className="mt-4 text-primary">
                                            {typeof movieDetails.vote_average === 'number'
                                                ? movieDetails.vote_average.toFixed(1)
                                                : 'N/A'}
                                        </p>
                                        <p className="mt-4">Genres:</p>
                                        <p className="mt-4 text-primary">{movieDetails.genres}</p>
                                        <p className="mt-4">Country:</p>
                                        <p className="mt-4 text-primary">{movieDetails.origin_country}</p>
                                    </div>
                                </section>
                            </section>
                        </div>
                    </div>

                    <TrailerData id={id} />

                    <section className="actors-container px-2 py-3">
                        <h3 className="text-2xl font-bold mt-4 mb-2 text-center">Cast</h3>
                        <ExpandCast cast={movieDetails.cast} initialShowCount={10} />
                    </section>
                </div>
            )}
        </div>
    );

}

export default PageSingle;
