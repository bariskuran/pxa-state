"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPxaClass = void 0;
var _functions = require("./functions");
var _useSetX = require("./useSetX");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var createPxaClass = exports.createPxaClass = function createPxaClass(states) {
  var _ref = states || {},
    data = _ref.data,
    IMMUTABLE_NAME = _ref.IMMUTABLE_NAME,
    ADD_FN = _ref.ADD_FN,
    externalSet = _ref.externalSet,
    externalGet = _ref.externalGet,
    externalGetPrevious = _ref.externalGetPrevious,
    externalPrepareContext = _ref.externalPrepareContext;

  /**
   * Class
   */
  var PxaState = /*#__PURE__*/_createClass(
  // Constructor
  function PxaState(value) {
    var _this = this;
    _classCallCheck(this, PxaState);
    // Default functions
    _defineProperty(this, "immerSet", function (incoming) {
      externalSet(incoming);
    });
    _defineProperty(this, "set", function (incoming) {
      var curr = (0, _functions.immuToMu)(externalGet(), IMMUTABLE_NAME);
      var setX = (0, _useSetX.useSetX)(curr, incoming);
      externalSet(setX);
    });
    _defineProperty(this, "prepareContext", function (incoming, settings) {
      var setX = (0, _useSetX.useSetX)(externalGet(), incoming);
      externalPrepareContext(setX, settings);
    });
    _defineProperty(this, "get", function () {
      externalGet();
    });
    _defineProperty(this, "getPrevious", function () {
      externalGetPrevious();
    });
    (0, _functions.typeOf)(value) === "object" ? Object.entries(value).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        keyValue = _ref3[1];
      _this[key] = keyValue;
    }) : this[IMMUTABLE_NAME] = value;
    // Additional functions
    ADD_FN && Object.entries(ADD_FN).forEach(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
        fnName = _ref5[0],
        fn = _ref5[1];
      _this[fnName] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return fn.apply(void 0, [_this].concat(args));
      };
    });
  });
  /**
   * Return
   */
  return new PxaState(data);
};