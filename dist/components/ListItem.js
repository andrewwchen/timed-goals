"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _extra = require("../extra");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ListItem = function ListItem(props) {
  var goal = (0, _reactRedux.useSelector)(function (state) {
    return state.goals[props.id];
  }); // all of the goal properties contained here

  var _useState = (0, _react.useState)(goal),
      _useState2 = _slicedToArray(_useState, 2),
      goalInfo = _useState2[0],
      editGoal = _useState2[1]; // detecting hover for timer and trash buttons


  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hoverActive = _useState4[0],
      toggleHover = _useState4[1];

  var endTime = goalInfo.duration * 1000 + goalInfo.time;

  var completeGoal = function completeGoal() {
    // need to change completed status here manually because it otherwise only detects state change when mouse leaves
    // change in future
    editGoal(_objectSpread(_objectSpread({}, goalInfo), {}, {
      complete: !goalInfo.complete
    })); // sends message to backend that this goal has been completed

    vscode.postMessage({
      command: 'completeTimedGoal',
      payload: {
        id: props.id
      }
    });
  };

  var deleteGoal = function deleteGoal() {
    // sends message to backend that this goal has been deleted
    vscode.postMessage({
      command: 'deleteTimedGoal',
      payload: {
        id: props.id
      }
    });
  };

  var showTimer = function showTimer() {
    // sends message to backend that this goal will be displayed as timer
    vscode.postMessage({
      command: 'showTimer',
      payload: {
        id: props.id
      }
    });
  }; // tracks remaining time, importing timeConverter to make time readable


  var remainingTime = (0, _extra.timeConverter)(endTime - props.currentTime) + " remaining"; // might be suboptimal way but remaining time is changed to timeUpString when time has elapsed

  var timeUpString = "Time's Up!";

  if (remainingTime != timeUpString && endTime - props.currentTime < 0) {
    remainingTime = timeUpString; // deletes goal a minute after elapsing, in future might want better way to do this

    if (endTime + 60000 < props.currentTime) deleteGoal();
  }

  ;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "list-item",
    onMouseEnter: function onMouseEnter() {
      toggleHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      toggleHover(false);
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "item-check",
    onClick: completeGoal
  }, goalInfo.complete ? /*#__PURE__*/_react["default"].createElement("img", {
    className: "item-check-image",
    src: "https://i.ibb.co/ZfY9hWT/check.png"
  }) : ""), /*#__PURE__*/_react["default"].createElement("div", {
    className: "item-info",
    style: {
      opacity: goalInfo.complete ? "0.5" : "1"
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "item-name"
  }, goalInfo.name), /*#__PURE__*/_react["default"].createElement("div", {
    className: "item-time"
  }, !goalInfo.complete ? remainingTime : "")), /*#__PURE__*/_react["default"].createElement("div", null, hoverActive ? /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "inline-flex"
    }
  }, !goalInfo.complete && remainingTime != timeUpString ? /*#__PURE__*/_react["default"].createElement("img", {
    onClick: showTimer,
    className: "item-timer",
    src: "https://i.ibb.co/S5Mt7j6/stopwatch.png"
  }) : "", /*#__PURE__*/_react["default"].createElement("img", {
    onClick: deleteGoal,
    className: "item-trash",
    src: "https://i.ibb.co/ySFzhYJ/trash.png"
  })) : ""));
};

var _default = ListItem;
exports["default"] = _default;