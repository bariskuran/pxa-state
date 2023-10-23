import { immuToMu } from "../lib/tools/functions";

test("immuToMu", () => {
    expect(immuToMu({ test: "str" }, "value")).toStrictEqual({ test: "str" });
    expect(immuToMu(undefined, "value")).toStrictEqual({ value: undefined });
    expect(immuToMu(null, "value")).toStrictEqual({ value: null });
    expect(immuToMu("test", "value")).toStrictEqual({ value: "test" });
    expect(immuToMu(55, "value")).toStrictEqual({ value: 55 });
    expect(immuToMu([1, 2, 3], "value")).toStrictEqual({ value: [1, 2, 3] });
    expect(JSON.stringify(immuToMu(() => {}, "value"))).toBe(JSON.stringify({ value: () => {} }));
});
