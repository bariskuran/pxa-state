import { typeOf } from "./functions";
export const useSetX = (curr = {}, incoming) => {
    const type = typeOf(incoming);
    if (type !== "object" && type !== "function") throw new Error("setX only accepts objects or functions: " + type);
    //
    const newState = { ...curr };
    if (type === "object") {
        for (const [path, value] of Object.entries(incoming)) {
            setNestedValue(newState, path, value);
        }
    } else {
        const response = incoming(curr);
        for (const [path, value] of Object.entries(response)) {
            setNestedValue(newState, path, value);
        }
    }
    return newState;
};
const setNestedValue = (state, path, value) => {
    const keys = path.split(".");
    keys.reduce((obj, key, index) => {
        if (index === keys.length - 1) obj[key] = value;
        else {
            obj[key] = obj[key] || {};
            return obj[key];
        }
        return obj;
    }, state);
};
