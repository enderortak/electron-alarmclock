const moment = require("moment");

const refTime = moment("2017-01-01");
require("moment-duration-format");

const snapshots = [
  {
    name: "should be able to handle a in-range situations",
    alarmTime: moment(refTime).add(moment.duration("07:20:00")),
    actualTime: moment(refTime).add(moment.duration("07:30:00")),
    maxTime: moment(refTime).add(moment.duration("07:50:00")),
    numberOfLevels: 5,
    denominator: 3,
    expect: {
      zone: 2,
      snoozeTimeSpan: moment.duration("00:05:00").asMilliseconds(),
    },
  },
  {
    name: "should be able to handle a zone-changer point situation",
    alarmTime: moment(refTime).add(moment.duration("07:20:00")),
    actualTime: moment(refTime).add(moment.duration("07:32:00")),
    maxTime: moment(refTime).add(moment.duration("07:50:00")),
    numberOfLevels: 5,
    denominator: 3,
    expect: {
      zone: 3,
      snoozeTimeSpan: moment.duration("00:03:20").asMilliseconds(),
    },
  },
  {
    name: "should be able to handle the max-time point situation",
    alarmTime: moment(refTime).add(moment.duration("07:20:00")),
    actualTime: moment(refTime).add(moment.duration("07:50:00")),
    maxTime: moment(refTime).add(moment.duration("07:50:00")),
    numberOfLevels: 5,
    denominator: 3,
    expect: {
      zone: 5,
      snoozeTimeSpan: moment.duration("00:02:00").asMilliseconds(),
    },
  },
  {
    name: "should be able to handle a after-max-time point situation",
    alarmTime: moment(refTime).add(moment.duration("07:20:00")),
    actualTime: moment(refTime).add(moment.duration("07:55:00")),
    maxTime: moment(refTime).add(moment.duration("07:50:00")),
    numberOfLevels: 5,
    denominator: 3,
    expect: {
      zone: 5,
      snoozeTimeSpan: moment.duration("00:02:00").asMilliseconds(),
    },
  },
];

exports.snapshots = snapshots;