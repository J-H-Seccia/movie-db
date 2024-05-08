import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

function PageAbout() {
    //Page Title
    useEffect( () => {
        document.title = `About | ${appTitle}`;
    }, []);

    return ( 
        <h1 className="text-3xl font-bold underline">
            About
        </h1>
     );
}

export default PageAbout;