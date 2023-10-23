import createPxaContext from "./createPxaContext";

const usePxaContext = (context = createPxaContext(), fn = (s) => [s.set]) => {
    const FN_STR = fn.toString();
    const STATE_KEY = FN_STR.charAt(0) === "(" ? FN_STR.match(/\((\w+)\)=>/)[1] : FN_STR.match(/(\w+)=>/)[1];
    const regex = new RegExp(`${STATE_KEY}\\.(\\w+)`, "g");
    const keys = [...FN_STR.matchAll(regex)].map((match) => match[1]);
    const obj = {};
    keys.forEach((key) => {
        const value = context((s = {}) => s[key]);
        if (value !== undefined) obj[key] = value;
    });
    return obj;
};

export default usePxaContext;
