import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';
function PageFavourites() {

    const favs = useSelector((state) => state.favs.items);
    //Page Title
    useEffect( () => {
        document.title = `Favourites | ${appTitle}`;
    }, []);

    return (
        <>
        <section className="favourites-wrapper bg-copy text-white">
            <h1 className="text-3xl font-bold underline">
                Favourites
            </h1>
            {favs.length < 1 ?
            <p className="text-xl">No favourite movies. Return to the <Link to="/">home</Link> page to add some favourite movies.</p>
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
        </section>
        </>
     );
}

export default PageFavourites;
