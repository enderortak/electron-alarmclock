import React from "react";
import propTypes from "prop-types";
import { ALARM_STATE } from "../actions/_collection";

class Clock extends React.Component {
  componentDidMount() {
    this.props.clockStart();
  }
  componentWillUnmount() {
    this.props.clockStop();
  }
  audio() {
    return (
      this.props.alarmState === ALARM_STATE.ON ?
        <audio autoPlay loop>
          <source src="assets/audio/alarm-sound.wav" type="audio/mpeg" />
        </audio>

        : "");
  }
  render() {
    return (
      <div
        className="clock flex-container"
        style={{
                background: this.props.alarmState === ALARM_STATE.ON ? "red" : "none",
            }}
        onClick={this.props.snoozeAlarm}
        onKeyDown={this.props.snoozeAlarm}
      >
        <div>
          <div>{this.props.alarmSetTimeDisplay}</div><br />
          <div>{this.props.timeDisplay}</div>
        </div>
        {this.audio()}
      </div>
    );
  }
}

Clock.propTypes = {
  clockStart: propTypes.func.isRequired,
  clockStop: propTypes.func.isRequired,
  alarmState: propTypes.string.isRequired,
  snoozeAlarm: propTypes.func.isRequired,
  alarmSetTimeDisplay: propTypes.string.isRequired,
  timeDisplay: propTypes.string.isRequired,
};


export default Clock;
