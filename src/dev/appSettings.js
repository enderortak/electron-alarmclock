import moment from "moment";
import { getNextTime } from "./internal/timeUtils";

export const alarmSoundFile = "assets/audio/alarm-sound.wav2";
// const alarmSetTime = getNextTime("11:41:00");
// const alarmMaxTime = getNextTime("11:42:00");
// const alarmSnooze = null;

export const alarmSetTime = moment().clone().add(5, "seconds");
export const alarmMaxTime = moment().clone().add(35, "seconds");
export const alarmSnooze = undefined;
