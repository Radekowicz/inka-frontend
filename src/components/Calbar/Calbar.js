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

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: 10,
  }),
  container: () => ({
    // none of react-select's styles are passed to <Control />
    width: 400,
  }),
};

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
      start: null,
      end: null,
      value: "",
    };
  }

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(selectedOption.label);
  };

  handleChangeInput = (event) => {
    this.setState({ value: event.target.value });
    console.log(event.target.value);
  };

  handleEventClick(event) {
    this.props.handleEventClick(event);
  }

  handleSelect = (title, name) => {
    const start = this.state.start;
    const end = this.state.end;
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
    var backgroundColor;
    switch (event.title) {
      case "Konsultacja":
        backgroundColor = "#f94144";
        break;
      case "Wyciski":
        backgroundColor = "#f3722c";
        break;
      case "Analiza i planowanie leczenia":
        backgroundColor = "#f8961e";
        break;
      case "Założenie aparatu stałego góra":
        backgroundColor = "#f9c74f";
        break;
      case "Założenie aparatu stałego dół":
        backgroundColor = "#90be6d";
        break;
      case "Wizyta kontrolna z aparatem stałym":
        backgroundColor = "#43aa8b";
        break;
      case "Wizyta kontrolna po zdjęciu aparatu":
        backgroundColor = "#577590";
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
          onSelectSlot={({ start, end }) => {
            this.setState({ popupOpen: true });
            this.setState({ start: start });
            this.setState({ end: end });
          }}
          onSelectEvent={this.props.handleEventClick}
          step={15}
          eventPropGetter={this.eventStyleGetter}
          components={{
            event: MyEvent,
          }}
        />

        <div>
          <Popup
            modal
            open={this.state.popupOpen}
            contentStyle={{ width: "488px" }}
          >
            <div className="popup">
              <div className="input">
                <label className="name-input-title">Imię pacjenta</label>
                <input
                  className="name-input"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChangeInput}
                />
              </div>
              <div>
                <label>Rodzaj wizyty</label>
                <Select
                  value={this.selectedOption}
                  onChange={this.handleChangeSelect}
                  options={options}
                  styles={customStyles}
                />
              </div>

              <Button
                className="button"
                onClick={() => {
                  this.setState({ popupOpen: false });
                  this.handleSelect(
                    this.state.selectedOption.label,
                    this.state.value
                  );
                  this.setState({ value: "" });
                }}
              >
                Ok
              </Button>
            </div>
          </Popup>
        </div>
      </div>
    );
  }
}

export default Calbar;
