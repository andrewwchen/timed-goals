"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reducers = _interopRequireDefault(require("./redux/reducers.js"));

var _actions = require("./redux/actions");

var _ListItem = _interopRequireDefault(require("./components/ListItem"));

var _AddItem = _interopRequireDefault(require("./components/AddItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, props);
    _this.state = {
      currentTime: Date.now()
    };
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setInterval(function () {
        _this2.setState({
          currentTime: Date.now()
        });
      }, 1000);
    } //goals = goals.filter((goal) => goal.complete)
    // converts object to sorted array of goal IDs

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: "react-container"
      }, /*#__PURE__*/_react["default"].createElement(List, {
        currentTime: this.state.currentTime
      }), /*#__PURE__*/_react["default"].createElement("img", {
        id: "settings",
        src: "https://i.ibb.co/RB57Dty/more.png"
      }));
    }
  }]);

  return App;
}(_react["default"].Component);

;

var List = function List(props) {
  var goals = (0, _reactRedux.useSelector)(function (state) {
    return state.goals;
  });
  var dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(function () {
    vscode.postMessage({
      command: 'getTimedGoals'
    });
    window.addEventListener('message', function (event) {
      var message = event.data;

      switch (message.command) {
        case "getTimedGoals":
          dispatch((0, _actions.goalsLoaded)(message.payload.goals));
          break;

        case "createTimedGoal":
          dispatch((0, _actions.goalAdded)(message.payload.name, message.payload.duration, message.payload.time, message.payload.id, message.payload.complete));
          break;

        case "deleteTimedGoal":
          dispatch((0, _actions.goalDeleted)(message.payload.id));
          break;

        case "completeTimedGoal":
          dispatch((0, _actions.goalFinished)(message.payload.id));
          break;
      }
    });
  }, []);
  var newGoals = Object.keys(goals).sort(function (a, b) {
    return b - a;
  });
  newGoals = newGoals.map(function (goalID) {
    return /*#__PURE__*/_react["default"].createElement(_ListItem["default"], {
      key: goalID,
      id: goalID,
      currentTime: props.currentTime
    });
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "goal-list"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    id: "goal-title"
  }, " Your Goals "), newGoals, /*#__PURE__*/_react["default"].createElement(_AddItem["default"], null));
};

var store = (0, _redux.createStore)(_reducers["default"], window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
var domContainer = document.getElementById('react-content');

_reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
  store: store
}, /*#__PURE__*/_react["default"].createElement(App, null)), domContainer);