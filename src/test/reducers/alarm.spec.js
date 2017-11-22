const { describe, it } = require("mocha");
const chai = require("chai");
const alarm = require("../../build/reducers/alarm").default;
const { snapshots } = require("./alarm.snapshot");

const { expect } = chai;
chai.use(require("chai-moment"));

const isEqualWithMoment = (obj1, obj2) => {
  Object.keys(obj2).forEach((key) => {
    if (obj2[key].add) expect(obj2[key]).to.be.sameMoment(obj1[key]);
    else if (Array.isArray(obj2[key])) isEqualWithMoment(obj1[key], obj2[key]);
    else expect(obj2[key]).to.deep.equal(obj1[key]);
  });
};

describe("Alarm reducer", () => {
  snapshots.forEach((snapshot) => {
    it(snapshot.description, () => {
      isEqualWithMoment(alarm(snapshot.oldState, snapshot.action), snapshot.newState);
      // const os = alarm(snapshot.oldState, snapshot.action);
      // const ns = snapshot.newState;
    });
  });
});

