const { describe, it } = require("mocha");
const { expect } = require("chai");

const {
  CLOCK_TICK, clockTick, SET_ALARM_STATE, setAlarmState,
  SET_ALARM_TIME, setalarmSetTime, SNOOZE_ALARM, snoozeAlarm, ALARM_STATE,
} = require("../../build/actions/_collection");

describe("Redux actions", () => {
  it("clockTick() should create an action to make clock tick", () => {
    expect(clockTick()).to.deep.equal({ type: CLOCK_TICK });
  });
  it("setAlarmState(ALARM_STATE.WAITING) should create an action to set alarm state to waiting", () => {
    expect(setAlarmState(ALARM_STATE.WAITING)).to
      .deep.equal({ type: SET_ALARM_STATE, state: ALARM_STATE.WAITING });
  });
  it("setAlarmState(ALARM_STATE.ON) should create an action to set alarm state to on", () => {
    expect(setAlarmState(ALARM_STATE.ON)).to
      .deep.equal({ type: SET_ALARM_STATE, state: ALARM_STATE.ON });
  });
  it("setAlarmState(ALARM_STATE.OFF) should create an action to set alarm state to off", () => {
    expect(setAlarmState(ALARM_STATE.OFF)).to
      .deep.equal({ type: SET_ALARM_STATE, state: ALARM_STATE.OFF });
  });
  it("setAlarmState(ALARM_STATE.SNOOZED) should create an action to set alarm state to snoozed", () => {
    expect(setAlarmState(ALARM_STATE.SNOOZED)).to
      .deep.equal({ type: SET_ALARM_STATE, state: ALARM_STATE.SNOOZED });
  });
});
