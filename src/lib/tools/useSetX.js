import { typeOf } from "./functions";
export const useSetX = (curr = {}, incoming) => {
    const type = typeOf(incoming);
    if (type !== "object" && type !== "function") {
        return incoming;
    }

    let newState = { ...curr };
    if (type === "object") {
        Object.entries(incoming).forEach(([path, value]) => {
            let splittedPath = path?.split(".") || ["undefinedPath"];
            newState = setNestedValue(newState, splittedPath, value);
        });
    } else {
        Object.entries(incoming(curr)).forEach(([path, value]) => {
            let splittedPath = path?.split(".") || ["undefinedPath"];
            newState = setNestedValue(newState, splittedPath, value);
        });
    }

    return removeUndefined(newState);
};

const setNestedValue = (state, splittedPath, newval) => {
    if (splittedPath.length > 1) {
        let field = splittedPath.shift();
        let subObject = {};
        try {
            subObject = { ...setNestedValue(state[field], splittedPath, newval) };
        } catch {
            subObject = {
                ...setNestedValue(state, splittedPath, newval),
            };
        }
        return { ...state, [field]: subObject };
    } else {
        let updatedState = {};
        updatedState[splittedPath.shift()] = newval;
        return { ...state, ...updatedState };
    }
};

const removeUndefined = (obj2) => {
    if (typeof obj2 !== "object" || obj2 === null) return obj2;

    if (Array.isArray(obj2)) {
        const obj = [...obj2];
        for (let i = obj.length - 1; i >= 0; i--) {
            obj[i] = removeUndefined(obj[i]);
            if (obj[i] === undefined) {
                obj.splice(i, 1);
            }
        }
        return obj;
    } else {
        const obj = { ...obj2 };
        for (const key in obj) {
            obj[key] = removeUndefined(obj[key]);
            if (obj[key] === undefined) {
                delete obj[key];
            }
        }
        return obj;
    }
};
