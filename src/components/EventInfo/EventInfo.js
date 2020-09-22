import React, { Component } from "react";
import "./EventInfo.css";
import moment from "moment";
import "moment/locale/pl";

class EventInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="event-info">
        <div>{this.props.event.title}</div>
        <span>
          Godzina wizyty:
          {moment(this.props.event.start).format(" hh:mm").toLocaleString()}
        </span>
      </div>
    );
  }
}

export default EventInfo;
