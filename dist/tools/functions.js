"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeOf = exports.setState = exports.muToImmu = exports.immuToMu = exports.freezedState = exports.findDifferences = void 0;
var _immer = require("immer");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * @param {any} value / can be an array
 * @example typeOf("str")
 * @example typeOf(["str",5,[0,1,2]])
 * @returns advanced typeof
 */
var typeOf = exports.typeOf = function typeOf() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (args.length === 0) return;
  var types = [];
  args.forEach(function (arg) {
    var type = _typeof(arg);
    if (type === "object" && Array.isArray(arg)) type = "array";
    if (type === "object" && !arg) type = "null";
    types.push(type);
  });
  return types.length > 1 ? types : types[0];
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
var setState = exports.setState = function setState(settings) {
  var _ref2 = settings || {},
    fn = _ref2.fn,
    currRef = _ref2.currRef,
    immutableName = _ref2.immutableName;
  var pro = function pro() {
    return (0, _immer.produce)(immuToMu(currRef === null || currRef === void 0 ? void 0 : currRef.current, immutableName), fn);
  };
  var fre = function fre() {
    return (0, _immer.freeze)(fn);
  };
  var newData = typeof fn === "function" ? pro() : fre();
  var immuData = muToImmu(newData, immutableName);
  return immuData;
};

/**
 *
 * @description Finds difference inbetween two variables.
 * @param {object} - Old variable
 * @param {object} - New variable
 * @returns object of differences
 * @example var1 = {
                    p5: {
                        p6: [{
                            p7: {
                                p8: str1,
                                p12: ar1,
                    }}]}}
*           var 2 = {
                    p5: {
                        p6: [{
                            p7: {
                                p8: str2,
                            },
                            p11: ar1,
                    }]}}
            response = {
                "p5.p6.0.p7.p8": str2,
                "p5.p6.0.p11": ar1,
                "p5.p6.0.p7.p12": undefined,
            }
 */
var findDifferences = exports.findDifferences = function findDifferences(oldConst, newConst, basePath) {
  var _typeOf = typeOf(oldConst, newConst),
    _typeOf2 = _slicedToArray(_typeOf, 2),
    type1 = _typeOf2[0],
    type2 = _typeOf2[1];
  var result = {};
  if (type1 === "undefined" || type2 === "undefined" || type1 === "null" || type2 === "null" || type1 !== type2) {
    result[basePath || "state"] = newConst;
  } else if (type1 === "function") {
    result[basePath || "state"] = newConst;
  } else if (type1 === "array" || type1 === "object") {
    Object.keys(newConst).forEach(function (key) {
      var currentPath = basePath ? "".concat(basePath, ".").concat(key) : key;
      var nested = findDifferences(oldConst[key], newConst[key], currentPath);
      result = _objectSpread(_objectSpread({}, result), nested);
    });
    Object.keys(oldConst).forEach(function (key) {
      var currentPath = basePath ? "".concat(basePath, ".").concat(key) : key;
      if (newConst[key] === undefined) {
        result[currentPath] = undefined;
      }
    });
  } else if (oldConst !== newConst) {
    result[basePath || "state"] = newConst;
  }
  return result;
};