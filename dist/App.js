"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reducers = _interopRequireDefault(require("./redux/reducers.js"));

var _ListItem = _interopRequireDefault(require("./components/ListItem"));

var _AddItem = _interopRequireDefault(require("./components/AddItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var App = function App(props) {
  var goals = (0, _reactRedux.useSelector)(function (state) {
    return state.goals;
  }); //goals = goals.filter((goal) => goal.complete)

  goals = goals.map(function (goal) {
    return /*#__PURE__*/_react["default"].createElement(_ListItem["default"], {
      title: goal.title,
      time: goal.time,
      complete: goal.complete,
      key: goal.id,
      id: goal.id
    });
  });
  console.log(goals);
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "react-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    id: "goal-list"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    id: "goal-title"
  }, " Your Goals "), goals, /*#__PURE__*/_react["default"].createElement(_AddItem["default"], null)), /*#__PURE__*/_react["default"].createElement("img", {
    id: "settings",
    src: "static/more.png"
  }));
};

var store = (0, _redux.createStore)(_reducers["default"], window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
var domContainer = document.getElementById('react-content');

_reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
  store: store
}, /*#__PURE__*/_react["default"].createElement(App, null)), domContainer);