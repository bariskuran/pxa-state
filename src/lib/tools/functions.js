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
export const muToImmu = (data, IMMUTABLE_NAME) =>
    typeOf(data) === "object" && Object.keys(data).length < 2 ? data[IMMUTABLE_NAME] : data;

/**
 * Freezed for immer
 */
export const freezedState = (data) => freeze(typeof data === "function" ? data() : data, true);

/**
 *
 * @description This function generates new data and saves it.
 * @returns immuData
 */
export const setState = (settings) => {
    const { fn, currRef, immutableName } = settings || {};
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
export const findDifferences = (oldConst, newConst, basePath) => {
    const [type1, type2] = typeOf(oldConst, newConst);
    let result = {};

    if (type1 === "undefined" || type2 === "undefined" || type1 === "null" || type2 === "null" || type1 !== type2) {
        result[basePath || "state"] = newConst;
    } else if (type1 === "function") {
        result[basePath || "state"] = newConst;
    } else if (type1 === "array" || type1 === "object") {
        Object.keys(newConst).forEach((key) => {
            const currentPath = basePath ? `${basePath}.${key}` : key;
            const nested = findDifferences(oldConst[key], newConst[key], currentPath);
            result = { ...result, ...nested };
        });
        Object.keys(oldConst).forEach((key) => {
            const currentPath = basePath ? `${basePath}.${key}` : key;
            if (newConst[key] === undefined) {
                result[currentPath] = undefined;
            }
        });
    } else if (oldConst !== newConst) {
        result[basePath || "state"] = newConst;
    }

    return result;
};
