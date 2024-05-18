import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

function PageAbout() {
    //Page Title
    useEffect( () => {
        document.title = `About | ${appTitle}`;
    }, []);

    return ( 
        <>
            <h1 className="text-3xl font-bold underline">
                About
            </h1>
            <p>At ScreenScape, we're passionate about films. Whether you're a casual moviegoer, a dedicated cinephile, or a filmmaker yourself, our platform is designed to cater to your every need.
            </p>
            <p>Explore our vast collection of movies spanning across genres, decades, and cultures. From classic masterpieces to the latest blockbusters, we've got you covered.
            </p>
            <p>But ScreenScape is more than just a repository of films. It's a community of fellow movie enthusiasts, where you can connect, discuss, and share your love for cinema.
            </p>
            <p>Our mission is to make the magic of movies accessible to everyone. Whether you're looking for recommendations, trivia, or behind-the-scenes insights, you'll find it here.
            </p>
            <p>Join us on this cinematic journey and let's celebrate the art of storytelling together.
            </p>
            <p>ScreenScape - Where Every Movie Has a Story.
            </p>
        </>
     );
}

export default PageAbout;