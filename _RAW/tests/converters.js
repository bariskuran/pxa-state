import { immuToMu, muToImmu } from "../lib/_converters";

test("Convert immutable to mutable", () => {
    expect(immuToMu({ test: "str" }, "value")).toStrictEqual({ test: "str" });
    expect(immuToMu(undefined, "value")).toStrictEqual({ value: undefined });
    expect(immuToMu(null, "value")).toStrictEqual({ value: null });
    expect(immuToMu("test", "value")).toStrictEqual({ value: "test" });
    expect(immuToMu(55, "value")).toStrictEqual({ value: 55 });
    expect(immuToMu([1, 2, 3], "value")).toStrictEqual({ value: [1, 2, 3] });
    expect(JSON.stringify(immuToMu(() => {}, "value"))).toBe(JSON.stringify({ value: () => {} }));
});
test("Convert mutable to immutable", () => {
    expect(muToImmu("str", "value")).toBe("str");
    expect(muToImmu([1, 2, 3], "value")).toStrictEqual([1, 2, 3]);
    expect(muToImmu(undefined, "value")).toStrictEqual(undefined);
    expect(muToImmu(null, "value")).toStrictEqual(null);
    expect(muToImmu({ test1: "str", test2: [1, 2, 3] }, "value")).toStrictEqual({ test1: "str", test2: [1, 2, 3] });
    expect(muToImmu({ value: "str", test2: [1, 2, 3] }, "value")).toStrictEqual({ value: "str", test2: [1, 2, 3] });
    expect(muToImmu({ value: "str" }, "value")).toStrictEqual("str");
    expect(muToImmu({ value: [1, 2, 3] }, "value")).toStrictEqual([1, 2, 3]);
    expect(muToImmu({ value: 5 }, "value")).toBe(5);
    expect(muToImmu({ value: undefined }, "value")).toBe(undefined);
    expect(muToImmu({ value: null }, "value")).toBe(null);
});
