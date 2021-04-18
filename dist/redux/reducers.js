"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reducer;

var actions = _interopRequireWildcard(require("./actionTypes.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// reducer for the redux actions
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    currentTime: Date.now(),
    goals: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var id, newGoals;

  switch (action.type) {
    case actions.GOAL_ADD:
      newGoals = {};
      newGoals[action.payload.id] = {
        name: action.payload.name,
        time: action.payload.time,
        duration: action.payload.duration,
        complete: action.payload.complete
      }; // preserving immutability, done throughout this

      newGoals = Object.assign(newGoals, state.goals);
      return _objectSpread(_objectSpread({}, state), {}, {
        goals: newGoals
      });
      break;

    case actions.GOAL_COMPLETE:
      id = action.payload.id;
      newGoals = state.goals;
      newGoals[id].complete = !newGoals[id].complete;
      return _objectSpread(_objectSpread({}, state), {}, {
        goals: newGoals
      });
      break;

    case actions.GOAL_DELETE:
      id = action.payload.id;
      newGoals = Object.assign({}, state.goals);
      delete newGoals[id];
      return _objectSpread(_objectSpread({}, state), {}, {
        goals: newGoals
      });
      break;

    case actions.LOAD_GOALS:
      var goals = {};
      action.payload.goals.forEach(function (goal) {
        goals[goal.id] = {
          name: goal.name,
          duration: goal.duration,
          time: goal.time,
          complete: goal.complete
        };
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        goals: goals
      });
      break;

    default:
      return state;
  }
}

;