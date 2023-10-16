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
var usePxaContext = function usePxaContext(fn, context) {
  var FN_STR = fn.toString();
  var STATE_KEY = FN_STR.charAt(0) === "(" ? FN_STR.match(/\((\w+)\)=>/)[1] : FN_STR.match(/(\w+)=>/)[1];
  var regex = new RegExp("".concat(STATE_KEY, "\\.(\\w+)"), "g");
  var keys = _toConsumableArray(FN_STR.matchAll(regex)).map(function (match) {
    return match[1];
  });
  return keys.map(function (key) {
    return context(function () {
      var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return s[key];
    });
  });
};
var _default = exports["default"] = usePxaContext;