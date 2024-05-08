import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

function PageNotFound() {
    //Page Title
    useEffect( () => {
        document.title = `404 | ${appTitle}`;
    }, []);

    return ( 
    <h1 className="text-3xl font-bold underline">
        404 Page Not Found
    </h1>
     );
}

export default PageNotFound;