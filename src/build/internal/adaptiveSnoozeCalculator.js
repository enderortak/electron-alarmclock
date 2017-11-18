"use strict";

const calculateSnoozeZone = (alarmTime, snoozeRange, numberOfLevels, actualTime) => {
  let level = 1;
  const _alarmTime = alarmTime.clone();
  _alarmTime.add(snoozeRange / numberOfLevels);
  while (level < numberOfLevels && actualTime.isAfter(_alarmTime.clone().add(-1000))) {
    level += 1;
    _alarmTime.add(snoozeRange / numberOfLevels);
  }
  return level;
};
const calculateSnoozeTimeSpan = (snoozeRange, denominator, zone) => {
  const adaptiveSnoozeTimeRange = snoozeRange / denominator;
  return adaptiveSnoozeTimeRange / zone;
};

module.exports.calculateSnoozeZone = calculateSnoozeZone;
module.exports.calculateSnoozeTimeSpan = calculateSnoozeTimeSpan;