import { useEffect, useRef } from "react";

const useEffectAfterMount = (callback, dependencies) => {
    const ref = useRef(false);

    useEffect(() => {
        if (ref?.current) {
            return callback();
        } else {
            ref.current = true;
        }
    }, dependencies);

    return null;
};

export default useEffectAfterMount;
