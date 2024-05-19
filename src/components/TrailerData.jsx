import React, { useState, useEffect } from 'react';

const VideoTrailers = ({ id, constructVideoUrl }) => {
    const [videoTrailers, setVideoTrailers] = useState([]);

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
    );
};

export default VideoTrailers;
