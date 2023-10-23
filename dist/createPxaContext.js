"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _zustand = require("zustand");
var _functions = require("./tools/functions");
var _createPxaClass = require("./tools/createPxaClass");
var _excluded = ["immutableKeyName", "changeListener"],
  _excluded2 = ["immutableKeyName", "changeListener"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var createPxaContext = function createPxaContext(initialValue, settings) {
  var dataRef = {
    current: initialValue
  };
  var prevRef = {
    current: undefined
  };
  var currAddFn = {};
  var currImmutableKeyName;
  var currChangeListener;

  /**
   * Settings
   * !!! if smth is change, update usePxaState file as well. !!!
   */
  var _ref = settings || {},
    _ref$immutableKeyName = _ref.immutableKeyName,
    immutableKeyName1 = _ref$immutableKeyName === void 0 ? "value" : _ref$immutableKeyName,
    changeListener1 = _ref.changeListener,
    addFn1 = _objectWithoutProperties(_ref, _excluded);
  currImmutableKeyName = immutableKeyName1;
  currAddFn = _objectSpread(_objectSpread({}, currAddFn), addFn1);
  currChangeListener = changeListener1;

  /**
   * Return
   */
  return (0, _zustand.create)(function (set) {
    var externalGet = function externalGet() {
      return dataRef === null || dataRef === void 0 ? void 0 : dataRef.current;
    };
    var externalGetPrevious = function externalGetPrevious() {
      return prevRef === null || prevRef === void 0 ? void 0 : prevRef.current;
    };
    var externalSet = function externalSet(incomingData) {
      var newData = (0, _functions.setState)({
        fn: incomingData,
        currRef: dataRef,
        prevRef: prevRef,
        immutableName: currImmutableKeyName
      });
      if (currChangeListener && typeof currChangeListener === "function") {
        var diffObj = (0, _functions.findDifferences)(prevRef === null || prevRef === void 0 ? void 0 : prevRef.current, newData);
        var keys = Object.keys(diffObj);
        if ((keys === null || keys === void 0 ? void 0 : keys.length) > 0) currChangeListener(diffObj, keys);
      }
      prevRef.current = dataRef.current;
      dataRef.current = newData;
      set(_typeof(newData) === "object" ? newData : (0, _createPxaClass.createPxaClass)({
        data: newData,
        IMMUTABLE_NAME: currImmutableKeyName,
        ADD_FN: currAddFn,
        externalSet: externalSet,
        externalPrepareContext: externalPrepareContext,
        externalGet: externalGet,
        externalGetPrevious: externalGetPrevious
      }));
    };
    var externalPrepareContext = function externalPrepareContext(incomingData, settings) {
      var _ref2 = settings || {},
        immutableKeyName2 = _ref2.immutableKeyName,
        changeListener2 = _ref2.changeListener,
        addFn2 = _objectWithoutProperties(_ref2, _excluded2);
      var newData = (0, _functions.setState)({
        fn: incomingData,
        currRef: dataRef,
        prevRef: prevRef,
        immutableName: currImmutableKeyName
      });
      currImmutableKeyName = immutableKeyName2 || immutableKeyName1;
      currAddFn = _objectSpread(_objectSpread({}, currAddFn), addFn2);
      currChangeListener = changeListener2 || changeListener1;
      prevRef.current = dataRef.current;
      dataRef.current = newData;
      set((0, _createPxaClass.createPxaClass)({
        data: newData,
        IMMUTABLE_NAME: currImmutableKeyName,
        ADD_FN: currAddFn,
        externalSet: externalSet,
        externalGet: externalGet,
        externalPrepareContext: externalPrepareContext,
        externalGetPrevious: externalGetPrevious
      }));
    };
    return (0, _createPxaClass.createPxaClass)({
      data: initialValue,
      IMMUTABLE_NAME: currImmutableKeyName,
      ADD_FN: currAddFn,
      externalSet: externalSet,
      externalGet: externalGet,
      externalPrepareContext: externalPrepareContext,
      externalGetPrevious: externalGetPrevious
    });
  });
};
var _default = exports["default"] = createPxaContext;