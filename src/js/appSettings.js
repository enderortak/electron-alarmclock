// import moment from "moment";
import { getNextTime } from "./internal/timeUtils";

import snd from "../assets/audio/alarm-sound.wav";

export const alarmSoundFile = snd;
export const alarmSetTime = getNextTime("10:33:00");
export const alarmMaxTime = getNextTime("07:45:00");
export const alarmSnooze = null;

// export const alarmSetTime = moment().clone().add(5, "seconds");
// export const alarmMaxTime = moment().clone().add(35, "seconds");
// export const alarmSnooze = undefined;
