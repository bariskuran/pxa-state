import { freeze } from "immer";

/**
 * @param {any} value
 * @returns advanced typeof
 */
export const typeOf = (value) => {
    let type = typeof value;
    if (type === "object" && Array.isArray(value)) type = "array";
    if (type === "object" && !value) type = "null";
    return type;
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
export const muToImmu = (data, IMMUTABLE_NAME) => (typeOf(data) === "object" && Object.keys(data).length < 2 ? data[IMMUTABLE_NAME] : data);

/**
 * Freezed for immer
 */
export const freezedState = (data) => freeze(typeof data === "function" ? data() : data, true);
