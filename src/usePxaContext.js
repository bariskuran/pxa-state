const usePxaContext = (fn, context) => {
    const FN_STR = fn.toString();
    const STATE_KEY = FN_STR.charAt(0) === "(" ? FN_STR.match(/\((\w+)\)=>/)[1] : FN_STR.match(/(\w+)=>/)[1];
    const regex = new RegExp(`${STATE_KEY}\\.(\\w+)`, "g");
            const keys = [...FN_STR.matchAll(regex)].map((match) => match[1]);
    return keys.map((key) => context((s = {}) => s[key]));
};
export default usePxaContext;
