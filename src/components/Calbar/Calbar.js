import React, { Component } from "react";
import "./Calbar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class Calbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          start: moment().toDate(),
          end: moment().add(1, "days").toDate(),
          title: "Some title",
        },
      ],
    };
  }

  render() {
    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default Calbar;
