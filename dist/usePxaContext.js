"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
  var FN_STR = fn.toString();
  if (FN_STR.startsWith("function")) FN_STR = convertFunctionString(FN_STR);
  var MATCH = FN_STR.charAt(0) === "(" ? FN_STR.match(/\((\w+)\)=>/) : FN_STR.match(/(\w+)=>/);
  var STATE_KEY = MATCH ? MATCH[1] : "s";
  var regex = new RegExp("".concat(STATE_KEY, "\\.(\\w+)"), "g");
  var keys = _toConsumableArray(FN_STR.matchAll(regex)).map(function (match) {
    return match[1];
  });
  var obj = {};
  keys.forEach(function (key) {
    var value = context(function (s) {
      return s[key];
    });
    if (value !== undefined) obj[key] = value;
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