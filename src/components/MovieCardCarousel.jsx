import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MovieCard from "./MovieCard";
import useMeasure from "react-use-measure";
import {imageBaseURL} from '../globals/globalVariables.js';
import isFav from '../utils/isFav';

const IMGBASEURL = "http://image.tmdb.org/t/p/";
const CARD_WIDTH = 500;
const CARD_HEIGHT = 500;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const MovieCardCarousel = ({movieInfo, selectedCategory, favs}) => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(-850);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 1 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset + -3500) < CARD_SIZE * (movieInfo.length - CARD_BUFFER);
    console.log(CARD_SIZE * (movieInfo.length - CARD_BUFFER))

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) {
      return;
    }
    setOffset((pv) => (pv += CARD_SIZE));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) {
      return;
    }
    setOffset((pv) => (pv -= CARD_SIZE));
  };

  return (
    <section ref={ref}>
      <div className="relative overflow-hidden p-4 bg-copy-dark">
        {/* CARDS */}
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-2xl font-semibold text-white">
            {selectedCategory} <span className="text-primary-light">Movies</span>
          </p>
          <motion.div
            animate={{
              x: offset,
            }}
            className="flex justify-start"
          >
            {movieInfo.map((movie) => {
              return <MovieCard 
                key={movie.id} 
                movie={movie} 
                isFav={isFav(favs, null, movie.id)}/>;
            })}
          </motion.div>
        </div>

        {/* BUTTONS */}
        <>
          <motion.button
            initial={false}
            animate={{
              x: CAN_SHIFT_LEFT ? "0%" : "-100%",
            }}
            className="absolute left-0 top-[60%] z-30 rounded-r-xl bg-slate-100/30 p-3 pl-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pl-3"
            onClick={shiftLeft}
          >
            <FiChevronLeft />
          </motion.button>
          <motion.button
            initial={false}
            animate={{
              x: CAN_SHIFT_RIGHT ? "0%" : "100%",
            }}
            className="absolute right-0 top-[60%] z-30 rounded-l-xl bg-slate-100/30 p-3 pr-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pr-3"
            onClick={shiftRight}
          >
            <FiChevronRight />
          </motion.button>
        </>
      </div>
    </section>
  );
}

export default MovieCardCarousel;

