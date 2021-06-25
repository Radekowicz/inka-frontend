import React from 'react';
import './MyEvent.css';
import moment from 'moment';
import 'moment/locale/pl';

export default function MyEvent(props) {
  return (
    <div className="event">
      <div>{props.event.type}</div>
      <div>{props.event.name}</div>
      <div>
        {moment(props.event.patient.firstAppointment).format('MM/YYYY')}
      </div>
    </div>
  );
}
