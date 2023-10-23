import { usePxaState } from "../lib/index";
// eslint-disable-next-line no-unused-vars
import * as React from "react";

export const SetTestComponent = ({ initialValue, IMMUTABLE_KEY_NAME, key2, fn }) => {
    const data = usePxaState(initialValue, {
        immutableKeyName: IMMUTABLE_KEY_NAME,
    });

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
