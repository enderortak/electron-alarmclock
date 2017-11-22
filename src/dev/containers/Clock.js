import moment from "moment";
import { connect } from "react-redux";
import { clockTick, setalarmSetTime, snoozeAlarm, ALARM_STATE } from "../actions/_collection";
import Clock from "../components/Clock";


const alarmSetTime = moment("2017-11-23").add(7, "hours").add(15, "minutes");
const alarmMaxTime = moment("2017-11-23").add(7, "hours").add(45, "minutes");
const alarmSnooze = null;

// const alarmSetTime = moment().clone().add(5, "seconds");
// const alarmMaxTime = moment().clone().add(35, "seconds");
// const alarmSnooze = undefined;

const alarmSetTimeDisplay = (state) => {
  if (state.alarm.alarmSetTime) {
    switch (state.alarm.state) {
      case ALARM_STATE.OFF: return "Alarm turned off";
      case ALARM_STATE.ON: return "Wake up!!!";
      case ALARM_STATE.WAITING: return `Alarm time: ${state.alarm.alarmSetTime.format("DD.MM.YYYY HH:mm:ss")}`;
      case ALARM_STATE.SNOOZED: return `Alarm time: ${state.alarm.alarmSetTime.format("DD.MM.YYYY HH:mm:ss")}, Snoozed until: ${state.alarm.snoozeSetTime.format("DD.MM.YYYY HH:mm:ss")}`;
      default: return "";
    }
  } else return "Alarm not set";
};

const mapStateToProps = state => ({
  timeDisplay: state.time.format("DD.MM.YYYY HH:mm:ss"),
  alarmSetTimeDisplay: alarmSetTimeDisplay(state),
  alarmState: state.alarm.state,
});

const mapDispatchToProps = (dispatch) => {
  let intervalId;
  dispatch(setalarmSetTime(alarmSetTime, alarmMaxTime));
  return {
    clockStart: () => {
      intervalId = setInterval(() => { dispatch(clockTick()); }, 100);
    },
    clockStop: () => { clearInterval(intervalId); },
    // snoozeAlarm: () => { dispatch(snoozeAlarm(moment().add(5, "minutes"))); }
    snoozeAlarm: () => { dispatch(snoozeAlarm(moment(), alarmSnooze ? moment().clone().add(alarmSnooze, "minutes") : null)); },
  };
};

const ClockContainer = connect(mapStateToProps, mapDispatchToProps)(Clock);

export default ClockContainer;
