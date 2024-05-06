import { useEffect, useState } from "react";
import { appTitle } from "../globals/globalVariables";
import {SwipeCarousel} from "../components/SwipeCarousel";
import { apiKey, apiRAT } from "../globals/globalVariables";

import one from '../images/nature/1.jpg';

function PageHome() {
    const [movieInfo, setMovieInfo] = useState(null);
    const [backdropImgs, setBackdropImgs] = useState(null);

    //Page Title
    useEffect( () => {
        document.title = `Home | ${appTitle}`;
    }, []);

    //Fetches
    useEffect( () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${apiRAT}`
            }
          };

        const fetchPopular = async () => {
            const response = await fetch( 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options );
            let data = await response.json();
            console.log( data );
            setMovieInfo(data);
        }



        fetchPopular();
    }, [])

    useEffect(() => {
        function buildBackdropPaths() {
            if (movieInfo && movieInfo.results) {
                const backdropPaths = movieInfo.results.map(movie => movie.backdrop_path);
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
    }, [movieInfo]);

    
    
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Home Page
            </h1>
            <SwipeCarousel backdropImgs={backdropImgs} movieInfo={movieInfo}/>
        </div>

        

     );
}

export default PageHome;