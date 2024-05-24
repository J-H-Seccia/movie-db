import React, { useState, useEffect } from "react";
import { appTitle, apiKey, endPointSearch, endPointMovieCredits, imageBaseURL } from "../globals/globalVariables";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ExpandText from '../components/ExpandText';
import MovieCard from '../components/MovieCard';
// import { FavButton } from '../components/FavButton';
import TrailerData from '../components/TrailerData';
// import { addFav, deleteFav } from '../features/favs/favsSlice';
import ExpandCast from '../components/ExpandCast';
import SingleMovieDetails from '../components/SingleMovieDetails';

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
                    id: data.id,  // Make sure to set the ID here
                    title: data.title,
                    overview: truncateOverview(data.overview),
                    release_date: data.release_date ? data.release_date : "Not Available",
                    vote_average: typeof data.vote_average === 'number' ? data.vote_average : "Not Available",
                    genres: data.genres ? data.genres.map(genre => genre.name).join(", ") : "Not Available",
                    cast: castWithImages,
                    poster_path: data.poster_path,
                    backdrop_path: data.backdrop_path,
                    origin_country: data.origin_country ? data.origin_country.join(", ") : "Not Available",
                    production_country: data.production_countries && data.production_countries.length > 0
                    ? data.production_countries.map(country => country.name).join(", ")
                    : "Not Available",
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
                <>
                    <section className="wrapper-single bg-copy py-5">
                        <SingleMovieDetails backdropPath={movieDetails.backdrop_path}>
                            <div className="relative md:flex md:flex-row mt-2 px-5 py-5">
                                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold ml-10 mr-10 mb-2 py-4 uppercase no-underline md:hidden text-center">
                                    {movieDetails.title}
                                </h1>
                                <div className="relative md:w-1/3 md:mr-4 md:mt-4 md:ml-0 mx-auto my-4 flex justify-center" style={{maxWidth: 'calc(100% - 20px)'}}>
                                    {/* Overlay to disable click events */}
                                    <div className="absolute inset-0 z-10" style={{ pointerEvents: 'none' }}></div>
                                    <div className="relative" style={{ pointerEvents: 'auto' }}>
                                        <MovieCard
                                            movie={{
                                                id: movieDetails.id,
                                                title: movieDetails.title,
                                                poster_path: movieDetails.poster_path,
                                                vote_average: movieDetails.vote_average,
                                                overview: movieDetails.overview
                                            }}
                                            isFav={isFav}
                                        />
                                    </div>
                                </div>

                                <div className="md:w-2/3">
                                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold ml-10 md:ml-0 mr-10 mb-2 py-4 uppercase no-underline hidden md:block text-left">
                                        {movieDetails.title}
                                    </h1>

                                    <section className="px-2 py-3 bg-black bg-opacity-50 rounded-lg">
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
                                                <p className="mt-4">Production Country:</p>
                                                <p className="mt-4 text-primary">{movieDetails.production_country}</p>
                                                <p className="mt-4">Trailers:</p>
                                                <div className="mt-4 flex justify-start">
                                                    <TrailerData id={id} />
                                                </div>
                                            </div>
                                        </section>
                                    </section>
                                </div>
                            </div>
                        </SingleMovieDetails>
                    </section>

                    <section className="actors-container">
                        <h2 className="text-center mt-5">Cast</h2>
                        <section className="px-2 py-3 flex justify-center">
                            <ExpandCast cast={movieDetails.cast} initialShowCount={10} />
                        </section>
                    </section>
                </>
            )}
        </div>
    );
}

export default PageSingle;
