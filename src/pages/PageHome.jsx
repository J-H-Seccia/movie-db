import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";


function PageHome() {
    //Page Title
    useEffect( () => {
        document.title = `Home | ${appTitle}`;
    }, []);

    return ( 
        <h1 className="text-3xl font-bold underline">
            Home Page
        </h1>
     );
}

export default PageHome;