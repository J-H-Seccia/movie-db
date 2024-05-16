import { useEffect, useState } from "react";
import {SwipeCarousel} from "../components/SwipeCarousel";
import { appTitle, apiRAT, apiKey, endPointPlayingNow, endPointPopular, endPointUpcoming, endPointTopRated, endPointSearch, imageBaseURL } from "../globals/globalVariables";
import { shuffleArray } from "../utils/utilityFunctions";
import CategoryTabs from "../components/CategoryTabs";
import MovieCardCarousel from "../components/MovieCardCarousel";
import MovieCardOneColumn from "../components/MovieCardOneColumn";
import { useSelector } from "react-redux";
// import DeviceDetection from "../components/DeviceDetection";
import useDeviceDetection from "../utils/useDeviceDetection";

const CATEGORIES = {
    nowPlaying: 'Now Playing',
    popular: 'Popular',
    topRated: 'Top Rated',
    upcoming: 'Upcoming'
}

function PageHome() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.nowPlaying);
    const [popularCarousel, setPopularCarousel] = useState(null);
    const [backdropImgs, setBackdropImgs] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const device = useDeviceDetection();

    const favs = useSelector((state) => {
        return state.favs.items;
    });


    //Page Title
    useEffect( () => {
        document.title = `Home | ${appTitle}`;
    }, []);

        useEffect(() => {
        // Function to fetch movies based on the selected category
        const fetchMoviesByCategory = async () => {
            setLoading(true);
            try {
                let endpoint;
                switch(selectedCategory) {
                    case CATEGORIES.nowPlaying:
                        endpoint = endPointPlayingNow;
                        break;
                    case CATEGORIES.popular:
                        endpoint = endPointPopular;
                        break;
                    case CATEGORIES.topRated:
                        endpoint = endPointTopRated;
                        break;
                    case CATEGORIES.upcoming:
                        endpoint = endPointUpcoming;
                        break;
                    default:
                        endpoint = endPointPlayingNow;
                }

                const response = await fetch(`${endpoint}?api_key=${apiKey}`);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    setMovies(data.results);
                    setSelectedMovie(data.results[0].id);
                } else {
                    setError("No movies found for the selected category.");
                }
            } catch (error) {
                setError("Failed to fetch movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMoviesByCategory(); // Call the function to fetch movies initially
    }, [selectedCategory]);

    //Handle function for when a user clicks a different category
    const handleChangeCategory = (category) => {
        setSelectedCategory(category);
    };

    //Fetch popular movies for hero section carousel
    useEffect( () => {

        const fetchPopularCarousel = async () => {
            const response = await fetch( `${endPointPopular}?api_key=${apiKey}` );
            let data = await response.json();
            console.log( data );
            if (data.results.length > 0) {
                       // Shuffle the array of results
                        const shuffledResults = shuffleArray(data.results);
                        // Select the first 6 entries
                        const selectedResults = shuffledResults.slice(0, 6);
                        // Set the popular carousel with the selected results
                        setPopularCarousel(selectedResults);
            }
        }

        fetchPopularCarousel();
    }, [])

    //Build paths for backdrop images for hero carousel
    useEffect(() => {
        function buildBackdropPaths() {
            if (popularCarousel) {
                const backdropPaths = popularCarousel.map(movie => movie.backdrop_path);
                const baseImgUrl = "http://image.tmdb.org/t/p/w1280"
                const fullImgUrls = [];
                backdropPaths.forEach(path => {
                    fullImgUrls.push(`${baseImgUrl}${path}`);
                });
                setBackdropImgs(fullImgUrls);
            }
        }
    
        buildBackdropPaths();
    }, [popularCarousel]);
    
    return (
        <div>

            {/* <div className="device-detection">
                <DeviceDetection />
            </div> */}

            <SwipeCarousel backdropImgs={backdropImgs} movieInfo={popularCarousel}/>

            <div className="category-tabs">
                <CategoryTabs handleChangeCategory={handleChangeCategory}/>
            </div>

            {/* if on mobile, just show scrollable cards (flex) and a more info btn that takes you to the single detail page */}
            {device === 'Mobile' && (
            <div className="card-flex">
                <MovieCardOneColumn 
                movies={movies} 
                selectedCategory={selectedCategory}
                favs={favs}
                />
            </div>
            )}

            {/* if on desktop, show card carousel */}
            {device === 'Desktop' && (
            <div className="card-carousel">
                <MovieCardCarousel 
                movieInfo={movies} 
                selectedCategory={selectedCategory}
                favs={favs}
                />
            </div>
            )}


        </div>

        

     );
}

export default PageHome;