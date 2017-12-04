import { describe, it } from "mocha";
import { expect } from "chai";
import moment from "moment";
import "moment-duration-format";
import { getNextTime } from "../../src/js/internal/timeUtils";


describe("getNextTime", () => {
  it("should calculate next time according to actual time", () =>
    expect(getNextTime("08:00:00", moment("2017-01-01 07:30:00"))).to.be.sameMoment(moment("2017-01-01 08:00:00")));
  it("should calculate next time according to actual time when given time is past for that date", () =>
    expect(getNextTime("07:30:00", moment("2017-01-01 08:00:00"))).to.be.sameMoment(moment("2017-01-02 07:30:00")));
});

