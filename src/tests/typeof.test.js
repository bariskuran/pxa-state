import { typeOf } from "../lib/tools/functions";

const str = "str";
const num = 5;
const num2 = 546568235688652;
const arr = [1, 2, 3];
const undefined1 = undefined;
const null1 = null;
const fn = () => {};
const boo = true;
const obj = { test: "sdf" };

test("typeOf tests", () => {
    expect(typeOf(0)).toBe("number");
    expect(typeOf("0")).toBe("string");
    expect(typeOf(str)).toBe("string");
    expect(typeOf(boo)).toBe("boolean");
    expect(typeOf(arr)).toBe("array");
    expect(typeOf(obj)).toBe("object");
    expect(typeOf(undefined1)).toBe("undefined");
    expect(typeOf(null1)).toBe("null");
    expect(typeOf(num)).toBe("number");
    expect(typeOf(num2)).toBe("number");
    expect(typeOf(fn)).toBe("function");
    expect(typeOf(str, boo, arr, obj, undefined1, null1, num, num2, fn)).toStrictEqual([
        "string",
        "boolean",
        "array",
        "object",
        "undefined",
        "null",
        "number",
        "number",
        "function",
    ]);
});
