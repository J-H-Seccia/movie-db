import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { appTitle, apiRAT } from "../globals/globalVariables";

function PageSingle() {
    // Get the movie ID from the URL path
    const { id } = useParams(); 

    const [movieInfo, setMovieInfo] = useState(null);
    const navigate = useNavigate();

    //Page Title
    useEffect( () => {
        document.title = `Single Info | ${appTitle}`;
    }, []);

    useEffect( () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${apiRAT}`
            }
          };

        const fetchMovie = async () => {
            const response = await fetch( `https://api.themoviedb.org/3/movie/${id}?language=en-US`, options );
            let data = await response.json();
            console.log( data );
            setMovieInfo(data);
        }



        fetchMovie();
    }, [])


    return ( 
        <div>
            <h1 className="text-3xl font-bold underline">
                Single Info
            </h1>
            {movieInfo && (
                <div>

                    <h3 className="text-5xl font-bold">{movieInfo.title}</h3>
                    <p className="text-3xl">Release: {movieInfo.release_date}</p>
                    <p className="text-3xl">Synopsis: <p className="font-bold">{movieInfo.overview}</p></p>
                    <p className="text-3xl">Runtime: {movieInfo.runtime} min</p>
                    <img src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`} alt="Movie poster" />

                </div>
            )}
        </div>
     );
}

export default PageSingle;