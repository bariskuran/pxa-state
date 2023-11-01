"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var usePxaContext = function usePxaContext(context) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (s) {
    return [s.set];
  };
  // let FN_STR = fn.toString();
  // if (FN_STR.startsWith("function")) FN_STR = convertFunctionString(FN_STR);
  // const MATCH = FN_STR.charAt(0) === "(" ? FN_STR.match(/\((\w+)\)=>/) : FN_STR.match(/(\w+)=>/);
  // const STATE_KEY = MATCH ? MATCH[1] : "s";
  // const regex = new RegExp(`${STATE_KEY}\\.(\\w+)`, "g");
  // const keys = [...FN_STR.matchAll(regex)].map((match) => match[1]);
  var FN_STR = fn.toString();
  if (FN_STR.startsWith("function")) FN_STR = convertFunctionString(FN_STR);
  var MATCH = FN_STR.match(/\(([^)]+)\)\s*=>/);
  var STATE_KEY = MATCH ? MATCH[1] : "s";
  var regex = new RegExp("".concat(STATE_KEY, "\\.([\\w.]+)"), "g");
  var keys = _toConsumableArray(FN_STR.matchAll(regex)).map(function (match) {
    return match[1];
  });
  var obj = {};
  keys.forEach(function (key) {
    if (key.includes(".")) {
      var innerKeys = key.split(".");
      var value = innerKeys.reduce(function (acc, innerKey) {
        if (acc && acc[innerKey] !== undefined) return acc[innerKey];
        return undefined;
      }, context(function (s) {
        return s;
      }));
      if (value !== undefined) assignValueToObject(obj, innerKeys, value);
    } else {
      var _value = context(function (s) {
        return s[key];
      });
      if (_value !== undefined) obj[key] = _value;
    }
  });
  return obj;
};
var _default = exports["default"] = usePxaContext;
var convertFunctionString = function convertFunctionString(inputString) {
  var content = inputString.match(/\(([^)]+)\)/);
  if (content) {
    var parameters = content[1];
    var body = inputString.split("{")[1].split("return ")[1].split("}")[0].split(";").join("");
    return "(".concat(parameters, ") => (").concat(body, ")");
  } else return inputString;
};
var assignValueToObject = function assignValueToObject(obj, keys, value) {
  var lastKey = keys.pop();
  var currentObj = obj;
  var _iterator = _createForOfIteratorHelper(keys),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      if (!currentObj[key]) currentObj[key] = {};
      currentObj = currentObj[key];
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  currentObj[lastKey] = value;
};