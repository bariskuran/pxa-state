import add from "../lib/_add";

describe("add tests", () => {
    const UNDEF = undefined,
        NUL = null,
        STR = "str",
        NUM = 5,
        ARR = [1, 2, 3],
        OBJ = { test: "test value" },
        BOO = true,
        FN = () => {};

    test("Adds value", () => {
        // STR TESTS
        expect(add(UNDEF, STR)).toBe(undefined);
        expect(add(NUL, STR)).toBe(undefined);
        expect(add(STR, STR)).toBe(STR + STR);
    });
});
