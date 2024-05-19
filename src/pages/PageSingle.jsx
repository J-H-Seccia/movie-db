import React, { useState, useEffect } from "react";
import { appTitle, apiKey, endPointSearch, endPointMovieCredits, imageBaseURL } from "../globals/globalVariables";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ActorFallback from "../components/FallBackProfile";
import ExpandText from '../components/ExpandText';
import { FavButton } from '../components/FavButton'
import { addFav, deleteFav } from '../features/favs/favsSlice';
import ExpandCast from '../components/ExpandCast';
import trailerIcon from '../images/trailer-icon.png';

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
    const [videoTrailers, setVideoTrailers] = useState([]);

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
                    release_date: data.release_date,
                    vote_average: data.vote_average,
                    genres: data.genres ? data.genres.map(genre => genre.name).join(", ") : "",
                    cast: castWithImages,
                    posterPath: data.poster_path,
                    backdrop_path: data.backdrop_path,
                    origin_country: data.origin_country ? data.origin_country.join(", ") : "",
                });

                await fetchVideoTrailers();

            } catch (error) {
                setError("Failed to fetch movie details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSingleMovie();
    }, [id]);

    const constructVideoUrl = (site, key) => {
        if (site === 'YouTube') {
            return `https://www.youtube.com/watch?v=${key}`;
        } else if (site === 'Vimeo') {
            return `https://vimeo.com/${key}`;
        } else {
            return null;
        }
    };

    const fetchVideoTrailers = async () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWJiYTJmNTQ2N2U3Yzk1NmVjYWFhN2FmMWNjMjFhNiIsInN1YiI6IjY2MzUyN2U0OTlkNWMzMDEyNjU3NzhiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._QXgq2rIB6fX_fni3NVUlSbASV-S6jFomm42-d2T52c',
                }
            };
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
            const data = await response.json();

            const trailerVideos = data.results.filter(video => video.type === 'Trailer');

            setVideoTrailers(trailerVideos);
        } catch (error) {
            console.error("Failed to fetch video trailers:", error);
        }
    };

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
    // add the Add Favourite/Remove Favourite functionality to PageSingle.jsx
    const handleFavClick = (addToFav, movieObj) => {
        if (addToFav) {
            dispatch(addFav(movieObj));
        } else {
            dispatch(deleteFav(movieObj));
        }
    };

    const isFav = favs.some(fav => fav.id === movieDetails.id);

    return (
        <div className="bg-copy text-foreground min-h-screen ">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold ml-10 mr-10 mb-2 py-4 text-center uppercase no-underline">{movieDetails.title}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="movie-details mx-3">
                    <img src={`${imageBaseURL}w1280${movieDetails.posterPath}`} alt={movieDetails.title} style={{ width: '100%', maxWidth: '100%', height: 'auto' }} />
                    {movieDetails.title && (
                        <FavButton
                        movieObj={{
                            id: movieDetails.id,
                            title: movieDetails.title,
                            poster_path: movieDetails.posterPath }}
                            remove={isFav}
                            handleFavClick={handleFavClick}
                        />
                    )}
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

                        <section className="video-trailer-container">
                            {videoTrailers.length > 0 && (
                                <div className="video-trailers">
                                    <ul>
                                        {videoTrailers.map(trailer => (
                                            <li key={trailer.id}>
                                                <div className="flex justify-center">
                                                    <button
                                                        className="flex items-center px-2 py-1 rounded-full bg-primary text-l text-center text-white-500 no-underline m-2"
                                                        onClick={() => window.open(constructVideoUrl(trailer.site, trailer.key), '_blank')}
                                                    >
                                                        <img src={trailerIcon} alt="Trailer Icon" className="w-4 h-4 mr-2" />
                                                        {trailer.name}
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>
                    </section>

                    <section className="actors-container">
                        {movieDetails.cast && movieDetails.cast.length > 0 && (
                            <div className="cast-images mx-1.5 sm:mx-10">
                                <h3 className="text-xl font-bold">Cast</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {movieDetails.cast.slice(0, 6).map(actor => (
                                        <div key={actor.name} className="flex flex-col items-center">
                                            {actor.image ? (
                                                <img
                                                    src={actor.image}
                                                    alt={actor.name}
                                                    className="w-24 h-30 object-cover rounded mb-2"
                                                />
                                            ) : (
                                                <ActorFallback />
                                            )}
                                            <p className="text-center">{actor.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
}

export default PageSingle;
