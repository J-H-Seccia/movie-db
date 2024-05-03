import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

function PageFavourites() {
    //Page Title
    useEffect( () => {
        document.title = `Favourites | ${appTitle}`;
    }, []);

    return ( 
        <h1 className="text-3xl font-bold underline">
            Favourites
        </h1>
     );
}

export default PageFavourites;