import React, { Component } from "react";
import "./Calbar.scss";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pl";
import MyEvent from "./MyEvent/MyEvent";
import Select from "react-select";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const MyComponent = () => <Select options={options} />;

class Calbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          start: new Date(new Date().setHours(new Date().getHours() - 1)),
          end: new Date(new Date().setHours(new Date().getHours())),
          title: "Analiza i planowanie leczenia",
          name: "Jan Kowalski",
        },
        {
          start: new Date(new Date().setHours(new Date().getHours() - 5)),
          end: new Date(new Date().setHours(new Date().getHours() - 3)),
          title: "Wizyta kontrolna z aparatem stałym",
          name: "Andrzej Chcipupa",
        },
      ],
    };
  }

  handleEventClick(event) {
    this.props.handleEventClick(event);
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt("Nowa wizyta title");
    const name = window.prompt(MyComponent());
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
            name,
          },
        ],
      });
  };

  eventStyleGetter(event, start, end, isSelected) {
    console.log(event);
    var backgroundColor;
    switch (event.title) {
      case "Analiza i planowanie leczenia":
        backgroundColor = "#f94144";
        break;
      case "Wizyta kontrolna z aparatem stałym":
        backgroundColor = "#f9c74f";
        break;
      case "Wizyta kontrolna z aparatem stałym":
        backgroundColor = "#f9c74f";
        break;
      case "Wizyta kontrolna z aparatem stałym":
        backgroundColor = "#f9c74f";
        break;
      default:
      // code block
    }

    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.5,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  }

  pop = ({ start, end }) => {
    return (
      <div className="ap">
        <h1>Create React Modal with 22 line of code </h1>
        <Popup modal trigger={<button>Click Me</button>}>
          {(close) => <Content close={close} />}
        </Popup>
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="day"
          events={this.state.events}
          style={{ height: "calc(100vh - 70px)" }}
          messages={messages}
          selectable={true}
          views={["month", "week", "day"]}
          formats={formats}
          onSelectSlot={this.pop}
          onSelectEvent={this.props.handleEventClick}
          step={15}
          eventPropGetter={this.eventStyleGetter}
          components={{
            event: MyEvent,
          }}
        />
      </div>
    );
  }
}

export default Calbar;
