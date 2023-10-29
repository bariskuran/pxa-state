const usePxaContext = (context, fn = (s) => [s.set]) => {
    let FN_STR = fn.toString();
    if (FN_STR.startsWith("function")) FN_STR = convertFunctionString(FN_STR);
    const MATCH = FN_STR.charAt(0) === "(" ? FN_STR.match(/\((\w+)\)=>/) : FN_STR.match(/(\w+)=>/);
    const STATE_KEY = MATCH ? MATCH[1] : "s";
    const regex = new RegExp(`${STATE_KEY}\\.(\\w+)`, "g");
    const keys = [...FN_STR.matchAll(regex)].map((match) => match[1]);
    const obj = {};
    keys.forEach((key) => {
        const value = context((s) => s[key]);
        if (value !== undefined) obj[key] = value;
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
