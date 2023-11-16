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
        immerSet = (values) => {
            externalSet(values);
        };
        set = (values) => {
            const curr = immuToMu(externalGet(), IMMUTABLE_NAME);
            const setX = useSetX(curr, values);
            externalSet(setX);
        };
        reSet = (values, settings) => {
            externalReSet(values, settings);
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
