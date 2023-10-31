import { createContext, useContext, useEffect, useRef } from "react";
import { createStore, useStore } from "zustand";

const useCreateStore = createStore((set) => ({
    counter: 0,
    increase: (by) => set((state) => ({ counter: state.counter + by })),
}));

const CounterContext = createContext();

function CounterContextProvider({ children }) {
    const store = useRef(useCreateStore);

    return <CounterContext.Provider value={store.current}>{children}</CounterContext.Provider>;
}

function Counter() {
    const store = useContext(CounterContext);
    if (!store) throw new Error("Missing CounterContext.Provider in the tree");
    const counter = useStore(store, (state) => state.counter);
    const increase = useStore(store, (state) => state.increase);
    console.log("counter rendered.");

    useEffect(() => {
        handleClick();
    }, []);
    const handleClick = () => {
        increase(1);
    };
    return (
        <div>
            <span>{counter}</span>
            <button onClick={handleClick}>one up</button>
        </div>
    );
}

const Comp1 = () => {
    console.log("comp1 rendered.");
    return <div>tesat</div>;
};
const Comp2 = () => {
    console.log("comp2 rendered.");
    return <div>tesat</div>;
};

export default function App() {
    return (
        <CounterContextProvider>
            <Counter />
            <Comp1 />
            <Comp2 />
        </CounterContextProvider>
    );
}
