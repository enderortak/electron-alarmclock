
import { describe, it } from "mocha";
import { expect } from "chai";
import moment from "moment";
import "moment-duration-format";
import { calculateSnoozeZone, calculateSnoozeTimeSpan } from "../../src/js/internal/adaptiveSnoozeCalculator";
import { snapshots } from "./adaptiveSnoozeCalculator.snapshot";


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

