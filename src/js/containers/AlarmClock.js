import moment from "moment";
import { connect } from "react-redux";
import { ipcRenderer } from "electron";
import { clockTick, setalarmSetTime, snoozeAlarm, showSetAlarmWindow, ALARM_STATE, hideSetAlarmWindow } from "../actions/_collection";
import Clock from "../components/AlarmClock";
import { alarmSetTime, alarmMaxTime, alarmSnooze, alarmSoundFile } from "../appSettings";


const alarmSetTimeDisplay = (state) => {
  if (state.alarm.alarmSetTime) {
    switch (state.alarm.state) {
      case ALARM_STATE.OFF: return "Alarm turned off";
      case ALARM_STATE.ON: return "Wake up!!!";
      case ALARM_STATE.WAITING: return `Alarm time: ${state.alarm.alarmSetTime.format("HH:mm:ss")}`;
      case ALARM_STATE.SNOOZED: return `Alarm time: ${state.alarm.alarmSetTime.format("HH:mm:ss")}, Snoozed until: ${state.alarm.snoozeSetTime.format("HH:mm:ss")}`;
      default: return "";
    }
  } else return "Alarm not set";
};

const mapStateToProps = state => ({
  timeDisplay: state.time.format("HH:mm:ss"),
  alarmSetTimeDisplay: alarmSetTimeDisplay(state),
  alarmState: state.alarm.state,
  alarmSoundFile,
  isAlarmSet: !(state.alarm.alarmSetTime === undefined),
});

const mapDispatchToProps = (dispatch) => {
  let intervalId;
  ipcRenderer.on("hideChildWindow", () => dispatch(hideSetAlarmWindow()));
  return {
    clockStart: () => {
      intervalId = setInterval(() => { dispatch(clockTick()); }, 100);
    },
    clockStop: () => { clearInterval(intervalId); },
    // snoozeAlarm: () => { dispatch(snoozeAlarm(moment().add(5, "minutes"))); }
    snoozeAlarm: () => { dispatch(snoozeAlarm(moment(), alarmSnooze ? moment().clone().add(alarmSnooze, "minutes") : null)); },
    showSetAlarmWindow: () => { dispatch(showSetAlarmWindow()); },
  };
};

const ClockContainer = connect(mapStateToProps, mapDispatchToProps)(Clock);

export default ClockContainer;
