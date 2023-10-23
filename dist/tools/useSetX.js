"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSetX = void 0;
var _functions = require("./functions");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var useSetX = exports.useSetX = function useSetX() {
  var curr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var incoming = arguments.length > 1 ? arguments[1] : undefined;
  var type = (0, _functions.typeOf)(incoming);
  if (type !== "object" && type !== "function") {
    return incoming;
  }
  var newState = _objectSpread({}, curr);
  if (type === "object") {
    Object.entries(incoming).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        path = _ref2[0],
        value = _ref2[1];
      var splittedPath = (path === null || path === void 0 ? void 0 : path.split(".")) || ["undefinedPath"];
      newState = setNestedValue(newState, splittedPath, value);
    });
  } else {
    Object.entries(incoming(curr)).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        path = _ref4[0],
        value = _ref4[1];
      var splittedPath = (path === null || path === void 0 ? void 0 : path.split(".")) || ["undefinedPath"];
      newState = setNestedValue(newState, splittedPath, value);
    });
  }
  return newState;
};
var setNestedValue = function setNestedValue(state, splittedPath, newval) {
  if (splittedPath.length > 1) {
    var field = splittedPath.shift();
    var subObject = {};
    try {
      subObject = _objectSpread({}, setNestedValue(state[field], splittedPath, newval));
    } catch (_unused) {
      subObject = _objectSpread({}, setNestedValue(state, splittedPath, newval));
    }
    return removeUndefined(_objectSpread(_objectSpread({}, state), {}, _defineProperty({}, field, subObject)));
  } else {
    var updatedState = {};
    updatedState[splittedPath.shift()] = newval;
    return _objectSpread(_objectSpread({}, state), updatedState);
  }
};
var removeUndefined = function removeUndefined(obj) {
  for (var prop in obj) {
    if (_typeof(obj[prop]) === "object") {
      obj[prop] = removeUndefined(obj[prop]);
      if (Object.keys(obj[prop]).length === 0) delete obj[prop];
    } else if (obj[prop] === undefined) delete obj[prop];
  }
  return obj;
};