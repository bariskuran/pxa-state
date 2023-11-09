import { typeOf } from "./tools/functions";

const usePxaContext = (context, fnOrStr = (s) => [s.set]) => {
    const type = typeOf(fnOrStr);
    let keys;

    if (type === "function") {
        let FN_STR = fnOrStr.toString();
        if (FN_STR.startsWith("function")) FN_STR = convertFunctionString(FN_STR);
        const MATCH = FN_STR.match(/\(([^)]+)\)\s*=>/);
        const STATE_KEY = MATCH ? MATCH[1] : "s";
        const regex = new RegExp(`${STATE_KEY}\\.([\\w.]+)`, "g");
        keys = [...FN_STR.matchAll(regex)].map((match) => match[1]);
    } else if (type === "string") {
        keys = fnOrStr?.split(",").map((it) => it.trim());
    } else {
        throw new Error("Unknown type for usePxaContext");
    }

    const obj = {};
    keys.forEach((key) => {
        if (key.includes(".")) {
            const innerKeys = key.split(".");
            const value = innerKeys.reduce(
                (acc, innerKey) => {
                    if (acc && acc[innerKey] !== undefined) return acc[innerKey];
                    return undefined;
                },
                context((s) => s),
            );
            if (value !== undefined) assignValueToObject(obj, innerKeys, value);
        } else {
            // const value = context((s) => s[key]);
            // if (value !== undefined) obj[key] = value;
        }
    });
    return obj;
};

export default usePxaContext;

const convertFunctionString = (inputString) => {
    const content = inputString.match(/\(([^)]+)\)/);
    if (content) {
        const parameters = content[1];
        const body = inputString.split("{")[1].split("return ")[1].split("}")[0].split(";").join("");
        return `(${parameters}) => (${body})`;
    } else return inputString;
};

const assignValueToObject = (obj, keys, value) => {
    const lastKey = keys.pop();
    let currentObj = obj;
    for (const key of keys) {
        if (!currentObj[key]) currentObj[key] = {};
        currentObj = currentObj[key];
    }
    currentObj[lastKey] = value;
};
