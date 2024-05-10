import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';

function PageFavourites() {

    const favs = useSelector((state) => state.favs.items);
    console.log(favs)

    //Page Title
    useEffect( () => {
        document.title = `Favourites | ${appTitle}`;
    }, []);

    // function renderFavourites() {
    //     if(favs.length < 1){
    //         return <p>No favourite movies. Return to the <Link to="/">home</Link> page to add some favourite movies.</p>
    //     } else {
    //         return <div className="grid grid-cols-3 gap-4">
    //         {favs.map((movie, i) => {
    //             return <MovieCard
    //                 key={i}
    //                 movieObj={movie}
    //                 isFav={true}
    //             />
    //         })}
    //         </div>}

    //     }
    // }

    return (
        <>
        <h1 className="text-3xl font-bold underline">
            Favourites
        </h1>
        {favs.length < 1 ?
        <p>No favourite movies. Return to the <Link to="/">home</Link> page to add some favourite movies.</p>
        :
        <div className="grid grid-cols-3 gap-4">
            {favs.map((movie, i) => {
                return <MovieCard
                    key={i}
                    movie={movie}
                    isFav={true}
                />
            })}

        </div>}





        </>
     );
}

export default PageFavourites;
