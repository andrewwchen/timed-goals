"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeConverter = void 0;

// file intended for misc functionality, only used it for this function
// turns UNIX time to readable time
var timeConverter = function timeConverter(time) {
  // 1000 ms for a second
  // 60000 ms for a minute
  // 3600000 ms for an hour
  var hours = Math.floor(time / 3600000);
  var minutes = Math.floor(time % 3600000 / 60000);
  var seconds = Math.floor(time % 60000 / 1000);
  if (hours > 0) return hours + " hour" + (hours != 1 ? "s " : " ") + (!minutes == 0 ? " and " + minutes + " minute" + (minutes != 1 ? "s " : " ") : "");else if (minutes > 0) return minutes + " minute" + (minutes != 1 ? "s " : " ") + (!seconds == 0 ? " and " + seconds + " second" + (seconds != 1 ? "s " : " ") : "");else if (seconds >= 0) return seconds + " second" + (seconds != 1 ? "s " : " ");else "No Time";
};

exports.timeConverter = timeConverter;