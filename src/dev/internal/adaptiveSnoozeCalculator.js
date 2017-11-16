export const calculateSnoozeZone =
(alarmTime, maxTime, numberOfLevels, actualTime) => {
  const snoozeChangeRange = maxTime.diff(alarmTime);
  let level = 1;
  alarmTime.add(snoozeChangeRange / numberOfLevels);
  while (level < numberOfLevels && actualTime.isAfter(alarmTime)) {
    level += 1;
    alarmTime.add(snoozeChangeRange / numberOfLevels);
  }
  return level;
};
export const calculateSnoozeTimeRange =
(alarmTime, maxTime, numberOfLevels, denominator, actualTime) => {
  const snoozeChangeRange = maxTime.diff(alarmTime);
  const adaptiveSnoozeTimeRange = snoozeChangeRange / denominator;
  const zone = calculateSnoozeZone(alarmTime, maxTime, actualTime, numberOfLevels);
  return adaptiveSnoozeTimeRange / zone;
};

