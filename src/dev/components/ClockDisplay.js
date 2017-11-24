import React from "react";
import propTypes from "prop-types";


const numberAsText = number => ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][number];

const ClockDigit = value => (
  <div className={`digit ${numberAsText(value)}`}>
    {[...Array(7)].map((e, i) => <div className="unit" key={i} />)}
  </div>
);
const ClockDisplay = ({ time }) => {
  const timeAsArray =
  time.split(":").map(e =>
    [parseInt(e.substring(0, 1), 10), parseInt(e.substring(1, 2), 10)]);
  return (
    <div className="clock-display">
      {ClockDigit(timeAsArray[0][0])}
      {ClockDigit(timeAsArray[0][1])}
      <div className="divider">:</div>
      {ClockDigit(timeAsArray[1][0])}
      {ClockDigit(timeAsArray[1][1])}
      <div className="divider">:</div>
      {ClockDigit(timeAsArray[2][0])}
      {ClockDigit(timeAsArray[2][1])}
      <div className="debug" id="debug" />
    </div>
  );
};

ClockDisplay.propTypes = {
  time: propTypes.string.isRequired,
};


export default ClockDisplay;
