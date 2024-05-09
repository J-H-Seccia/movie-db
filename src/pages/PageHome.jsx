import { useEffect, useState } from "react";
import {SwipeCarousel} from "../components/SwipeCarousel";
import { appTitle, apiRAT, apiKey, endPointPlayingNow, endPointPopular, endPointUpcoming, endPointTopRated, endPointSearch, imageBaseURL } from "../globals/globalVariables";
import { shuffleArray } from "../utils/utilityFunctions";
import CategoryTabs from "../components/CategoryTabs";

const CATEGORIES = {
    nowPlaying: 'Now Playing',
    popular: 'Popular',
    topRated: 'Top Rated',
    upcoming: 'Upcoming'
}

function PageHome() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [popularCarousel, setPopularCarousel] = useState(null);
    const [backdropImgs, setBackdropImgs] = useState(null);

    //Page Title
    useEffect( () => {
        document.title = `Home | ${appTitle}`;
    }, []);

    useEffect(() => {
        // Fetch movies based on the selected category
        const fetchMovies = async () => {
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
            if (data.results.length > 0) {
                setMovies(data.results);
                setSelectedMovie(data.results[0].id);
            }
        };
        fetchMovies();
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
                        // Select the first 5 entries
                        const selectedResults = shuffledResults.slice(0, 6);
                        // Set the popular carousel with the selected results
                        setPopularCarousel(selectedResults);
            }
        }

        fetchPopularCarousel();
    }, [])

    
    //Build paths for backdrop images
    useEffect(() => {
        function buildBackdropPaths() {
            if (popularCarousel ) {
                const backdropPaths = popularCarousel.map(movie => movie.backdrop_path);
                const baseImgUrl = "http://image.tmdb.org/t/p/w1280"
                const fullImgUrls = [];
                backdropPaths.forEach(path => {
                    fullImgUrls.push(`${baseImgUrl}${path}`);
                });
                console.log(fullImgUrls);
                setBackdropImgs(fullImgUrls);
            }
        }
    
        buildBackdropPaths();
    }, [popularCarousel]);

    
    
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Home Page
            </h1>

            <SwipeCarousel backdropImgs={backdropImgs} movieInfo={popularCarousel}/>

            <div className="category-tabs ">
                <CategoryTabs handleChangeCategory={handleChangeCategory}/>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {movies.map(movie => (
                    <img 
                    key={movie.id} 
                    src={`${imageBaseURL}w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className={`${selectedMovie === movie.id ? "selected" : ""} cursor-pointer`}
                    onClick={() => handleGetMovie(movie.id)} 
                    />
                ))}
            </div>
        </div>

        

     );
}

export default PageHome;