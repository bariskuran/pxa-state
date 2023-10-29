import { findDifferences } from "../lib/tools/functions";

const [str1, str2, num1, boo1, fn1, fn2] = ["s", "b", 0, false, () => {}, () => {}];

const ar1 = [0, 1, 2];
const ar2 = [0, 1, 2, 3];
const ar3 = [0, 2, 3, 1];
const ar4 = [str1, num1, boo1, fn1];
const ar5 = [num1, boo1, fn1];

const ob1 = { t1: str1 };
const ob2 = { t1: str2 };
const ob3 = { t1: str1 };
const ob4 = { t2: str1 };
const ob5 = { t1: str2, t2: str2 };

test("findDifferences_Test: Advanced Obj tests", () => {
    expect(
        findDifferences(
            {
                p1: str1,
                p2: num1,
                p3: boo1,
                p4: fn1,
                p5: {
                    p6: [
                        {
                            p7: {
                                p8: str1,
                                p12: ar1,
                            },
                        },
                    ],
                },
            },
            {
                p1: str2,
                p2: num1,
                p3: boo1,
                p4: fn1,
                p5: {
                    p6: [
                        {
                            p7: {
                                p8: str2,
                            },
                            p11: ar1,
                        },
                    ],
                    p10: str1,
                },
            },
        ),
    ).toStrictEqual({
        p1: str2,
        p4: fn1,
        "p5.p6.0.p7.p8": str2,
        "p5.p6.0.p11": ar1,
        "p5.p6.0.p7.p12": undefined,
        "p5.p10": str1,
    });
});

test("findDifferences_Test: Und to Obj", () => {
    expect(findDifferences(undefined, ob2)).toStrictEqual(ob2);
});

test("findDifferences_Test: Basic Obj tests", () => {
    expect(findDifferences(ob1, ob2)).toStrictEqual({ t1: str2 });
    expect(findDifferences(ob3, ob4)).toStrictEqual({ t1: undefined, t2: str1 });
    expect(findDifferences(ob1, ob5)).toStrictEqual({ t1: str2, t2: str2 });
});

test("findDifferences_Test: Array tests", () => {
    expect(findDifferences(ar1, ar2)).toStrictEqual({ 3: 3 });
    expect(findDifferences(ar1, ar3)).toStrictEqual({ 1: 2, 2: 3, 3: 1 });
    expect(findDifferences(ar3, ar1)).toStrictEqual({ 1: 1, 2: 2, 3: undefined });
    expect(findDifferences(ar4, ar5)).toStrictEqual({ 0: num1, 1: boo1, 2: fn1, 3: undefined });
});

test("findDifferences_Test: Undefined tests", () => {
    expect(findDifferences(undefined, str1)).toStrictEqual({ state: str1 });
    expect(findDifferences(null, str1)).toStrictEqual({ state: str1 });
    expect(findDifferences(str1, undefined)).toStrictEqual({ state: undefined });
    expect(findDifferences(str1, null)).toStrictEqual({ state: null });
});

test("findDifferences_Test: If types are different, it returns new.", () => {
    expect(findDifferences(str1, num1)).toStrictEqual({ state: num1 });
    expect(findDifferences(str1, boo1)).toStrictEqual({ state: boo1 });
    expect(findDifferences(num1, boo1)).toStrictEqual({ state: boo1 });
    expect(findDifferences(str1, fn1)).toStrictEqual({ state: fn1 });
    expect(findDifferences(num1, fn1)).toStrictEqual({ state: fn1 });
    expect(findDifferences(boo1, fn1)).toStrictEqual({ state: fn1 });
    expect(findDifferences(str1, ar1)).toStrictEqual({ state: ar1 });
    expect(findDifferences(str1, ob1)).toStrictEqual({ state: ob1 });
    expect(findDifferences(num1, ar1)).toStrictEqual({ state: ar1 });
    expect(findDifferences(num1, ob1)).toStrictEqual({ state: ob1 });
    expect(findDifferences(boo1, ar1)).toStrictEqual({ state: ar1 });
    expect(findDifferences(boo1, ob1)).toStrictEqual({ state: ob1 });
    expect(findDifferences(fn1, ar1)).toStrictEqual({ state: ar1 });
    expect(findDifferences(fn1, ob1)).toStrictEqual({ state: ob1 });
    expect(findDifferences(ar1, str1)).toStrictEqual({ state: str1 });
    expect(findDifferences(ar1, num1)).toStrictEqual({ state: num1 });
    expect(findDifferences(ar1, boo1)).toStrictEqual({ state: boo1 });
    expect(findDifferences(ar1, fn1)).toStrictEqual({ state: fn1 });
    expect(findDifferences(ob1, str1)).toStrictEqual({ state: str1 });
    expect(findDifferences(ob1, num1)).toStrictEqual({ state: num1 });
    expect(findDifferences(ob1, boo1)).toStrictEqual({ state: boo1 });
    expect(findDifferences(ob1, fn1)).toStrictEqual({ state: fn1 });
});

test("findDifferences_Test: Two function type has to be blocked.", () => {
    expect(findDifferences(fn1, fn2)).toStrictEqual({ state: fn2 });
});
