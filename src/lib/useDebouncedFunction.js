import { useRef, useEffect } from "react";

const useDebouncedFunction = (fn, delay = 500) => {
    const timeout = useRef();
    const clear = () => clearTimeout(timeout?.current);

    useEffect(() => {
        return () => clear();
    }, []);

    return (...args) => {
        clear();
        timeout.current = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

export default useDebouncedFunction;
