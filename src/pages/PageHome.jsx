import { useEffect, useState } from "react";
import {SwipeCarousel} from "../components/SwipeCarousel";
import { appTitle, apiKey, endPointPlayingNow, endPointPopular, endPointUpcoming, endPointTopRated } from "../globals/globalVariables";
import { shuffleArray } from "../utils/utilityFunctions";
import CategoryTabs from "../components/CategoryTabs";
import MovieCardCarousel from "../components/MovieCardCarousel";
import MovieCardOneColumn from "../components/MovieCardOneColumn";
import { useSelector } from "react-redux";
import useDeviceDetection from "../utils/useDeviceDetection";
import LoadingScreen from "../components/LoadingScreen";

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const device = useDeviceDetection();

    const favs = useSelector((state) => {
        return state.favs.items;
    });


    //Page Title
    useEffect( () => {
        document.title = `Home | ${appTitle}`;
    }, []);

    // loading screen
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        // Fetch popular movies for hero section carousel
        const fetchPopularCarousel = async () => {
            try {
                const response = await fetch(`${endPointPopular}?api_key=${apiKey}`);
                const data = await response.json();
                if (data.results.length > 0) {
                    const shuffledResults = shuffleArray(data.results);
                    const selectedResults = shuffledResults.slice(0, 6);
                    setPopularCarousel(selectedResults);
                }
            } catch (error) {
                setError("Failed to fetch popular movies. Please try again later.");
            }
        };
    
        fetchPopularCarousel(); // Call the function to fetch popular movies initially
    }, []);

    useEffect(() => {
        // Function to fetch movies based on the selected category
        const fetchMoviesByCategory = async () => {
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
            }
        };
        
        fetchMoviesByCategory(); // Call the function to fetch movies when selectedCategory changes
    }, [selectedCategory]);

    //Handle function for when a user clicks a different category
    const handleChangeCategory = (category) => {
        setSelectedCategory(category);
    };

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

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div>
        
            {/* Hero Carousel */}
            <SwipeCarousel backdropImgs={backdropImgs} movieInfo={popularCarousel}/>

            {/* Category Tabs */}
            <CategoryTabs handleChangeCategory={handleChangeCategory}/>

            {/* Error message */}
            {error && <div className="text-white text-center">{error}</div>}
            
            {/* Content */}
                <>
                    {/* Mobile view */}
                    {device === 'Mobile' && (
                        <div className="card-flex">
                            <MovieCardOneColumn
                                movies={movies}
                                selectedCategory={selectedCategory}
                                favs={favs}
                            />
                        </div>
                    )}
    
                    {/* Desktop view */}
                    {device === 'Desktop' && (
                        <div className="card-carousel">
                            <MovieCardCarousel
                                movieInfo={movies}
                                selectedCategory={selectedCategory}
                                favs={favs}
                            />
                        </div>
                    )}
                </>
        </div>
    );
    
}

export default PageHome;
