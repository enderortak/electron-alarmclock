const { describe, it } = require("mocha");
const { expect } = require('chai');
const { getNextTime } = require("../../dev/internal/timeUtils");
const moment = require("moment");
require("moment-duration-format");

describe("getNextTime", () => {
  it("should calculate next time according to actual time", () =>
    expect(getNextTime("08:00:00", moment("01-01-2017 07:30:00"))).to.be.sameMoment(moment("01-01-2017 08:00:00")));
  it("should calculate next time according to actual time when given time is past for that date", () =>
    expect(getNextTime("07:30:00", moment("01-01-2017 08:00:00"))).to.be.sameMoment(moment("01-02-2017 07:30:00")));
});

