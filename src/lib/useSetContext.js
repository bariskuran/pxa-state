import { useEffect } from "react";
import { usePxaContext } from "pxa-state";

const useSetContext = (context, incomingFunction) => {
    const { reSet } = usePxaContext(context, (s) => [s.reSet]);
    const setData = async () => {
        const response = await incomingFunction();
        const [initialValue = {}, settings = {}] = response;
        reSet(initialValue, settings);
    };
    useEffect(() => {
        setData();
    }, []);

    return null;
};
export default useSetContext;
