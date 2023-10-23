/** @jest-environment jsdom */
// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { usePxaContext, createPxaContext, usePrepareContext } from "../lib/index";
import { setImmerTests, setTests, setObjTests, setFunctionTests, testFunction } from "./usePxaState.test";
export const IMMUTABLE_KEY_NAME = "imm";

[...setImmerTests, ...setTests, ...setObjTests, ...setFunctionTests].forEach((value, index) => {
    describe(SetTestComponent, () => testFunction(value, index));
});

const globalContext = createPxaContext();
const SetTestComponent = ({ initialValue, IMMUTABLE_KEY_NAME, key2, fn }) => {
    usePrepareContext(globalContext, initialValue, {
        immutableKeyName: IMMUTABLE_KEY_NAME,
    });
    const data = usePxaContext(globalContext, (s) => [s.no, s.str, s.arr, s.set]);

    /**
     *
     */
    return (
        <>
            <div data-testid="stringifiedData">{JSON.stringify(data)}</div>
            <button
                data-testid={key2}
                onClick={() => {
                    fn(data);
                }}
            >
                {key2}
            </button>
        </>
    );
};
