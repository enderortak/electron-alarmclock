
const { describe, it } = require("mocha");
const { expect } = require('chai');
const { calculateSnoozeZone, calculateSnoozeTimeSpan } = require("../../dev/internal/adaptiveSnoozeCalculator");
const { snapshots } = require("./adaptiveSnoozeCalculator.snapshot");
const moment = require("moment");
require("moment-duration-format");

const verbose = false;
describe("Adaptive snooze calculation", () => {
  snapshots.forEach((snapshot) => {
    it(snapshot.name, () => {
      const snoozeRange = snapshot.maxTime.diff(snapshot.alarmSetTime);
      const zone = calculateSnoozeZone(
        snapshot.alarmSetTime,
        snoozeRange,
        snapshot.numberOfLevels,
        snapshot.actualTime,
      );
      const snoozeTimeSpan = calculateSnoozeTimeSpan(
        snoozeRange,
        snapshot.denominator,
        zone,
      );
      expect({ zone, snoozeTimeSpan }).to.deep.equal(snapshot.expect);
      if (verbose) {
        console.info(`Adaptive snooze zone: ${zone}`);
        console.info(`Adaptive snooze time span: ${moment.duration(snoozeTimeSpan).format("HH:mm:ss")}`);
        console.info(`Snooze time set to: ${snapshot.actualTime.format("HH:mm:ss")} => ${moment(snapshot.actualTime).add(snoozeTimeSpan).format("HH:mm:ss")}`);
      }
    });
  });
});

