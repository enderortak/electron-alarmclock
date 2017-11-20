const { describe, it } = require("mocha");
const { expect } = require("chai");
const alarm = require("../../build/reducers/alarm").default;
const { snapshots } = require("./alarm.snapshot");

describe("Alarm reducer", () => {
  snapshots.forEach((snapshot) => {
    it(snapshot.description, () => {
      expect(alarm(snapshot.oldState, snapshot.action)).to.deep.equal(snapshot.newState);
    });
  });
});

