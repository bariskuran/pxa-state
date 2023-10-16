<img src="https://www.thepxa.co.uk/pxa-state.jpg" alt="pxa-state" title="pxa-state" width="150" height="150" />

[![npm version](https://badge.fury.io/js/pxa-state.svg)](//npmjs.com/package/pxa-state)

# Introduction

This mini tool aims to address state management challenges in React. It was developed to address issues such as the complexity created by useState, the difficulty of using nested objects, the need to render all components covered by ContextApi, and the constant requirement to write reducers in the usage of global management solutions like Redux, all under one roof.

In short, `pxa-state` is a React state management tool that combines the functionalities of zustand and immer libraries. Additionally, it facilitates usage to some extent by introducing new set and call methods. It can operate both local components and global components.

# Conflicts and Solutions

If you are working in a small-sized / medium-sized component and using useState for individual variables, duplications like [variable1, setVariable1] can become cumbersome after a point. If you attempt to manage your state by placing an object inside useState, updating properties at the 2nd level and beyond can become a pain. For example:

```javascript
const [nestedState, setNestedState] = useState({
    person: {
        contact: {
            address: {
                city: "London",
            },
        },
    },
});

setNestedState((p) => {
    return {
        ...p,
        person: {
            ...p?.person,
            contact: {
                ...p?.person?.contact,
                address: {
                    ...p?.person?.contact?.address,
                    city: "Istanbul",
                },
            },
        },
    };
});
```

To solve that issue award-winning Immer has a great mutable solution:

```javascript
const [nestedState, setNestedState] = useImmer({
    person: {
        contact: {
            address: {
                city: "London",
            },
        },
    },
});

setNestedState((draft) => {
    draft.person.contact.address.city = "Istanbul";
});
```

However, immer also comes with some usage challenges. 1- You cannot reach a data level that you haven't set up when setting up the state. Continuing from the example above, the command `draft.person.contact.address.street = "Twyford Avenue";` will not work because the `"street"` property has not been created before. 2- In immer, you need to specify which type you will work with from the beginning, and this type cannot be changed later. As in the example `const [state, setState] = useImmer({})`...

I tried to address these issues with `usePxaState` and provided users with a new set method through a constructor. You can find the usage methods below.

`usePxaContext` enables the creation of a global context and allows it to be used by all components without the need for a wrapper. It has two main advantages. Its accessibility and management are easier as it doesn't require any wrappers. Unlike React's Context API, which causes all components it encompasses to re-render, `usePxaContext` does not require components to use Context API. By incorporating additional features and a set method while simultaneously using Immer and Zustand, `usePxaContext` takes the convenience provided by these excellent libraries a step further.

You can also use both hooks as a semi-reducer, placing your relevant functions inside the state. This way, you can simplify data management in your component.

# Installing pxa-state

```node
npm i pxa-state
```

or

```node
yarn add pxa-state
```

or

```node
pnpm i pxa-state
```

# Using usePxaState

### 1.First, import usePxaState

```js
import { usePxaState } from "pxa-state";
```

### 2- Then Set up State

You can use any type (expect fn) inside pxaState. Or if you need to decide this later, you can leave it empty. Examples:

```js
const state = usePxaState("test string");
// result: {value:"test string"}
```

```js
const state = usePxaState(true);
// result: {value:"true"}
```

```js
const state = usePxaState({
    city: "London",
    postCode: "n2",
    street: "Twyford Avenue",
});
// result: {city:"London",postCode:"n2", street:"Twyford Avenue"}
```

### 3- If you wish, change immutable key name (default is "value")

```js
const state = usePxaState("test string", {
    immutableKeyName: "data",
});
// result: {data:"test string"}
```

### 4- If you need, add your functions

```js
const state = usePxaState(
    { no: 0, str: "str", arr: [0, 1, 2] },
    {
        externalFunction: (state, arg1, arg2) => {},
        anotherFunction: (state, arg3, arg4, arg5) => {},
    },
);
```

You can access this functions via state when you need them. For example:

```js
state.anotherFunction(arg3, arg4, arg5);
```

### 5- Get Method

TBH, you don't need to use this function much but, if you do:

```js
state.get();
```

### 6- Set Method

If your data is immutable, you need to set it via immutableKeyName. **"value"** is default.

```js
state.set({
    value: "new string",
});
```

if it mutable, use it normally.

```js
state.set({
    no: 2,
    str: "str+",
    arr: [1, 2, 3, 45],
});
```

Whether defined or not, you can access key names in nested levels by enclosing them in quotation marks.

```js
state.set({
    "person.address.city.isValid": true,
});
```

If you need state in set, return a function instead of an object:

```js
state.set((state) => ({
    no: state.no + 1,
    str: state.str + "+",
}));
```

### 7- immerSet Method

immerSet is original setImmer function without any change. Check out useImmer documantation for more info.

# Using usePxaContext

### 1- Set a global context

Its usage almost same with usePxaState. Check out usePxaState features above. You can use them all in pxaContext.

```js
import { createPxaContext } from "pxa-state";

export const globalContext = createPxaContext(
    { no: 0, str: "str", arr: [0, 1, 2] },
    {
        externalFunction: (state, arg1, arg2) => {},
        anotherFunction: (state, arg3, arg4, arg5) => {},
    },
);
```

### 2- Accessing a global context

> [!IMPORTANT]
> To use pxa-state effectively, you should only fetch the data you need.

> [!IMPORTANT]
> argArr and argFunction must correspond directly to each other.

```js
import {globalContext} from "...";
import {usePxaContext} from "pxa-state";

const Component = () => {
    const [no, set] = usePxaContext((s) => [s.no, s.set], globalContext);
    //...
```

# Other Props

If needed, You can access original zustand and immer functions via pxa-state.

```js
import { create } from "pxa-state";
import { produce, freeze, current, original } from "pxa-state";
import { useImmer, useImmerReducer } from "pxa-state";
```

# Api

> const state = usePxaState(**initialValue**,**stateSettings**);

> const globalContext = createPxaContext(**initialValue**,**stateSettings**))

| initialValue | any - optional                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------- |
|              | **\*initialValue** can be any type. Mutable or immutable. Excluding a function type.              |
|              | You don't need to set initialValue at the beginning and if you do, you can change its type later. |
| ⚠️           | initialValue can not be a function.                                                               |

| stateSettings          | object - optional                                                                                                                                                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| immutableKeyName       | usePxaState converts immutable data to mutable. By this way you can handle string, boolean etc. Immutable types uses immutableKeyName to place.Immutable types are located under the immutableKeyName prop within the state. The default value is ‘value’. |
| … additional functions | You can add your additional functions inside stateSettings. pxaState pushes existing state first, then other args. Check out examples above.                                                                                                               |

> const **argArr** = usePxaContext(**argFunction**,**contextFile**)

| argFunction | function - mandatory                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
|             | argFunction gets desired values from state. To use pxa-state effectively, you should only fetch the data you need. |
| ⚠️          | argArr and argFunction must correspond directly to each other.                                                     |
| ⚠️          | (s)=> [s.no, s.value, s.set]                                                                                       |

# Credits

[ThePxa Creative](https://www.thepxa.co.uk/) | [Baris Kuran](https://www.bariskuran.com/)

# Dependencies

[Immer](https://github.com/immerjs/immer) | [Zustand](https://github.com/pmndrs/zustand)

# License

MIT
