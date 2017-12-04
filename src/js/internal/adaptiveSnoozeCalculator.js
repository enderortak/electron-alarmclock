const calculateSnoozeZone =
(alarmSetTime, snoozeRange, numberOfLevels, actualTime) => {
  let level = 1;
  const _alarmSetTime = alarmSetTime.clone();
  _alarmSetTime.add(snoozeRange / numberOfLevels);
  while (level < numberOfLevels && actualTime.isAfter(_alarmSetTime.clone().add(-1000))) {
    level += 1;
    _alarmSetTime.add(snoozeRange / numberOfLevels);
  }
  return level;
};
const calculateSnoozeTimeSpan =
(snoozeRange, denominator, zone) => {
  const adaptiveSnoozeTimeRange = snoozeRange / denominator;
  return adaptiveSnoozeTimeRange / zone;
};

export { calculateSnoozeZone, calculateSnoozeTimeSpan };
