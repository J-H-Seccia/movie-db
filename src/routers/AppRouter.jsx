//React Imports
import { useState } from 'react';

//Router Imports
import { Routes, Route, BrowserRouter,  } from 'react-router-dom';

// Page Imports
import PageHome from '../pages/PageHome';
import PageAbout from '../pages/PageAbout';
import PageSingle from '../pages/PageSingle';
import PageMovies from '../pages/PageMovies';
import PageFavourites from '../pages/PageFavourites';
import PageNotFound from '../pages/PageNotFound';

//Component Imports ( Header, Footer, Nav )
import Header from '../components/Header';
import Footer from '../components/Footer';


function AppRouter() {
    return (
        <BrowserRouter>

            <div className="wrapper bg-copy">
                <Header />
                    <main>
                        <Routes>
                            <Route path="/" exact element={<PageHome />} />
                            <Route path="/about" element={<PageAbout />} />
                            <Route path="/movie/:id" element={<PageSingle />} />
                            <Route path="/browse/movies" element={<PageMovies />} />
                            <Route path="/favourites" element={<PageFavourites />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </main>
                <Footer />
            </div>

        </BrowserRouter>
    );
}

export default AppRouter;
