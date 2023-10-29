/** @jest-environment jsdom */
// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { usePxaContext, createPxaContext, usePrepareContext } from "../lib/index";
import { setImmerTests, setTests, setObjTests, setFunctionTests } from "./usePxaState.test";
export const IMMUTABLE_KEY_NAME = "imm";

const globalContext = createPxaContext();
const SetTestComponent2 = ({ initialValue, IMMUTABLE_KEY_NAME, key2, fn }) => {
    usePrepareContext(globalContext, initialValue, {
        immutableKeyName: IMMUTABLE_KEY_NAME,
    });
    const data = usePxaContext(globalContext, (s) => [s.no, s.str, s.arr, s.set, s.immerSet]);

    const test = () => {
        fn(data);
    };

    return (
        <>
            <div data-testid="stringifiedData">{JSON.stringify(data)}</div>
            <button data-testid={key2} onClick={test}>
                {key2}
            </button>
        </>
    );
};

[...setImmerTests, ...setTests, ...setObjTests, ...setFunctionTests].forEach((value, index) => {
    const { desc, fnexpected, initialValue, fn } = value || {};

    test(desc, async () => {
        const fnMock = jest.fn();
        const { getByTestId } = render(
            <SetTestComponent2 initialValue={initialValue} IMMUTABLE_KEY_NAME="imm" key2={index} fn={fnMock} />,
        );
        expect(getByTestId("stringifiedData").textContent).toEqual(JSON.stringify(initialValue));
        const button = getByTestId(index.toString());

        fireEvent.click(button);

        await waitFor(() => {
            expect(fnMock).toHaveBeenCalledTimes(1);
            expect(fnMock).toHaveBeenCalledWith(initialValue);
            expect(getByTestId("stringifiedData").textContent).toEqual(JSON.stringify(fnexpected));
        });
    });
});

// [...setImmerTests, ...setTests, ...setObjTests, ...setFunctionTests].forEach((value, index) => {
//     describe(SetTestComponent2, () => {
//         const { desc, fnexpected, initialValue, fn } = value || {};
//         //
//         it(desc, () => {
//             const { getByTestId } = render(
//                 <SetTestComponent2 initialValue={initialValue} IMMUTABLE_KEY_NAME="imm" key2={index} fn={fn} />,
//             );
//             const button = getByTestId(index);
//             fireEvent.click(button);
//             const stringifiedData2 = getByTestId("stringifiedData").textContent;
//             expect(stringifiedData2).toStrictEqual(fnexpected);
//         });
//     });
// });
