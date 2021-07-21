import React from 'react';
import './EventInfo.css';
import moment from 'moment';
import 'moment/locale/pl';
import Paper from '@material-ui/core/Paper';

export default function EventInfo(props) {
  return (
    <Paper className="event-info">
      <div>{props.event.type ? props.event.type : ' '}</div>
      <span>
        Godzina wizyty:
        {moment(props.event.start).format(' hh:mm').toLocaleString()}
      </span>
    </Paper>
  );
}
