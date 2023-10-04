import { produce, freeze } from "immer";
import { immuToMu, muToImmu } from "./functions";

export const setState = (immerFn, dataRef, IMMUTABLE_NAME, setData) => {
    const pro = () => produce(immuToMu(dataRef?.current, IMMUTABLE_NAME), immerFn);
    const fre = () => freeze(immerFn);
    const newData = typeof immerFn === "function" ? pro() : fre();
    const immuData = muToImmu(newData, IMMUTABLE_NAME);
    if (dataRef) dataRef.current = immuData;
    if (setData) setData(immuData);
    return immuData;
};
