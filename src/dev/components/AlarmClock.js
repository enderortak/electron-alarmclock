import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import { ALARM_STATE } from "../actions/_collection";
import ClockDisplay from "./ClockDisplay";

const snoozeButton = (isAlarmOn, snoozeAlarm) => isAlarmOn &&
<button className="ui secondary button" onClick={snoozeAlarm}>Snooze Alarm</button>;

const audio = (isAlarmOn, alarmSoundFile) => isAlarmOn &&
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
        className={classNames("clock flex-container", { "alarm-on": isAlarmOn })}
        onKeyDown={this.props.snoozeAlarm}
      >
        <div>
          <ClockDisplay time={this.props.timeDisplay} />
          <div>{this.props.alarmSetTimeDisplay}</div>
          {snoozeButton(isAlarmOn, this.props.snoozeAlarm)}
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
};


export default AlarmClock;
