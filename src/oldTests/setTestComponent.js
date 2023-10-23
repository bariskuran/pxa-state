import usePxaState from "../lib/usePxaState";
import React from "react";

const IMMUTABLE_KEY_NAME = "imm";
export const bttnActions = {
    test1: {
        initialValue: undefined,
        fn: (data) => data.set("str"),
        initialExpected: "{}",
        fnexpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
    },
    // test2: {
    //     initialValue: undefined,
    //     fn: (data) =>
    //         data.set((d) => {
    //             d[IMMUTABLE_KEY_NAME] = 2;
    //         }),
    //     initialExpected: "{}",
    //     fnexpected: `{"${IMMUTABLE_KEY_NAME}":2}`,
    // },
    // test3: {
    //     initialValue: "str",
    //     fn: (data) => {
    //         data.set((d) => {
    //             d[IMMUTABLE_KEY_NAME] = d[IMMUTABLE_KEY_NAME] + "added";
    //         });
    //     },
    //     initialExpected: `{"${IMMUTABLE_KEY_NAME}":"str"}`,
    //     fnexpected: `{"${IMMUTABLE_KEY_NAME}":"stradded"}`,
    // },
    // test4: {
    //     initialValue: { test: 1 },
    //     fn: (data) => {
    //         data.set((d) => {
    //             d.test = d.test + 1;
    //         });
    //     },
    //     initialExpected: `{"test":1}`,
    //     fnexpected: `{"test":2}`,
    // },
    // test5: {
    //     initialValue: { test: 1 },
    //     fn: (data) => {
    //         data.set((d) => {
    //             d.test = d.test + 1;
    //             d.test2 = d.test + 1;
    //         });
    //     },
    //     initialExpected: `{"test":1}`,
    //     fnexpected: `{"test":2,"test2":3}`,
    // },
    // test6: {
    //     initialValue: { test: 1 },
    //     fn: (data) => {
    //         data.set((d) => {
    //             d.test2 = d.test + 1;
    //         });
    //     },
    //     initialExpected: `{"test":1}`,
    //     fnexpected: `{"test":1,"test2":2}`,
    // },
    // test7: {
    //     initialValue: { test: 1 },
    //     fn: (data) => {
    //         data.set("convertedToStr");
    //     },
    //     initialExpected: `{"test":1}`,
    //     fnexpected: `{"${IMMUTABLE_KEY_NAME}":"convertedToStr"}`,
    // },
    // test8: {
    //     initialValue: [1, 2, 3],
    //     fn: (data) => {
    //         data.set({ test1: "str" });
    //     },
    //     initialExpected: `{"${IMMUTABLE_KEY_NAME}":[1,2,3]}`,
    //     fnexpected: `{"test1":"str"}`,
    // },
    // test9: {
    //     initialValue: [1, 2, 3],
    //     fn: (data) => {
    //         data.set((d) => {
    //             d[IMMUTABLE_KEY_NAME].push(4);
    //         });
    //     },
    //     initialExpected: `{"${IMMUTABLE_KEY_NAME}":[1,2,3]}`,
    //     fnexpected: `{"${IMMUTABLE_KEY_NAME}":[1,2,3,4]}`,
    // },
};

export const SetTestComponent = ({ initialValue, IMMUTABLE_KEY_NAME }) => {
    const data = usePxaState(initialValue, { IMMUTABLE_KEY_NAME: IMMUTABLE_KEY_NAME });
    return (
        <>
            <div data-testid="stringifiedData">{JSON.stringify(data)}</div>
            {Object.entries(bttnActions).map(([key, { fn }]) => (
                <button
                    data-testid={key}
                    onClick={() => {
                        fn(data);
                    }}
                    key={key}
                >
                    {key}
                </button>
            ))}
        </>
    );
};
