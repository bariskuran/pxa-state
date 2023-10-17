import { useLayoutEffect } from "react";
import usePxaContext from "./usePxaContext";

const usePrepareContext = (newValue, settings, context) => {
    console.log(context);
    const [set, value] = usePxaContext((s) => [s.set, s.value], context);
    useLayoutEffect(() => {
        set(newValue, settings);
    }, []);
    return null;
};
export default usePrepareContext;
