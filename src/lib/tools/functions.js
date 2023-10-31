import { produce, freeze } from "immer";

/**
 * @param {any} value / can be an array
 * @example typeOf("str")
 * @example typeOf(["str",5,[0,1,2]])
 * @returns advanced typeof
 */
export const typeOf = (...args) => {
    if (args.length === 0) return;
    const types = [];
    args.forEach((arg) => {
        let type = typeof arg;
        if (type === "object" && Array.isArray(arg)) type = "array";
        if (type === "object" && !arg) type = "null";
        types.push(type);
    });

    return types.length > 1 ? types : types[0];
};

/**
 * @description Converts immutable to mutable. str -> obj
 * @param {any} data
 * @param {string} IMMUTABLE_NAME
 * @returns mutable object
 */
export const immuToMu = (data, IMMUTABLE_NAME) => (typeOf(data) === "object" ? data : { [IMMUTABLE_NAME]: data });

/**
 * @description Converts mutable to immutable. obj -> str
 * @param {any} data
 * @param {string} IMMUTABLE_NAME
 * @returns immutable object
 */
export const muToImmu = (data, IMMUTABLE_NAME) => {
    const type = typeOf(data);
    const keys = type === "object" ? Object.keys(data) : [];
    const response =
        type === "object" && keys.length < 2 && keys.includes(IMMUTABLE_NAME) ? data[IMMUTABLE_NAME] : data;
    return response;
};

/**
 * Freezed for immer
 */
export const freezedState = (data) => freeze(typeof data === "function" ? data() : data, true);

/**
 *
 * @description This function generates new data and saves it.
 * @returns immuData
 */
export const setState = (props) => {
    const { fn, currRef, immutableName } = props || {};
    const pro = () => produce(immuToMu(currRef?.current, immutableName), fn);
    const fre = () => freeze(fn);
    const newData = typeof fn === "function" ? pro() : fre();
    const immuData = muToImmu(newData, immutableName);
    return immuData;
};

/**
 *
 * @description Finds difference inbetween two variables.
 * @param {object} - Old variable
 * @param {object} - New variable
 * @returns object of differences
 * @example var1 = {
                    p5: {
                        p6: [{
                            p7: {
                                p8: str1,
                                p12: ar1,
                    }}]}}
*           var 2 = {
                    p5: {
                        p6: [{
                            p7: {
                                p8: str2,
                            },
                            p11: ar1,
                    }]}}
            response = {
                "p5.p6.0.p7.p8": str2,
                "p5.p6.0.p11": ar1,
                "p5.p6.0.p7.p12": undefined,
            }
 */
export const findDifferences = (oldConst, newConst, IMMUTABLE_KEY_NAME, basePath) => {
    // console.log(oldConst, newConst);
    const [type1, type2] = typeOf(oldConst, newConst);
    let result = {};

    if (
        type1 !== type2 ||
        type1 === "function" ||
        type1 === "undefined" ||
        type2 === "undefined" ||
        type1 === "null" ||
        type2 === "null"
    ) {
        if (type2 === "object") result = newConst;
        else result[basePath || IMMUTABLE_KEY_NAME] = newConst;
    } else if (type1 === "array" || type1 === "object") {
        Object.keys(newConst).forEach((key) => {
            const currentPath = basePath ? `${basePath}.${key}` : key;
            const nested = findDifferences(oldConst[key], newConst[key], IMMUTABLE_KEY_NAME, currentPath);
            result = { ...result, ...nested };
        });
        Object.keys(oldConst).forEach((key) => {
            const currentPath = basePath ? `${basePath}.${key}` : key;
            if (newConst[key] === undefined) {
                result[currentPath] = undefined;
            }
        });
    } else if (oldConst !== newConst) {
        result[basePath || IMMUTABLE_KEY_NAME] = newConst;
    }

    return result;
};

/**
 * @description finds stringed path inside obj
 * @param {object} obj
 * @param {string} path
 * @returns value or undefined
 */
export const getValueByPath = (obj, path) => {
    const keys = path.split(".");
    return keys.reduce((acc, key) => {
        return acc ? acc[key] : undefined;
    }, obj);
};

export const triggerChangeListener = (dataRef, newData, currImmutableKeyName, currChangeListener) => {
    const newValues = findDifferences(dataRef?.current, newData, currImmutableKeyName);
    const keys = Object.keys(newValues);
    const previousValues = {};
    keys.forEach((key) => {
        if (key.includes(".")) {
            previousValues[key] = getValueByPath(dataRef?.current, key);
        } else if (typeof dataRef.current === "object") {
            previousValues[key] = dataRef?.current && dataRef?.current[key];
        } else {
            previousValues[key] = dataRef?.current;
        }
    });
    if (keys?.length > 0) currChangeListener(keys, newValues, previousValues);
};
