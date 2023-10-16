import typeOf from "../lib/_typeOf";

test("Returns type of variable", () => {
    expect(typeOf("str")).toBe("string");
    expect(typeOf(true)).toBe("boolean");
    expect(typeOf([1, 2, 3])).toBe("array");
    expect(typeOf({ test1: "test" })).toBe("object");
    expect(typeOf()).toBe("undefined");
    expect(typeOf(null)).toBe("null");
    expect(typeOf(5)).toBe("number");
    expect(typeOf(546568235688652)).toBe("number");
    expect(typeOf(() => {})).toBe("function");
});
