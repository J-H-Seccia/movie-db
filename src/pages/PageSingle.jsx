import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

function PageSingle() {
    //Page Title
    useEffect( () => {
        document.title = `Single Info | ${appTitle}`;
    }, []);

    return ( 
        <h1 className="text-3xl font-bold underline">
            Single Info
        </h1>
     );
}

export default PageSingle;