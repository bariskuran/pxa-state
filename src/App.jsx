import { useState } from "react";
import { style, reactContext, ReactContextComponent } from "./AppTools";
import { InhouseUseState, Values, StaticComponent, useDefaultPxaStates } from "./AppTools";
// Lib Index
import { createPxaContext, usePxaContext } from "./lib";

const App = () => {
    const [contextApi, setConttextApi] = useState(0);
    return (
        <div style={style}>
            <reactContext.Provider value={{ contextApi, setConttextApi }}>
                <StaticComponent />
                React Context Api
                <ReactContextComponent />
                Inhouse useState
                <InhouseUseState />
                pxaState-set
                <PxaStateSetTests />
                pxaContext
                <PxaContextTest1 />
                <PxaContextTest2 />
                <PxaContextTest3 />
                <PxaContextTest4 />
                <PxaContextTest5 />
            </reactContext.Provider>
        </div>
    );
};
export default App;

const PxaStateSetTests = () => {
    console.log("PxaStateSetTests rendered");
    const { state, state2, state3, state4, state5 } = useDefaultPxaStates();

    const functionSetTest = () => {
        state.set((d) => {
            d.no = d.no + 1;
            d.str = d.str + "+";
            d.arr.push(d.arr.length);
        });
        state2.set((d) => {
            d.value = d.value + 1;
        });
        state3.set((d) => {
            d.value = d.value + "+";
        });
        state4.set((d) => {
            d.value.push(d.value.length);
        });
        state5.set((d) => {
            d.value = !d.value;
        });
    };
    const parenthesisSetTest = () => {
        state.set({ no: 0, str: "str", arr: [0, 1, 2] });
        state2.set(0);
        state3.set("str");
        state4.set([0, 1, 2]);
        state5.set(true);
    };
    const multipleSetTest = () => {
        state2.set(state2.value + 1); // should be 1 but this not work
        state2.set(state2.value + 1); // should be 2 but this not work
        state2.set(state2.value + 1); // should be 3 but this not work

        // classic way works.
        state.set((d) => {
            d.no = d.no + 1;
        });
        state.set((d) => {
            d.no = d.no + 1;
        });
        state.set((d) => {
            d.no = d.no + 1;
        });

        // classic way alternative
        state4.set((d) => {
            d.value[0] += 1;
            d.value[0] += 1;
            d.value[0] += 1;
        });
    };

    return (
        <>
            <Values {...{ state, state2, state3, state4, state5 }} />
            <button onClick={functionSetTest}>function set test</button>
            <button onClick={parenthesisSetTest}>parenthesis set test</button>
            <button onClick={multipleSetTest}>multiple call test {state2.value}</button>
        </>
    );
};

/**
 * PXA CONTEXT
 */
const globalContext = createPxaContext(
    { no: 0, str: "str", arr: [0, 1, 2] },
    {
        immutableKeyName: "value", // value is default
        increaseNo: ({ state }, str) => {
            console.log(str, state);
            state.set((p) => {
                p.no = p.no + 1;
            });
        },
    },
);

const PxaContextTest1 = () => {
    const [no, set, str, arr] = usePxaContext((s) => [s.no, s.set, s.str, s.arr], globalContext);
    console.log("PxaContextTest1 rendered.");
    const test = () => {
        set((d) => {
            d.no = d.no + 1;
        });
    };

    return (
        <>
            {`pxaState > STATE = no:${no} str:${str} arr:${arr + ""}`}
            <button onClick={test}>function set test</button>
        </>
    );
};
const PxaContextTest2 = () => {
    const [no, set] = usePxaContext((s) => [s.no, s.set], globalContext);
    console.log("PxaContextTest2 rendered.");
    const test = () => {
        set((d) => {
            d.no = d.no + 1;
        });
    };

    return (
        <>
            {`pxaState > STATE = no:${no}`}
            <button onClick={test}>function set test</button>
        </>
    );
};
const PxaContextTest3 = () => {
    const [str, set] = usePxaContext((s) => [s.str, s.set], globalContext);
    console.log("PxaContextTest3 rendered.");
    const test = (e) => {
        set((d) => {
            d.str = e.target.value;
        });
    };

    return (
        <>
            {`pxaState > STATE = str:${str}`}
            <input onChange={test} value={str} />
        </>
    );
};
const PxaContextTest4 = () => {
    const [no, increaseNo] = usePxaContext((s) => [s.no, s.increaseNo], globalContext);
    console.log("PxaContextTest4 rendered.");

    return (
        <>
            {`pxaState > STATE = no:${no}`}
            <button onClick={() => increaseNo("test str")}>additional function test</button>
        </>
    );
};

const globalContext2 = createPxaContext(0, {
    immutableKeyName: "value", // value is default
    firstFunction: ({ state }) => {
        console.log(state?.value);
    },
    increaseNo: ({ state }) => {
        state.firstFunction();
        state.set((d) => {
            d.value = d.value + 1;
        });
    },
});

const PxaContextTest5 = () => {
    const [value, increaseNo] = usePxaContext((s) => [s.value, s.increaseNo], globalContext2);
    console.log("PxaContextTest5 rendered.");

    return (
        <>
            {`pxaState > STATE = no:${value}`}
            <button onClick={increaseNo}>mutable value test</button>
        </>
    );
};
