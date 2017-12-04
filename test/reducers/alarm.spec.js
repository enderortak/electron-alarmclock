import { describe, it } from "mocha";
import chai, { expect } from "chai";
import chaiMoment from "chai-moment";
import alarm from "../../src/js/reducers/alarm";
import { snapshots } from "./alarm.snapshot";

chai.use(chaiMoment);

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
    });
  });
});

