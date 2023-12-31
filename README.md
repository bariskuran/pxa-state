<img src="https://www.thepxa.co.uk/pxa-state.jpg" alt="pxa-state" title="pxa-state" width="150" height="150" />

[![npm version](https://badge.fury.io/js/pxa-state.svg)](//npmjs.com/package/pxa-state)

# Recommendation

This library is being developed and tested day by day. I recommend waiting until version 0.1.0 or keeping track of continuous updates.

# Introduction

**pxa-state** is a React state management tool that combines the functionalities of zustand and immer libraries. Additionally, it facilitates usage to some extent by introducing new set and call methods. It can operate both local components and global components.

This mini tool aims to address state management challenges in React. It was developed to address issues such as the complexity created by useState, the difficulty of using nested objects, the need to render all components covered by ContextApi, and the constant requirement to write reducers in the usage of global management solutions like Redux, all under one roof.

### Demos

[usePxaState](https://codesandbox.io/s/usepxastate-slqw9c)

[usePxaContext - setOutsideHooks](https://codesandbox.io/s/usepxacontext-static-zn9ghh)

[usePxaContext - reSetInsideHooks](https://codesandbox.io/s/usepxacontext-dynamic-29yqm7)

# Installing pxa-state

```node
npm i pxa-state
```

```node
yarn add pxa-state
```

```node
pnpm i pxa-state
```

# Basic Usage of usePxaState

This function is used instead of _useState_.

#### for immutable types

```js
import { usePxaState } from "pxa-state";

const Component = () => {
    const {value, set} = usePxaState(123);
	const fn = () => {
		set(d=>({value: d.value + 1}));
	}

// result: {value:123}
```

> [!IMPORTANT]
> Functions can not be used as an immutable varible!

#### for mutable types

```js
import { usePxaState } from "pxa-state";

const Component = () => {
    const {no,str,set} = usePxaState({no:1,str:"str"});
	const fn = () => {
		set(d=>({
			no: d.no + 1,
			str: "new str",
			"nested.obj.prop": true,
		}))
	}

// result: {
//	no:2,
//	str: "new str",
//	nested:{
//		obj:{
//			prop:true,
//		}
//	}
//}

```

#### Advanced Usage Example

[usePxaState](https://codesandbox.io/s/usepxastate-slqw9c)

# Basic Usage of usePxaContext

This function is used instead of _useContext_ or _Redux_ or similar.

```js
import { createPxaContext, usePxaContext, useSetContext } from "pxa-state";
```

You can create the context outside of a React Component:

```js
const globalContext = createPxaContext(initialValue, settings);
//...
```

Or, you can create the context inside a React Component:

```js
const globalContext = createPxaContext();

const Component1 = () => {
	const state = useSetContext(globalContext, async () => {
    // do smth in here... for example make an api call...
    // const response = await fetch("https://randomuser.me/api/");
    // const data = await response.json();

    return [initialValue, settings];
  }, (s) => [s.no, s.str, s.set]);

//...
```

Then you can use context wherever you wish to use.

```js
const Component2 = () => {
	const { no, str, set } = usePxaContext(globalContext, (s) => [s.no, s.str, s.set]);
	const  fn = () => {
		set(d=>({
			no: d.no + 1,
			str: "new str",
			"nested.obj.prop": true,
		}))
	}

// result: {
//	no:2,
//	str: "new str",
//	nested:{
//		obj:{
//			prop:true,
//		}
//	}
//}
```

Also, you can call nested values as well. But keep in mind, you should name it level1's key name at the call.

```js
const { level1 } = usePxaContext(globalContext, (s) => [s.level1.level2.level31, s.level1.level2.level32]);

// result: {
// level1: {
//	level2:{
// 		level31:any,
// 		level32:any,
// }}

// At this example, you can reach deep nested values like this:
<div>{level1?.level2?.level31}</div>;
```

#### Advanced Usage Example

[usePxaContext - setOutsideHooks](https://codesandbox.io/s/usepxacontext-static-zn9ghh)

[usePxaContext - reSetInsideHooks](https://codesandbox.io/s/usepxacontext-dynamic-29yqm7)

# Features

For feature descriptions, I used usePxaState.
However, all features work the same way in createPxaContext.

#### Changing immutable key name

Easy. Define it inside settings.

```js
const state = usePxaState("test string", {
    immutableKeyName: "data",
});
// result: {data:"test string"}
```

#### Adding functions inside the context

Easy. Place them inside settings. Context functions gets state prop first, then optional args.

```js
const state = usePxaState(initialValue, {
    externalFunction: (state, arg1, arg2) => {},
    anotherFunction: (state, arg3, arg4, arg5) => {},
});
```

Now you can access functions via state when you need them. For example:

```js
state.anotherFunction(arg3, arg4, arg5);
```

#### Using changeListener

Easier. If you set the _changeListener_ inside settings, the listener function will be triggered on all state changes. In this way, you get a small-scale React's _useEffect_ function. Moreover, changeListener works faster and triggers earlier than useEffect. It gets _keys_ array, _latestValues_ object and _previousValues_ object.

```js
const state = usePxaState(initialValue, {
    changeListener: (keys, latestValues, previousValues) => {},
});
```

> [!IMPORTANT]
> The changeListener method sends nested variables in quotes.

Example response:

```js
const changeListener = (keys, latestValues, previousValues) => {
    if (keys.includes("p1.p2.p3")) {
        // ... do smth
    }
};
```

#### get Method

TBH, you don't need to use this function much but, if you do:

```js
const currState = state.get();
```

#### getPrevious Method

If you need to get one step back, you can use getPrevious

```js
const previousState = state.getPrevious();
```

#### set Method

If your data is immutable, you need to set it via immutableKeyName. (**"value"** is default).

```js
set({
    value: "new string",
});
```

if it mutable, use it normally.

```js
set({
    no: 2,
    str: "str+",
    arr: [1, 2, 3, 45],
});
```

Whether defined or not, you can access key names in nested levels by enclosing them in quotation marks.

```js
set({
    "person.address.city.isValid": true,
});
```

If you need state in set, return a function instead of an object:

```js
set((state) => ({
    no: state.no + 1,
    str: state.str + "+",
}));
```

#### immerSet Method

immerSet is original setImmer function without any change. Check out useImmer documantation for more info.

```js
immerSet(draft=>{
	no: draft.no + 1,
	str: "str+",
	arr: [1, 2, 3, 45],
});
```

#### reSet Method

If you need to reSet state or context, you can use reSet to add new functions to your context.

```js
reSet(initialValue, settings);
```

# Api

> const state = usePxaState(**initialValue**,**stateSettings**);

> const globalContext = createPxaContext(**initialValue**,**stateSettings**)

| initialValue | any - optional                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------- |
|              | **\*initialValue** can be any type. Mutable or immutable. Excluding a function type.              |
|              | You don't need to set initialValue at the beginning and if you do, you can change its type later. |
| ⚠️           | initialValue can not be a function.                                                               |

| stateSettings          | object - optional                                                                                                                                                                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| immutableKeyName       | **should be a string**. usePxaState converts immutable data to mutable. By this way you can handle string, boolean etc. Immutable types uses immutableKeyName to place.Immutable types are located under the immutableKeyName prop within the state. The default value is ‘value’. |
| changeListener         | **should be a function**. If anything is changed in the state, changeListener function is triggerred. changeListener function gets 3 props: (keys, latestValues, previousValues)=>{}                                                                                               |
| … additional functions | You can add your additional functions inside stateSettings. pxaState pushes existing state first, then other args. Check out examples above.                                                                                                                                       |

> useSetContext(**contextFile**, **setFunction**,**argFunction**)

| initialValue | any - optional                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------- |
|              | **\*initialValue** can be any type. Mutable or immutable. Excluding a function type.              |
|              | You don't need to set initialValue at the beginning and if you do, you can change its type later. |
| ⚠️           | initialValue can not be a function.                                                               |

| stateSettings          | object - optional                                                                                                                                                                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| immutableKeyName       | **should be a string**. usePxaState converts immutable data to mutable. By this way you can handle string, boolean etc. Immutable types uses immutableKeyName to place.Immutable types are located under the immutableKeyName prop within the state. The default value is ‘value’. |
| changeListener         | **should be a function**. If anything is changed in the state, changeListener function is triggerred. changeListener function gets 3 props: (keys, latestValues, previousValues)=>{}                                                                                               |
| … additional functions | You can add your additional functions inside stateSettings. pxaState pushes existing state first, then other args. Check out examples above.                                                                                                                                       |

> const **argObj** = usePxaContext(**contextFile**, **argFunction**)
> const {**val1, val2, fn1, fn2, set**} = usePxaContext(**contextFile**, **s=>[s.val1,sval2,s.fn1,s.fn2, s.set]**)

OR alternatively,

> const **argObj** = usePxaContext(**contextFile**, **argStr**)
> const {**val1, val2, fn1, fn2, set**} = usePxaContext(**contextFile**, **`val1,val2,fn1,fn2,set`**)

| argFunction | function - mandatory                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
|             | argFunction gets desired values from state. To use pxa-state effectively, you should only fetch the data you need. |

# Other Props

If needed, You can access original zustand and immer functions via pxa-state.

```js
import { create } from "pxa-state";
import { produce, freeze, current, original } from "pxa-state";
import { useImmer, useImmerReducer } from "pxa-state";
```

# Updates

## 0.0.48

-   usePxaContext is updated. Now, string keys is an option to function keys.

```js
usePxaContext(contextFile, `level1,level2.level21,level3`);
usePxaContext(contextFile, (s) => [s.level1, s.level2.level21, s.level3]);
```

-   Bug fix at get and getPrevious methods.

## 0.0.47

-   usePxaContext is updated. Now a nested call can be used.

## 0.0.44

-   useSetContext method is added. Using **reSet** is much more easier now.

## 0.0.42

-   usePrepareContext is removed. Instead use **reSet** method.
-   previousValues are added to changeListener.
-   Couple of bug fixes.
-   CodeSandBox demos are added to README.

## 0.0.40

-   usePrepareContext is added. Now, you can set a context inside a React component.
-   changeListener is added.
-   getPrevious method is added.
-   Jest tests are added. Check out gitHub repo for details.
-   set is updated.

## 0.0.30

First public release

# Credits

[ThePxa Creative](https://www.thepxa.co.uk/) | [Baris Kuran](https://www.bariskuran.com/)

# Dependencies

[Immer](https://github.com/immerjs/immer) | [Zustand](https://github.com/pmndrs/zustand)

# License

MIT
