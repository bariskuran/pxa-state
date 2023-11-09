import { immuToMu, typeOf } from "./functions";
import { useSetX } from "./useSetX";

export const createPxaClass = (states) => {
    const { data, IMMUTABLE_NAME, ADD_FN, externalSet, externalGet, externalGetPrevious, externalReSet } = states || {};

    /**
     * Class
     */
    class PxaState {
        // Constructor
        constructor(value) {
            typeOf(value) === "object"
                ? Object.entries(value).forEach(([key, keyValue]) => {
                      this[key] = keyValue;
                  })
                : (this[IMMUTABLE_NAME] = value);
            // Additional functions
            ADD_FN &&
                Object.entries(ADD_FN).forEach(([fnName, fn]) => {
                    this[fnName] = (...args) => fn(this, ...args);
                });
        }

        // Default functions
        immerSet = (incoming) => {
            externalSet(incoming);
        };
        set = (incoming) => {
            const curr = immuToMu(externalGet(), IMMUTABLE_NAME);
            const setX = useSetX(curr, incoming);
            externalSet(setX);
        };
        reSet = (incoming, settings) => {
            externalReSet(incoming, settings);
        };
        get = () => {
            return externalGet();
        };
        getPrevious = () => {
            return externalGetPrevious();
        };
    }

    /**
     * Return
     */
    return new PxaState(data);
};
