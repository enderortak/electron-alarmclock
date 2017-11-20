import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { clockTick, setAlarmTime, snoozeAlarm, ALARM_STATE } from "../actions/_collection";


// const alarmSetTime = moment().add(5, "seconds")
// const alarmMaxTime = moment().add(30, "seconds")
// const alarmSnooze = 1;

const alarmSetTime = moment("2017-11-20").add(7, "hours").add(15, "minutes");
const alarmMaxTime = moment("2017-11-20").add(7, "hours").add(45, "minutes");
const alarmSnooze = 5;


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
          <div>{this.props.alarmTimeDisplay}</div><br />
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
  alarmTimeDisplay: propTypes.string.isRequired,
  timeDisplay: propTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  let intervalId;
  dispatch(setAlarmTime(alarmSetTime, alarmMaxTime));
  return {
    clockStart: () => {
      intervalId = setInterval(() => { dispatch(clockTick()); }, 100);
    },
    clockStop: () => { clearInterval(intervalId); },
    // snoozeAlarm: () => { dispatch(snoozeAlarm(moment().add(5, "minutes"))); }
    snoozeAlarm: () => { dispatch(snoozeAlarm(moment().add(alarmSnooze, "minutes"))); },
  };
};
const alarmTimeDisplay = (state) => {
  if (state.alarm.time) {
    switch (state.alarm.state) {
      case ALARM_STATE.OFF: return "Alarm turned off";
      case ALARM_STATE.ON: return "Wake up!!!";
      case ALARM_STATE.WAITING: return `Alarm time: ${state.alarm.time.format("DD.MM.YYYY HH:mm:ss")}`;
      case ALARM_STATE.SNOOZED: return `Alarm time: ${state.alarm.time.format("DD.MM.YYYY HH:mm:ss")}, Snoozed until: ${state.alarm.snoozeTime.format("DD.MM.YYYY HH:mm:ss")}`;
      default: return "";
    }
  } else return "Alarm not set";
};
const ClockContainer = connect(
  state => ({
    timeDisplay: state.time.format("DD.MM.YYYY HH:mm:ss"),
    alarmTimeDisplay: alarmTimeDisplay(state),
    alarmState: state.alarm.state,
  }),
  mapDispatchToProps,
)(Clock);

export default ClockContainer;
