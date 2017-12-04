import React from "react";
import { Link } from "react-router-dom";
// import TimePicker from "rc-time-picker";
import { TimePicker, LocaleProvider } from "antd";
import enUS from 'antd/lib/locale-provider/en_US';
import moment from "moment";
import "../../style/components/SetAlarm.scss";
import "antd/lib/date-picker/style/css";

const SetAlarm = ({ alarmSetTime, setAlarm }) => {
  let _alarmSetTime = alarmSetTime || moment();
  return (
    <div id="set-alarm">
      <Link to="/" id="set-alarm-back-button">
        <i className="fa fa-arrow-circle-o-left fa-3x" />
      </Link>
      <LocaleProvider locale={enUS}>
        <TimePicker defaultValue={_alarmSetTime} format="HH:mm" size="large" style={{ zoom: "1.1" }} onChange={(time, timeString) => { _alarmSetTime = time; }} />
      </LocaleProvider>
      <Link
        to="/"
        id="set-alarm-button"
        className="ui primary button"
        onClick={() => { setAlarm(_alarmSetTime.format("HH:mm:00"), moment().add(10, "hours")); }}
      >
        Set Alarm!
      </Link>

    </div>
  );
};

export default SetAlarm;

