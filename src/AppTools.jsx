import { createContext, useContext, useState } from "react";
import { usePxaState } from "./lib/index";
export const Row = (props) => {
    const { children } = props || {};
    return <div style={{ display: "flex", gap: 10 }}>{children}</div>;
};
export const style = {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 10,
    width: 600,
    margin: "auto",
};
export const testFunction = (str, boo, state) => {
    console.log(str, boo, state);
};
export const testFunction2 = ({ str, boo }, state) => {
    console.log(str, boo, state);
};
export const reactContext = createContext();
export const ReactContextComponent = () => {
    const { contextApi, setConttextApi } = useContext(reactContext);
    const click1 = () => setConttextApi((p) => p + 1);
    console.log("ReactContextComponent rendered.");
    return <button onClick={click1}>{contextApi}</button>;
};
export const StaticComponent = () => {
    console.log("StaticComponent rendered");
    return <div>staticComponent to check re-renders</div>;
};
export const InhouseUseState = () => {
    const [state, setState] = useState(0);
    console.log("InhouseUseState rendered");
    return <button onClick={() => setState(state + 1)}>{state}</button>;
};
export const useDefaultPxaStates = () => {
    const stateObj = {
        immutableKeyName: "value", // value is default
        testFunction,
        testFunction2,
    };
    const state = usePxaState({ no: 0, str: "str", arr: [0, 1, 2] }, stateObj);
    const state2 = usePxaState(0, stateObj);
    const state3 = usePxaState("str", stateObj);
    const state4 = usePxaState([0, 1, 2], stateObj);
    const state5 = usePxaState(true, stateObj);

    return { state, state2, state3, state4, state5 };
};
export const Values = ({ state, state2, state3, state4, state5 }) => (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{`pxaState > STATE = no:${state?.no} str:${state?.str} arr:${state?.arr + ""} test:${state?.test}`}</span>
        <span>{`STATE2 = ${state2?.value}`}</span>
        <span>{`STATE3 = ${state3?.value}`}</span>
        <span>{`STATE4 = ${state4?.value + ""}`}</span>
        <span>{`STATE5 = ${state5?.value?.toString()}`}</span>
    </div>
);
