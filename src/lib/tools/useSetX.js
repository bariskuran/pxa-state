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

    return newState;
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
        return removeUndefined({ ...state, [field]: subObject });
    } else {
        let updatedState = {};
        updatedState[splittedPath.shift()] = newval;
        return { ...state, ...updatedState };
    }
};

const removeUndefined = (obj) => {
    for (const prop in obj) {
        if (typeof obj[prop] === "object") {
            obj[prop] = removeUndefined(obj[prop]);
            if (Object.keys(obj[prop]).length === 0) delete obj[prop];
        } else if (obj[prop] === undefined) delete obj[prop];
    }
    return obj;
};
