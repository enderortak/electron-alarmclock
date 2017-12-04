import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { ALARM_STATE } from "../actions/_collection";
import ClockDisplay from "./ClockDisplay";
import "../../style/components/AlarmClock.scss";


console.log(`alarmclock ${process.env.NODE_ENV}`);
const snoozeButton = (isAlarmOn, snoozeAlarm) => isAlarmOn &&
<button className="ui secondary button" onClick={snoozeAlarm}>Snooze Alarm</button>;

const setAlarmButton = isAlarmSet => (
  <Link to="/SetAlarm">
    <button className="ui primary button">{isAlarmSet ? "Change Alarm" : "Set Alarm"}</button>
  </Link>
);

const audio = (isAlarmOn, alarmSoundFile) => process.env.NODE_ENV === "production" && isAlarmOn &&
  <audio autoPlay loop>
    <source src={alarmSoundFile} type="audio/mpeg" />
  </audio>;

class AlarmClock extends React.Component {
  componentDidMount() {
    this.props.clockStart();
  }
  componentWillUnmount() {
    this.props.clockStop();
  }
  render() {
    const isAlarmOn = this.props.alarmState === ALARM_STATE.ON;
    return (
      <div
        className={classNames("alarm-clock", { "alarm-on": isAlarmOn })}
        onKeyDown={this.props.snoozeAlarm}
      >
        <div>
          <ClockDisplay time={this.props.timeDisplay} />
          <div>{this.props.alarmSetTimeDisplay}</div>
          {snoozeButton(isAlarmOn, this.props.snoozeAlarm)}
          {setAlarmButton(this.props.isAlarmSet, this.props.showSetAlarmWindow)}
        </div>
        {audio(isAlarmOn, this.props.alarmSoundFile)}
      </div>
    );
  }
}

AlarmClock.propTypes = {
  clockStart: propTypes.func.isRequired,
  clockStop: propTypes.func.isRequired,
  alarmState: propTypes.string.isRequired,
  snoozeAlarm: propTypes.func.isRequired,
  alarmSetTimeDisplay: propTypes.string.isRequired,
  timeDisplay: propTypes.string.isRequired,
  alarmSoundFile: propTypes.string.isRequired,
  isAlarmSet: propTypes.bool.isRequired,
  showSetAlarmWindow: propTypes.func.isRequired,
};


export default AlarmClock;
