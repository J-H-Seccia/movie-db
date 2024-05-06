import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MovieDetails from '../components/MovieDetails';
import { appTitle } from '../globals/globalVariables';


function PageHome() {
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
	const[upcomingMovies, setUpcomingMovies] = useState([]);
    const[nowPlayingMovies, setNowPlayingMovies] = useState([]);

    useEffect(() => {
        document.title = `${appTitle} - Home`;
        fetchData();
    }, []);

    //render the movie data to each individual tab after its related fetch function is run and the tab is clicked
    const fetchData = async () => {
        const topRated = await fetchTopRatedMovies();
        const popular = await fetchPopularMovies();
		const upcoming = await fetchUpcomingMovies();
        const nowPlaying = await fetchNowPlayingMovies();
        setTopRatedMovies(topRated.slice(0, 12));
        setPopularMovies(popular.slice(0, 12));
		setUpcomingMovies(upcoming.slice(0,12));
        setNowPlayingMovies(nowPlaying.slice(0,12));
    };


    const fetchMovies = async (url) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWU2YTg4N2U1ZjkwODRkOTIzZjFkNzA0NzMzN2I3MiIsInN1YiI6IjY2MzUyODE5YWQ1OWI1MDEyODZkZmMwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kGWA24_--WmsySTV6RnZg-n_2qrGTocc4kUTBhzeJJ0'
            }
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const data = await response.json();
                return data.results;
            } else {
                throw new Error('Failed to fetch movies');
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const fetchTopRatedMovies = async () => {
        const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
        return await fetchMovies(url);
    };

    const fetchPopularMovies = async () => {
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        return await fetchMovies(url);
    };

    const fetchUpcomingMovies = async () => {
        const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
        return await fetchMovies(url);
    };

    const fetchNowPlayingMovies = async () => {
        const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
        return await fetchMovies(url);
    };

    return (
        <main>
            <Tabs>
                <TabList>
                <Tab>Now Playing</Tab>
                    <Tab>Top Rated</Tab>
                    <Tab>Popular</Tab>
                    <Tab>Upcoming</Tab>
                </TabList>

                <TabPanel>
                    <h2>Now Playing</h2>
                    <div className="movie-container">
                        <div className="movies-grid">
                            {nowPlayingMovies.map(movie => (
                                <MovieDetails key={movie.id} movieData={movie} />
                            ))}
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <h2>Top Rated</h2>
                    <div className="movie-container">
                        <div className="movies-grid">
                            {topRatedMovies.map(movie => (
                                <MovieDetails key={movie.id} movieData={movie} />
                            ))}
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <h2>Popular</h2>
                    <div className="movie-container">
                        <div className="movies-grid">
                            {popularMovies.map(movie => (
                                <MovieDetails key={movie.id} movieData={movie} />
                            ))}
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <h2>Upcoming</h2>
                    <div className="movie-container">
                        <div className="movies-grid">
                            {upcomingMovies.map(movie => (
                                <MovieDetails key={movie.id} movieData={movie} />
                            ))}
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </main>
    );
}

export default PageHome;
