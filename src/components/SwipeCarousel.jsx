import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const DRAG_BUFFER = 50;
const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
}

export const SwipeCarousel = ({ backdropImgs, movieInfo }) => {
    const [dragging, setDragging] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    const dragX = useMotionValue(0);

    useEffect(() => {
        const intervalRef = setInterval(() => {
            const x = dragX.get();
    
            if (x === 0) {
                setImgIndex((pv) => {
                    if (pv === backdropImgs.length - 1) {
                        return 0;
                    }
                    return pv + 1;
                });
            }
        }, AUTO_DELAY);
    
        return () => clearInterval(intervalRef);
    }, [backdropImgs]); 

    const onDragStart = () => {
        setDragging(true);
    }

    const onDragEnd = () => {
        setDragging(false);

        const x = dragX.get();

        if (x <= -DRAG_BUFFER && imgIndex < backdropImgs.length - 1) {
            setImgIndex((pv) => pv + 1)
        } else if (x >= DRAG_BUFFER && imgIndex > 0) {
            setImgIndex((pv) => pv - 1)
        }
    }


    return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 py-8">
        <motion.div 
        drag="x"
        dragConstraints={{
            left: 0,
            right: 0
        }}
        style={{
            x: dragX,
        }}
        animate={{
            translateX: `-${imgIndex * 100}%`
        }}
        transition={SPRING_OPTIONS}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className="flex items-center cursor-grab active:cursor-grabbing">
            <Images imgIndex={imgIndex} backdropImgs={backdropImgs} movieInfo={movieInfo}/>
        </motion.div>

        <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} backdropImgs={backdropImgs}/>
    </div>
    )
}

const Images = ({ imgIndex, backdropImgs, movieInfo }) => {
    const navigate = useNavigate();

    const handleMoreInfo = (movieId) => {
        navigate(`/movie/${movieId}`);
    }

    return backdropImgs ? (
        <>
            {backdropImgs.map((imgSrc, idx) => (
                <motion.div
                key={idx}
                    style={{
                        backgroundImage: `url(${imgSrc})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    animate={{
                        scale: imgIndex === idx ? 0.95 : 0.85,
                    }}
                    transition={SPRING_OPTIONS}
                    className="aspect-video w-screen shrink-0 rounded-xl bg-neutral-800 object-cover"
                >
                    {/* Text overlay */}
                    {movieInfo && movieInfo.results && (
                        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-black bg-opacity-50 text-white h-1/2">
                            <h3 className="text-5xl font-bold ">{movieInfo.results[idx].title}</h3>
                            <p className="text-3xl py-4">{movieInfo.results[idx].release_date}</p>
                            <p className="text-2xl">{movieInfo.results[idx].overview}</p>
                            <p className="absolute top-0 right-0 text-5xl px-4">Rating: {movieInfo.results[idx].vote_average}</p>
                            <button  className='p-4 rounded-full bg-sky-600 text-2xl w-44 text-center absolute bottom-0 left-0 mx-4 my-2'
                                onClick={() => handleMoreInfo(movieInfo.results[idx].id)}
                                >More Info</button>
                        </div>
                    )}
                </motion.div>
                    
                
            ))}
        </>
    ) : null;
};

const Dots = ({ imgIndex, setImgIndex, backdropImgs }) => {
    return <div className='mt-4 flex w-full justify-center gap-2'>
        {backdropImgs && backdropImgs.map((_img, idx) => {
            return <button 
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-color ${idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"}`}
            />
        })}
    </div>
}