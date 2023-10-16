"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeOf = exports.setState = exports.muToImmu = exports.immuToMu = exports.freezedState = void 0;
var _immer = require("immer");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * @param {any} value
 * @returns advanced typeof
 */
var typeOf = exports.typeOf = function typeOf(value) {
  var type = _typeof(value);
  if (type === "object" && Array.isArray(value)) type = "array";
  if (type === "object" && !value) type = "null";
  return type;
};

/**
 * @description Converts immutable to mutable. str -> obj
 * @param {any} data
 * @param {string} IMMUTABLE_NAME
 * @returns mutable object
 */
var immuToMu = exports.immuToMu = function immuToMu(data, IMMUTABLE_NAME) {
  return typeOf(data) === "object" ? data : _defineProperty({}, IMMUTABLE_NAME, data);
};

/**
 * @description Converts mutable to immutable. obj -> str
 * @param {any} data
 * @param {string} IMMUTABLE_NAME
 * @returns immutable object
 */
var muToImmu = exports.muToImmu = function muToImmu(data, IMMUTABLE_NAME) {
  return typeOf(data) === "object" && Object.keys(data).length < 2 ? data[IMMUTABLE_NAME] : data;
};

/**
 * Freezed for immer
 */
var freezedState = exports.freezedState = function freezedState(data) {
  return (0, _immer.freeze)(typeof data === "function" ? data() : data, true);
};

/**
 *
 * @description This function generates new data and saves it.
 * @returns immuData
 */
var setState = exports.setState = function setState(immerFn, dataRef, IMMUTABLE_NAME, setData) {
  var pro = function pro() {
    return (0, _immer.produce)(immuToMu(dataRef === null || dataRef === void 0 ? void 0 : dataRef.current, IMMUTABLE_NAME), immerFn);
  };
  var fre = function fre() {
    return (0, _immer.freeze)(immerFn);
  };
  var newData = typeof immerFn === "function" ? pro() : fre();
  var immuData = muToImmu(newData, IMMUTABLE_NAME);
  if (dataRef) dataRef.current = immuData;
  if (setData) setData(immuData);
  return immuData;
};