"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const calculateSnoozeZone = exports.calculateSnoozeZone = (alarmTime, maxTime, numberOfLevels, actualTime) => {
  const snoozeChangeRange = maxTime.diff(alarmTime);
  let level = 1;
  alarmTime.add(snoozeChangeRange / numberOfLevels);
  while (level < numberOfLevels && actualTime.isAfter(alarmTime)) {
    level += 1;
    alarmTime.add(snoozeChangeRange / numberOfLevels);
  }
  return level;
};
const calculateSnoozeTimeRange = exports.calculateSnoozeTimeRange = (alarmTime, maxTime, denominator, zone) => {
  const snoozeChangeRange = maxTime.diff(alarmTime);
  const adaptiveSnoozeTimeRange = snoozeChangeRange / denominator;
  return adaptiveSnoozeTimeRange / zone;
};