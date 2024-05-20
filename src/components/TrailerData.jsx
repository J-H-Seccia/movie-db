import React, { useState, useEffect } from 'react';
import trailerIcon from '../images/trailer-icon.png'; // Ensure you have the correct path to the trailer icon

const TrailerData = ({ id }) => {
    const [videoTrailers, setVideoTrailers] = useState([]);

    const buildTrailerLink = (site, key) => {
        if (site === 'YouTube') {
            return `https://www.youtube.com/watch?v=${key}`;
        } else if (site === 'Vimeo') {
            return `https://vimeo.com/${key}`;
        } else {
            return null;
        }
    };

    useEffect(() => {
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

        fetchVideoTrailers();

    }, [id]);

    return (
        <section className="video-trailer-container">
            {videoTrailers.length > 0 ? (
                <div className="video-trailers">
                    <ul>
                        {videoTrailers.map((trailer, index) => (
                            <li key={trailer.id}>
                                <div className="flex justify-center">
                                    <button
                                        className="flex items-center px-3 py-1 rounded-full bg-primary text-l text-center text-white-500 no-underline m-2"
                                        onClick={() => window.open(buildTrailerLink(trailer.site, trailer.key), '_blank')}
                                    >
                                        {/* For styling purposes, display trailerIcon only for screens larger than sm*/}
                                        <img
                                            src={trailerIcon}
                                            alt="Trailer Icon"
                                            className="w-4 h-4 mr-2 hidden sm:inline"
                                        />
                                        {`Trailer ${index + 1}`}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-4">No Trailers Available</p>
            )}
        </section>
    );

};

export default TrailerData;
