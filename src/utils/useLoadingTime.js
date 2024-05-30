import { useState, useRef } from "react";

const useLoadingTime = (minLoadingTime = 2000) => {

    // state to store loading stat
    const [loading, setLoading] = useState(true);

    // ref to store the start time of load
    const startLoadingRef = useRef(null);
    
    // function to start loading using current time
    const startLoading = () => {
        startLoadingRef.current = Date.now();
        setLoading(true);
    };

    // function to stop loading after minLoadingTime of 2 secs
    const stopLoading = () => {
    const duration = Date.now() - startLoadingRef.current;
    setTimeout(() => setLoading(false), Math.max(0, minLoadingTime - duration));
    };

    return [loading, startLoading, stopLoading];
};

export default useLoadingTime;