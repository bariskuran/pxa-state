import { useEffect } from "react";

const usePrepareContext = (context, newValue, settings) => {
    const prepareContext = context((s) => s.prepareContext);
    useEffect(() => {
        prepareContext(newValue, settings);
    }, []);
    return null;
};
export default usePrepareContext;
