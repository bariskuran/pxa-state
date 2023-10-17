const usePxaContext = (fn, context) => {
    const FN_STR = fn?.toString() || "(s) => s.value";
    let STATE_KEY = "s";

    if (FN_STR.charAt(0) === "(") {
        const match = FN_STR.match(/\((\w+)\)=>/);
        console.log(FN_STR, typeof FN_STR, match);
        STATE_KEY = match[1];
    } else {
        const match = FN_STR.match(/(\w+)=>/);
        console.log(match);
        STATE_KEY = match[1];
    }

    const regex = new RegExp(`${STATE_KEY}\\.(\\w+)`, "g");
    const keys = [...FN_STR.matchAll(regex)].map((match) => match[1]);
    return keys.map((key) => context((s = {}) => s[key]));
};
export default usePxaContext;
