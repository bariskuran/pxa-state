import { typeOf } from "./functions";

export const createPxaClass = (states) => {
    const { data, IMMUTABLE_NAME, ADD_FN, externalSet, externalGet } = states || {};

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
                    this[fnName] = (...args) => fn({ state: this }, ...args);
                });
        }

        // Default functions
        set = (incoming) => externalSet(incoming);
        get = () => externalGet();
    }

    /**
     * Return
     */
    return new PxaState(data);
};
