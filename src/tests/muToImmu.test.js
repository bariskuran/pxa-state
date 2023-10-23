import { muToImmu } from "../lib/tools/functions";

test("muToImmu", () => {
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
