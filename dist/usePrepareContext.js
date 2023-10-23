"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var usePrepareContext = function usePrepareContext(context, newValue, settings) {
  var prepareContext = context(function (s) {
    return s.prepareContext;
  });
  (0, _react.useEffect)(function () {
    prepareContext(newValue, settings);
  }, []);
  return null;
};
var _default = exports["default"] = usePrepareContext;