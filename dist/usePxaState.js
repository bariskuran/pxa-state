"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePxaState = exports["default"] = void 0;
var _react = require("react");
var _functions = require("./tools/functions");
var _createPxaClass = require("./tools/createPxaClass");
var _excluded = ["immutableKeyName", "changeListener"],
  _excluded2 = ["immutableKeyName", "changeListener"];
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var usePxaState = exports.usePxaState = function usePxaState(initialState) {
  var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var currAddFn = {};
  var currImmutableKeyName;
  var currChangeListener;
  var prevRef = (0, _react.useRef)();

  /**
   * Settings
   * !!! if smth is change, update createPxaContext file as well. !!!
   */
  var _ref = settings || {},
    _ref$immutableKeyName = _ref.immutableKeyName,
    immutableKeyName1 = _ref$immutableKeyName === void 0 ? "value" : _ref$immutableKeyName,
    changeListener1 = _ref.changeListener,
    addFn1 = _objectWithoutProperties(_ref, _excluded);
  currAddFn = _objectSpread(_objectSpread({}, currAddFn), addFn1);
  currImmutableKeyName = immutableKeyName1;
  currChangeListener = changeListener1;

  /**
   * States
   */
  var freezed = (0, _react.useMemo)(function () {
    return (0, _functions.freezedState)(initialState);
  }, [initialState]);
  var _useState = (0, _react.useState)(freezed),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var dataRef = (0, _react.useRef)(freezed);

  /**
   * External Set and Get
   */
  var externalSet = (0, _react.useCallback)(function (incoming) {
    var newData = (0, _functions.setState)({
      fn: incoming,
      currRef: dataRef,
      immutableName: currImmutableKeyName
    });
    if (currChangeListener && typeof currChangeListener === "function") {
      var diffObj = (0, _functions.findDifferences)(dataRef === null || dataRef === void 0 ? void 0 : dataRef.current, newData);
      var keys = Object.keys(diffObj);
      if ((keys === null || keys === void 0 ? void 0 : keys.length) > 0) currChangeListener(diffObj, keys);
    }
    prevRef.current = dataRef.current;
    dataRef.current = newData;
    setData(newData);
  }, []);
  var externalPrepareContext = (0, _react.useCallback)(function (immerFn, settings) {
    var _ref2 = settings || {},
      immutableKeyName2 = _ref2.immutableKeyName,
      changeListener2 = _ref2.changeListener,
      addFn2 = _objectWithoutProperties(_ref2, _excluded2);
    currChangeListener = changeListener2 || changeListener1;
    currImmutableKeyName = immutableKeyName2 || immutableKeyName1;
    currAddFn = _objectSpread(_objectSpread({}, currAddFn), addFn2);
    var newData = (0, _functions.setState)({
      fn: immerFn,
      currRef: dataRef,
      immutableName: currImmutableKeyName
    });
    prevRef.current = dataRef.current;
    dataRef.current = newData;
    setData(newData);
    return newData;
  }, []);
  var externalGet = function externalGet() {
    return dataRef === null || dataRef === void 0 ? void 0 : dataRef.current;
  };
  var externalGetPrevious = function externalGetPrevious() {
    return prevRef === null || prevRef === void 0 ? void 0 : prevRef.current;
  };

  /**
   * Return
   */
  return (0, _react.useMemo)(function () {
    return (0, _createPxaClass.createPxaClass)({
      data: data,
      IMMUTABLE_NAME: currImmutableKeyName,
      ADD_FN: currAddFn,
      externalSet: externalSet,
      externalGet: externalGet,
      externalGetPrevious: externalGetPrevious,
      externalPrepareContext: externalPrepareContext,
      changeListener: currChangeListener
    });
  }, [dataRef === null || dataRef === void 0 ? void 0 : dataRef.current]);
};
var _default = exports["default"] = usePxaState;