"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goalDeleted = exports.goalFinished = exports.goalAdded = exports.goalsLoaded = void 0;

var actions = _interopRequireWildcard(require("./actionTypes.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var goalsLoaded = function goalsLoaded(goals) {
  return {
    type: actions.LOAD_GOALS,
    payload: {
      goals: goals
    }
  };
};

exports.goalsLoaded = goalsLoaded;

var goalAdded = function goalAdded(name, duration, time, id, complete) {
  return {
    type: actions.GOAL_ADD,
    payload: {
      name: name,
      duration: duration,
      time: time,
      id: id,
      complete: complete
    }
  };
};

exports.goalAdded = goalAdded;

var goalFinished = function goalFinished(id) {
  return {
    type: actions.GOAL_COMPLETE,
    payload: {
      id: id
    }
  };
};

exports.goalFinished = goalFinished;

var goalDeleted = function goalDeleted(id) {
  return {
    type: actions.GOAL_DELETE,
    payload: {
      id: id
    }
  };
};

exports.goalDeleted = goalDeleted;