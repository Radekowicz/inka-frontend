import React, { Component } from "react";
import "./Calbar.scss";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pl";
import MyEvent from "./MyEvent/MyEvent";
import Select from "react-select";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Button } from "../Button";

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
  { value: "konsultacja", label: "Konsultacja" },
  { value: "wyciski", label: "Wyciski" },
  { value: "analiza", label: "Analiza i planowanie leczenia" },
  { value: "zalozenie-gora", label: "Założenie aparatu stałego góra" },
  { value: "zalozenie-dol", label: "Założenie aparatu stałego dół" },
  { value: "kontrolna-staly", label: "Wizyta kontrolna z aparatem stałym" },
  { value: "kontrolna-po", label: "Wizyta kontrolna po zdjęciu aparatu" },
];

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
      popupOpen: false,
      selectedOption: null,
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(selectedOption.label);
  };

  handleEventClick(event) {
    this.props.handleEventClick(event);
  }

  handleSelect = ({ start, end }, title) => {
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

  eventStyleGetter(event, start, end, isSelected) {
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
          onSelectSlot={() => this.setState({ popupOpen: true })}
          onSelectEvent={this.props.handleEventClick}
          step={15}
          eventPropGetter={this.eventStyleGetter}
          components={{
            event: MyEvent,
          }}
        />

        <div className="ap">
          <Popup modal open={this.state.popupOpen}>
            Tralala
            <Select
              value={this.selectedOption}
              onChange={this.handleChange}
              options={options}
            />
            <Button
              onClick={() => {
                this.setState({ popupOpen: false });
                /*                 this.handleSelect(this.selectedOption.label);
                 */
              }}
            >
              Ok
            </Button>
          </Popup>
        </div>
      </div>
    );
  }
}

export default Calbar;
