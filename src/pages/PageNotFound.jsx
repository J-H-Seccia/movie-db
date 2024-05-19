import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

function PageNotFound() {
    //Page Title
    useEffect( () => {
        document.title = `404 | ${appTitle}`;
    }, []);

    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen mt-20">
            <header className="text-center">
                <h1 className="mx-[1.5rem] md:mx-0 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold no-underline">
                    404 Page Not Found
                </h1>
            </header>
            <main className="flex-1 text-center mt-10">
                <p className="text-1xl md:text-2xl lg:text-3xl">
                    Welcome to the void. Please navigate back to our homepage: <a href="/" className="text-blue-500 hover:underline" alt="homepage link">HOME</a>
                </p>
            </main>
        </div>
    );
    
    
}

export default PageNotFound;