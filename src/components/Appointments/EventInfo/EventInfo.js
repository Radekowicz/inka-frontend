import React from 'react';
import './EventInfo.css';
import moment from 'moment';
import 'moment/locale/pl';

export default function EventInfo(props) {
  return (
    <div className="event-info">
      <div>{props.event.type ? props.event.type : ' '}</div>
      <span>
        Godzina wizyty:
        {moment(props.event.start).format(' hh:mm').toLocaleString()}
      </span>
    </div>
  );
}
