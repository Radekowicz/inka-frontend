import React from "react";
import "./CustomEvent.css";
import moment from "moment";
import "moment/locale/pl";

export default function CustomEvent(props) {
  return (
    <div className="custom-event">
      <div className="custom-event_text">{props.event.type}</div>
      <div className="custom-event_text">{props.event.name}</div>
      <div className="custom-event_text">
        {moment(props.event.patient.firstAppointment).format("MM/YYYY")}
      </div>
    </div>
  );
}
