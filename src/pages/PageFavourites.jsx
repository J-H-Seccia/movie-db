import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';

function PageFavourites() {

    const favs = useSelector((state) => state.favs.items);
    console.log({favs})
    
    //Page Title
    useEffect( () => {
        document.title = `Favourites | ${appTitle}`;
    }, []);

    return ( 
        <>
        <h1 className="text-3xl font-bold underline">
            Favourites
        </h1>
        
    
    
        
        
        </>
     );
}

export default PageFavourites;