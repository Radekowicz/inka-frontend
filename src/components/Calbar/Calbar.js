import React, { Component } from "react";
import "./Calbar.scss";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pl";
import EventInfo from "../EventInfo/EventInfo";

const localizer = momentLocalizer(moment);

const messages = {
  allDay: "Cały dzień",
  previous: "Wczoraj",
  next: "Jutro",
  today: "Dzisiaj",
  month: "Miesiąc",
  week: "Tydzień",
  day: "Dzień",
  agenda: "Agenda",
  date: "Data",
  time: "Czas",
  event: "Wydarzenie",
};

let formats = {
  dayHeaderFormat: "dddd, DD MMMM YYYY",
  dayRangeHeaderFormat: "MMMM YYYY",
};

class Calbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          start: moment().toDate(),
          end: moment().toDate(),
          title: "Some title",
        },
        {
          start: moment().toDate(),
          end: moment().toDate(),
          title: "Some title 2",
        },
      ],
    };
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt("Nowa wizyta");
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      });
  };

  render() {
    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="day"
          events={this.state.events}
          style={{ height: "100vh" }}
          messages={messages}
          selectable={true}
          views={["month", "week", "day"]}
          formats={formats}
          onSelectEvent={this.handleEventClick}
          onSelectSlot={this.handleSelect}
        />
      </div>
    );
  }
}

export default Calbar;
