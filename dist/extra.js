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
  if (hours > 0) return hours + " hours" + (!minutes == 0 ? " and " + minutes + " minutes" : "");else if (minutes > 0) return minutes + " minutes" + (!seconds == 0 ? " and " + seconds + " seconds" : "");else if (seconds >= 0) return seconds + " seconds";else "No Time";
};

exports.timeConverter = timeConverter;