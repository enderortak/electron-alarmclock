import { connect } from "react-redux";
import { getNextTime } from "../internal/timeUtils";
import { setalarmSetTime } from "../actions/_collection";
import SetAlarm from "../components/SetAlarm";

const mapStateToProps = state => ({
  alarmSetTime: state.alarm.alarmSetTime,
  isAlarmSet: !(state.alarm.alarmSetTime === undefined),
});

const mapDispatchToProps = dispatch => ({
  setAlarm: (alarmSetTime, alarmMaxTime) => {
    dispatch(setalarmSetTime(getNextTime(alarmSetTime), getNextTime("11:00:00")));
  },
});

const SetAlarmContainer = connect(mapStateToProps, mapDispatchToProps)(SetAlarm);

export default SetAlarmContainer;
