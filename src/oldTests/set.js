/** @jest-environment jsdom */
import { render, fireEvent } from "@testing-library/react";
import { SetTestComponent, bttnActions } from "./setTestComponent";

Object.entries(bttnActions).forEach(([key, { fnexpected, initialValue, initialExpected }]) => {
    describe(SetTestComponent, () => {
        it("describe", () => {
            const { getByTestId } = render(<SetTestComponent initialValue={initialValue} IMMUTABLE_KEY_NAME="imm" />);
            const stringifiedData = getByTestId("stringifiedData").textContent;
            expect(stringifiedData).toBe(initialExpected);
            const button = getByTestId(key);
            fireEvent.click(button);
            const stringifiedData2 = getByTestId("stringifiedData").textContent;
            expect(stringifiedData2).toStrictEqual(fnexpected);
        });
    });
});
