import { setAlarmState, ALARM_STATE } from "../actions/_collection";

const alarmStateSubsciber = (state, dispatch) => {
  const shouldSetAlarmOn =
        (
          state.alarm.alarmSetTime &&
          state.alarm.state === ALARM_STATE.WAITING &&
          state.time.isAfter(state.alarm.alarmSetTime)
        )
          ||
        (
          state.alarm.snoozeSetTime &&
          state.alarm.state === ALARM_STATE.SNOOZED &&
          state.time.isAfter(state.alarm.snoozeSetTime)
        );

  if (shouldSetAlarmOn) dispatch(setAlarmState(ALARM_STATE.ON));
};

const subscriptionCollection = [alarmStateSubsciber];

export default subscriptionCollection;
