import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';


const DRAG_BUFFER = 50;
const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
}

export const SwipeCarousel = ({ backdropImgs }) => {
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
            <Images imgIndex={imgIndex} backdropImgs={backdropImgs} />
        </motion.div>

        <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} backdropImgs={backdropImgs}/>
    </div>
    )
}

const Images = ({ imgIndex, backdropImgs }) => {
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
                />
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