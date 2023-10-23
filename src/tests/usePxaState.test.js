/** @jest-environment jsdom */
import { render, fireEvent } from "@testing-library/react";
import { SetTestComponent } from "./usePxaStateTools";
// eslint-disable-next-line no-unused-vars
import * as React from "react";

export const IMMUTABLE_KEY_NAME = "imm";
export const setImmerTests = [
    {
        desc: "undefined to str",
        initialValue: undefined,
        fn: (data) => data.immerSet("str"),
        initialExpected: "{}",
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
    },
    {
        desc: "str to number",
        initialValue: "str",
        fn: (data) => data.immerSet(5),
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":5}`,
    },
    {
        desc: "number to boo",
        initialValue: 5,
        fn: (data) => data.immerSet(true),
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":5}`,
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":true}`,
    },
    {
        desc: "str to arr",
        initialValue: "str",
        fn: (data) => data.immerSet([1, 2, 3]),
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":[1,2,3]}`,
    },
    {
        desc: "str to obj",
        initialValue: "str",
        fn: (data) => data.immerSet({ test: "str", test2: "str2" }),
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fnexpected: `{"test":"str","test2":"str2"}`,
    },
    {
        desc: "str update",
        initialValue: "str",
        fn: (data) =>
            data.immerSet((d) => {
                d[IMMUTABLE_KEY_NAME] = "str+";
            }),
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":"str+"}`,
    },
    {
        desc: "no update",
        initialValue: 0,
        fn: (data) =>
            data.immerSet((d) => {
                d[IMMUTABLE_KEY_NAME] = d[IMMUTABLE_KEY_NAME] + 1;
            }),
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":0}`,
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":1}`,
    },
    {
        desc: "boo update",
        initialValue: true,
        fn: (data) =>
            data.immerSet((d) => {
                d[IMMUTABLE_KEY_NAME] = !d[IMMUTABLE_KEY_NAME];
            }),
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":true}`,
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":false}`,
    },
    {
        desc: "arr update",
        initialValue: [0, 1, 2],
        fn: (data) =>
            data.immerSet((d) => {
                d[IMMUTABLE_KEY_NAME].push(3);
            }),
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":[0,1,2]}`,
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":[0,1,2,3]}`,
    },
    {
        desc: "obj update",
        initialValue: { test: 1, test2: { test3: "str" }, test4: [0, 1, 2] },
        fn: (data) =>
            data.immerSet((d) => {
                d.test = d.test + 1;
                d.test2.test3 = "str+";
                d.test4.push(3);
            }),
        initialExpected: `{"test":1,"test2":{"test3":"str"},"test4":[0,1,2]}`,
        fnexpected: `{"test":2,"test2":{"test3":"str+"},"test4":[0,1,2,3]}`,
    },
];
export const setTests = [
    {
        desc: "undefined to str",
        initialValue: undefined,
        fn: (data) => data.set("str"),
        initialExpected: "{}",
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
    },
    {
        desc: "str to number",
        initialValue: "str",
        fn: (data) => data.set(5),
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":5}`,
    },
    {
        desc: "number to boo",
        initialValue: 5,
        fn: (data) => data.set(true),
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":5}`,
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":true}`,
    },
    {
        desc: "str to arr",
        initialValue: "str",
        fn: (data) => data.set([1, 2, 3]),
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":[1,2,3]}`,
    },
    {
        desc: "str to obj",
        initialValue: "str",
        fn: (data) => data.set({ test: "str", test2: "str2" }),
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":"str","test":"str","test2":"str2"}`,
    },
    {
        desc: "str to undefined",
        initialValue: "str",
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fn: (data) => data.set({ [IMMUTABLE_KEY_NAME]: undefined }),
        fnexpected: `{}`,
    },
];
export const setObjTests = [
    {
        desc: "obj tests - str update",
        initialValue: "str",
        fn: (data) => data.set({ [IMMUTABLE_KEY_NAME]: "str+" }),
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":"str+"}`,
    },
    {
        desc: "obj tests - str update",
        initialValue: "str",
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fn: (data) => data.set({ [IMMUTABLE_KEY_NAME]: "str+", test: 1 }),
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":"str+","test":1}`,
    },
    {
        desc: "obj tests - str update",
        initialValue: "str",
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fn: (data) => data.set({ [IMMUTABLE_KEY_NAME]: "str+", test: 1, "person.address.street": "street" }),
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":"str+","test":1,"person":{"address":{"street":"street"}}}`,
    },
    {
        desc: "obj tests - deep update1",
        initialValue: {
            t1: "str",
            t2: 3,
            t3: [0, 1, 2],
            t4: { t5: { t6: [1, 2, 3], t7: true } },
        },
        initialExpected: `{"t1":"str","t2":3,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3],"t7":true}}}`,
        fn: (data) => data.set({ t2: 4, t3: [0, 1, 2, 3] }),
        fnexpected: `{"t1":"str","t2":4,"t3":[0,1,2,3],"t4":{"t5":{"t6":[1,2,3],"t7":true}}}`,
    },
    {
        desc: "obj tests - deep update2",
        initialValue: { no: 0, str: "str", arr: [0, 1, 2] },
        initialExpected: `{"no":0,"str":"str","arr":[0,1,2]}`,
        fn: (data) =>
            data.set({
                no: 20,
                str: "new str",
                arr: [1, 2, 3, 20],
                "person.address.city.street": "test",
            }),
        fnexpected: `{"no":20,"str":"new str","arr":[1,2,3,20],"person":{"address":{"city":{"street":"test"}}}}`,
    },
    {
        desc: "obj tests - deep update3",
        initialValue: {
            t1: "str",
            t2: 3,
            t3: [0, 1, 2],
            t4: { t5: { t6: [1, 2, 3], t7: true } },
        },
        initialExpected: `{"t1":"str","t2":3,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3],"t7":true}}}`,
        fn: (data) => data.set({ "t4.t5.t6": [1, 2, 3, 4] }),
        fnexpected: `{"t1":"str","t2":3,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3,4],"t7":true}}}`,
    },
    {
        desc: "obj tests - deep update4",
        initialValue: {
            t1: "str",
            t2: 3,
            t3: [0, 1, 2],
            t4: { t5: { t6: [1, 2, 3], t7: true } },
        },
        initialExpected: `{"t1":"str","t2":3,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3],"t7":true}}}`,
        fn: (data) => data.set({ t2: 4, "t4.t5.t6": [1, 2, 3, 4] }),
        fnexpected: `{"t1":"str","t2":4,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3,4],"t7":true}}}`,
    },
    {
        desc: "obj tests - remove undefined",
        initialValue: {
            t1: "str",
            t2: 3,
            t3: [0, 1, 2],
            t4: { t5: { t6: [1, 2, 3] } },
        },
        initialExpected: `{"t1":"str","t2":3,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3]}}}`,
        fn: (data) => data.set({ t2: undefined, "t4.t5.t6": undefined }),
        fnexpected: `{"t1":"str","t3":[0,1,2]}`,
    },
];
export const setFunctionTests = [
    {
        desc: "obj tests - str update",
        initialValue: "str",
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fn: (data) =>
            data.set((d) => ({
                [IMMUTABLE_KEY_NAME]: d[IMMUTABLE_KEY_NAME] + "+",
            })),
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":"str+"}`,
    },
    {
        desc: "obj tests - str update",
        initialValue: "str",
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fn: (data) => data.set((d) => ({ [IMMUTABLE_KEY_NAME]: d[IMMUTABLE_KEY_NAME] + "+", test: 1 })),
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":"str+","test":1}`,
    },
    {
        desc: "obj tests - str update",
        initialValue: "str",
        initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
        fn: (data) =>
            data.set((d) => ({
                [IMMUTABLE_KEY_NAME]: d[IMMUTABLE_KEY_NAME] + "+",
                test: 1,
                "person.address.street": "street",
            })),
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":"str+","test":1,"person":{"address":{"street":"street"}}}`,
    },
    {
        desc: "obj tests - deep update1",
        initialValue: {
            t1: "str",
            t2: 3,
            t3: [0, 1, 2],
            t4: { t5: { t6: [1, 2, 3], t7: true } },
        },
        initialExpected: `{"t1":"str","t2":3,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3],"t7":true}}}`,
        fn: (data) => data.set((d) => ({ t2: d.t2 + 1, t3: [...d.t3, 3] })),
        fnexpected: `{"t1":"str","t2":4,"t3":[0,1,2,3],"t4":{"t5":{"t6":[1,2,3],"t7":true}}}`,
    },
    {
        desc: "obj tests - deep update2",
        initialValue: { no: 0, str: "str", arr: [0, 1, 2] },
        initialExpected: `{"no":0,"str":"str","arr":[0,1,2]}`,
        fn: (data) =>
            data.set((d) => ({
                no: d.no + 1,
                str: d.str + "+",
                arr: [...d.arr, 3],
                "person.address.city.street": "test",
            })),
        fnexpected: `{"no":1,"str":"str+","arr":[0,1,2,3],"person":{"address":{"city":{"street":"test"}}}}`,
    },
    {
        desc: "obj tests - deep update3",
        initialValue: {
            t1: "str",
            t2: 3,
            t3: [0, 1, 2],
            t4: { t5: { t6: [1, 2, 3], t7: true } },
        },
        initialExpected: `{"t1":"str","t2":3,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3],"t7":true}}}`,
        fn: (data) => data.set((d) => ({ "t4.t5.t6": [1, 2, 3, 4] })),
        fnexpected: `{"t1":"str","t2":3,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3,4],"t7":true}}}`,
    },
    {
        desc: "obj tests - deep update4",
        initialValue: {
            t1: "str",
            t2: 3,
            t3: [0, 1, 2],
            t4: { t5: { t6: [1, 2, 3], t7: true } },
        },
        initialExpected: `{"t1":"str","t2":3,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3],"t7":true}}}`,
        fn: (data) => data.set((d) => ({ t2: 4, "t4.t5.t6": [1, 2, 3, 4] })),
        fnexpected: `{"t1":"str","t2":4,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3,4],"t7":true}}}`,
    },
    {
        desc: "obj tests - remove undefined",
        initialValue: {
            t1: "str",
            t2: 3,
            t3: [0, 1, 2],
            t4: { t5: { t6: [1, 2, 3] } },
        },
        initialExpected: `{"t1":"str","t2":3,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3]}}}`,
        fn: (data) => data.set((d) => ({ t2: undefined, "t4.t5.t6": undefined })),
        fnexpected: `{"t1":"str","t3":[0,1,2]}`,
    },
    {
        desc: "obj tests - array push",
        initialValue: {
            t1: "str",
            t2: 3,
            t3: [0, 1, 2],
            t4: { t5: { t6: [1, 2, 3] } },
        },
        initialExpected: `{"t1":"str","t2":3,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3]}}}`,
        fn: (data) => data.set((d) => ({ t2: undefined, "t4.t5.t6": undefined })),
        fnexpected: `{"t1":"str","t3":[0,1,2]}`,
    },
    {
        desc: "obj tests - array push",
        initialValue: {
            t1: "str",
            t2: 3,
            t3: [0, 1, 2],
            t4: { t5: { t6: [1, 2, 3] } },
        },
        initialExpected: `{"t1":"str","t2":3,"t3":[0,1,2],"t4":{"t5":{"t6":[1,2,3]}}}`,
        fn: (data) =>
            data.set((d) => {
                const t1 = d.t1 + "+";
                const t3 = [...d.t3, 3];
                return { t1, t3 };
            }),
        fnexpected: `{"t1":"str+","t2":3,"t3":[0,1,2,3],"t4":{"t5":{"t6":[1,2,3]}}}`,
    },
];

export const testFunction = (value, index) => {
    const { desc, fnexpected, initialValue, initialExpected, fn } = value || {};
    //
    it(desc, () => {
        const { getByTestId } = render(
            <SetTestComponent initialValue={initialValue} IMMUTABLE_KEY_NAME="imm" key2={index} fn={fn} />,
        );
        const stringifiedData = getByTestId("stringifiedData").textContent;
        expect(stringifiedData).toStrictEqual(initialExpected);
        const button = getByTestId(index);
        fireEvent.click(button);
        const stringifiedData2 = getByTestId("stringifiedData").textContent;
        expect(stringifiedData2).toStrictEqual(fnexpected);
    });
};

[...setImmerTests, ...setTests, ...setObjTests, ...setFunctionTests].forEach((value, index) => {
    describe(SetTestComponent, () => testFunction(value, index));
});
