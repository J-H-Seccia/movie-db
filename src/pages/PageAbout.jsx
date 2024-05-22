import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";
import tmdbLogo from "../images/tmdb-logo.svg";
import ActorFallback from "../components/FallBackProfile";

function PageAbout() {
    // Page Title
    useEffect(() => {
        document.title = `About | ${appTitle}`;
    }, []);

    return (
        <>
            <div>

                <header>
                    <h1 className="text-3xl font-bold text-center no-underline pt-4 text-white">
                        About
                    </h1>
                </header>
                <section>
                    <div className="p-4">
                        <p className="text-sm md:text-base lg:text-lg text-white">
                            At ScreenScape, we're passionate about films. Whether you're a casual moviegoer, a dedicated cinephile, or a filmmaker yourself, our platform is designed to cater to your every need.<br /><br />
                            Explore our vast collection of movies spanning across genres, decades, and cultures. From classic masterpieces to the latest blockbusters, we've got you covered.<br /><br />
                            But ScreenScape is more than just a repository of films. It's a community of fellow movie enthusiasts, where you can connect, discuss, and share your love for cinema.<br /><br />
                            Our mission is to make the magic of movies accessible to everyone. Whether you're looking for recommendations, trivia, or behind-the-scenes insights, you'll find it here.<br /><br />
                            Join us on this cinematic journey and let's celebrate the art of storytelling together.<br /><br />
                            ScreenScape - Where Every Movie Has a Story.
                        </p>
                    </div>
                </section>

                <section className="p-4">
                    <h2 className="font-bold mb-4 text-2xl">Our Team Members:</h2>

                    <article className="grid sm:grid-cols-2 gap-4">

                        <div className="flex flex-col items-center bg-background p-4 rounded-3xl">
                            <ActorFallback />
                            <p><span className="font-bold">Jacob Harris</span><br />Jacob crafts digital worlds with lines of code, turning ideas into interactive realities. From sleek designs to seamless functionality, Jacob thrives on the thrill of bringing websites to life, one keystroke at a time.</p>
                        </div>

                        <div className="flex flex-col items-center bg-background p-4 rounded-3xl">
                            <ActorFallback />
                            <p><span className="font-bold">Nina Weng</span><br />Nina is adept at translating client visions into reality, ensuring each project not only meets but exceeds expectations. Her dedication to staying updated with the latest technologies allows her to deliver cutting-edge solutions that elevate user experiences.</p>
                        </div>

                        <div className="flex flex-col items-center bg-background p-4 rounded-3xl">
                            <ActorFallback />
                            <p><span className="font-bold">Chris Hoornaert</span><br />Chris' expertise in front-end development is truly impressive. His attention to detail shines through in every project he undertakes. He seamlessly integrates design elements with functionality, resulting in websites that are both visually stunning and user-friendly.</p>
                        </div>

                        <div className="flex flex-col items-center bg-background p-4 rounded-3xl">
                            <ActorFallback />
                            <p><span className="font-bold">Carol Chan</span><br />Carol's dedication to crafting immersive digital experiences is evident in every project she delivers. Carol's keen eye for design and knack for problem-solving make her a valuable asset to any team.</p>
                        </div>
                    </article>

                    <br />
                    <p className="font-bold">Credits to:</p>
                    <br />
                    <p className="w-1/2 md:w-1/3 mx-auto sm:ml-0"><a href="https://www.themoviedb.org/"><img src={tmdbLogo} alt="TMDB Logo" /></a></p>
                </section>

            </div>
        </>
    );
}

export default PageAbout;
