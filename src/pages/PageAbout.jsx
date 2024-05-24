import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";
import tmdbLogo from "../images/tmdb-logo.svg";
import ActorFallback from "../components/FallBackProfile";

function PageAbout() {
    // Page Title
    useEffect(() => {
        document.title = `About | ${appTitle}`;
    }, []);

    // storing team members info in an array of objects for DRY
    const teamMembers = [
        {
            name: "Jacob Harris",
            description: "Jacob crafts digital worlds with lines of code, turning ideas into interactive realities. From sleek designs to seamless functionality, Jacob thrives on the thrill of bringing websites to life, one keystroke at a time."
        },
        {
            name: "Nina Weng",
            description: "Nina is adept at translating client visions into reality, ensuring each project not only meets but exceeds expectations. Her dedication to staying updated with the latest technologies allows her to deliver cutting-edge solutions that elevate user experiences."
        },
        {
            name: "Chris Hoornaert",
            description: "Chris' expertise in front-end development is truly impressive. His attention to detail shines through in every project he undertakes. He seamlessly integrates design elements with functionality, resulting in websites that are both visually stunning and user-friendly."
        },
        {
            name: "Carol Chan",
            description: "Carol's dedication to crafting immersive digital experiences is evident in every project she delivers. Carol's keen eye for design and knack for problem-solving make her a valuable asset to any team."
        }
    ];

    return (
        <div className="text-white">
            <header className="text-center pt-4">
                <h1 className="text-3xl font-bold uppercase">About</h1>
            </header>
            <section className="p-4">
                <div className="grid gap-6">
                    <p className="text-lg">
                        At ScreenScape, we're passionate about films. Whether you're a casual moviegoer, a dedicated cinephile, or a filmmaker yourself, our platform is designed to cater to your every need.
                    </p>
                    <p className="text-lg">
                        Explore our vast collection of movies spanning across genres, decades, and cultures. From classic masterpieces to the latest blockbusters, we've got you covered.
                    </p>
                    <p className="text-lg">
                        But ScreenScape is more than just a repository of films. It's a community of fellow movie enthusiasts, where you can connect, discuss, and share your love for cinema.
                    </p>
                    <p className="text-lg">
                        Our mission is to make the magic of movies accessible to everyone. Whether you're looking for recommendations, trivia, or behind-the-scenes insights, you'll find it here.
                    </p>
                    <p className="text-lg">
                        Join us on this cinematic journey and let's celebrate the art of storytelling together.
                    </p>
                    <p className="text-lg">
                        ScreenScape - Where Every Movie Has a Story.
                    </p>
                </div>
            </section>
            <section className="p-4">
                <h2 className="font-bold mb-4 text-2xl">Our Team Members</h2>
                <article className="grid sm:grid-cols-2 gap-4">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-center border-4 border-copy-lighter border-double p-4 rounded-3xl">
                            <ActorFallback />
                            <p className="text-lg font-bold text-whitey">{member.name}</p>
                            <p className="text-lg text-whitey">{member.description}</p>
                        </div>
                    ))}
                </article>

                    <div className="m-4 mt-8 flex flex-col gap-4">
                       
                        <a href="https://www.themoviedb.org/">
                            <img src={tmdbLogo} alt="TMDB Logo" className="w-full mx-auto sm:ml-0" />
                        </a>

                        <p>
                            This application utilizes the API provided by The Movie Database (TMDb) to access a comprehensive database of movie-related information, including titles, plot summaries, cast and crew details, ratings, and a vast collection of images. By leveraging TMDb's API, we aim to provide users with a rich and immersive movie browsing experience. We acknowledge and appreciate TMDb's contribution to our app's functionality and content
                        </p>

                    </div>
            </section>
        </div>
    );
}

export default PageAbout;
