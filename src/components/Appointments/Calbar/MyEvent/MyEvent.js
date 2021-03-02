import React, { Component } from "react";
import "./MyEvent.css";
import moment from "moment";
import "moment/locale/pl";

class MyEvent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="event">
        <div>{this.props.event.type}</div>
        <div>{this.props.event.name}</div>
        <div>
          {moment(this.props.event.patient.firstAppointment).format("MM/YYYY")}
        </div>
      </div>
    );
  }
}

export default MyEvent;
