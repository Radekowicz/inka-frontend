import React from 'react';
import './EventInfo.css';
import moment from 'moment';
import 'moment/locale/pl';
import Paper from '@material-ui/core/Paper';

export default function EventInfo(props) {
  return (
    <Paper className="event-info">
      <div>
        Typ wizyty: <b>{props.event.type ? props.event.type : ' '}</b>
      </div>
      <span>
        Godzina wizyty:
        <b>{moment(props.event.start).format(' hh:mm').toLocaleString()}</b>
      </span>
    </Paper>
  );
}
