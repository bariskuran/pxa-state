"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _zustand = require("zustand");
var _functions = require("./tools/functions");
var _createPxaClass = require("./tools/createPxaClass");
var _excluded = ["immutableKeyName"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var createPxaContext = function createPxaContext(initialValue, settings) {
  var dataRef = {
    current: initialValue
  };

  /**
   * Settings
   * !!! if smth is change, update usePxaState file as well. !!!
   */
  var _settings$immutableKe = settings.immutableKeyName,
    IMMUTABLE_NAME = _settings$immutableKe === void 0 ? "value" : _settings$immutableKe,
    ADD_FN = _objectWithoutProperties(settings, _excluded);

  /**
   * Return
   */
  return (0, _zustand.create)(function (set) {
    var externalGet = function externalGet() {
      return dataRef === null || dataRef === void 0 ? void 0 : dataRef.current;
    };
    var externalSet = function externalSet(incoming) {
      var newData = (0, _functions.setState)(incoming, dataRef, IMMUTABLE_NAME);
      set(_typeof(newData) === "object" ? newData : (0, _createPxaClass.createPxaClass)({
        data: newData,
        IMMUTABLE_NAME: IMMUTABLE_NAME,
        ADD_FN: ADD_FN,
        externalSet: externalSet,
        externalGet: externalGet
      }));
    };
    return (0, _createPxaClass.createPxaClass)({
      data: initialValue,
      IMMUTABLE_NAME: IMMUTABLE_NAME,
      ADD_FN: ADD_FN,
      externalSet: externalSet,
      externalGet: externalGet
    });
  });
};
var _default = exports["default"] = createPxaContext;