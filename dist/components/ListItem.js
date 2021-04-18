"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../redux/actions");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ListItem = function ListItem(props) {
  var dispatch = (0, _reactRedux.useDispatch)();

  var completeGoal = function completeGoal() {
    dispatch((0, _actions.goalFinished)(props.id));
  };

  console.log(props.complete);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "list-item"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "item-check",
    onClick: completeGoal
  }, props.complete ? /*#__PURE__*/_react["default"].createElement("img", {
    className: "item-check-image",
    src: "static/check.png"
  }) : ""), /*#__PURE__*/_react["default"].createElement("div", {
    className: "item-info"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "item-title"
  }, props.title), /*#__PURE__*/_react["default"].createElement("div", {
    className: "item-time"
  }, props.time)));
};

var _default = ListItem;
exports["default"] = _default;