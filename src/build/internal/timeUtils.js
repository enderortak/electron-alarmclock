"use strict";

const moment = require("moment");

const getNextTime = (timeString, actualTime) => {
  const _actualTime = actualTime || moment();
  return _actualTime.clone().startOf("day").add(moment.duration(timeString)).isAfter(_actualTime) ? _actualTime.clone().startOf("day").add(moment.duration(timeString)) : _actualTime.clone().startOf("day").add(moment.duration(timeString)).add(1, "days");
};

exports.getNextTime = getNextTime;