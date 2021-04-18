"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _actions = require("../redux/actions");

var _reactRedux = require("react-redux");

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

var AddItem = function AddItem() {
  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      name = _useState2[0],
      changeName = _useState2[1];

  var _useState3 = (0, _react.useState)({
    seconds: 0,
    minutes: 0,
    hours: 0
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      duration = _useState4[0],
      changeDuration = _useState4[1];

  var dispatch = (0, _reactRedux.useDispatch)();

  var addGoal = function addGoal() {
    var totalSeconds = duration.seconds + duration.minutes * 60 + duration.hours * 3600;

    if (name != "" && totalSeconds > 0) {
      changeName("");
      vscode.postMessage({
        command: 'createTimedGoal',
        payload: {
          time: Date.now(),
          name: name,
          duration: totalSeconds,
          complete: false
        }
      });
    }
  };

  var handleInput = function handleInput(event) {
    changeName(event.target.value);
  };

  var handleSecond = function handleSecond(event) {
    changeDuration(_objectSpread(_objectSpread({}, duration), {}, {
      seconds: event.target.value
    }));
  };

  var handleMinute = function handleMinute(event) {
    changeDuration(_objectSpread(_objectSpread({}, duration), {}, {
      minutes: event.target.value
    }));
  };

  var handleHour = function handleHour(event) {
    changeDuration(_objectSpread(_objectSpread({}, duration), {}, {
      hours: event.target.value
    }));
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "list-item",
    id: "additem"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "item-check",
    onClick: addGoal
  }, /*#__PURE__*/_react["default"].createElement("img", {
    id: "additem-add",
    src: "https://i.ibb.co/2FxBF4X/add.png"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "item-info"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "additem-input",
    onChange: handleInput,
    value: name,
    placeholder: "Add New Goal",
    type: "text"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    id: "additem-time-label"
  }, "Insert Goal Duration"), /*#__PURE__*/_react["default"].createElement("div", {
    id: "additem-time-sublabel"
  }, "Hours / Minutes / Seconds"), /*#__PURE__*/_react["default"].createElement("div", {
    id: "additem-time"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    onChange: handleHour,
    value: duration.hours,
    placeholder: "Hours",
    type: "number",
    min: "0"
  }), /*#__PURE__*/_react["default"].createElement("input", {
    onChange: handleMinute,
    value: duration.minutes,
    placeholder: "Minutes",
    type: "number",
    min: "0"
  }), /*#__PURE__*/_react["default"].createElement("input", {
    onChange: handleSecond,
    value: duration.seconds,
    placeholder: "Seconds",
    type: "number",
    min: "0"
  }))));
};

var _default = AddItem;
exports["default"] = _default;