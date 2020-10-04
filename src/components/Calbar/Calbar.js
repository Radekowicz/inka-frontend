import React, { Component } from "react";
import "./Calbar.scss";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pl";
import MyEvent from "./MyEvent/MyEvent";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import AsyncSelect from "react-select/async";
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

const customStyles = {
  control: (base, state) => ({
    ...base,
    height: "43px",
    "min-height": "43px",
  }),
};

class Calbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupOpen: false,
      selectedOption: null,
      patientOptions: [],
      start: null,
      end: null,
      patientValue: null,
    };

    this.loadOptions();
    this.loadAppointments();
  }

  // load options using API call
  loadOptions = async () => {
    const response = await fetch("/patients");
    const data = await response.json();
    const patients = data.map((patient, index) => ({
      value: `${patient._id}`,
      label: `${patient.firstName} ${patient.lastName}`,
    }));
    this.setState({ patientOptions: patients });
  };

  loadAppointments = async () => {
    this.props.loadAppointments();
  };

  handleDeleteClick = async () => {
    this.props.deleteAppointment();
  };

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleValueChange = (newValue) => {
    this.setState({ patientValue: newValue });
  };

  handleEventClick(event) {
    this.props.handleEventClick(event);
  }

  handleSelect = async (title, patient) => {
    if (title && patient) {
      await fetch("/appointments", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: this.state.start,
          endDate: this.state.end,
          title: title.value,
          patient: patient.value,
        }),
      });
      this.loadAppointments();
    } else {
      window.alert("Nie podano wszystkich danych");
    }
    this.setState({ selectedOption: null, value: null });
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
          scrollToTime={
            new Date(new Date().setHours(new Date().getHours() - 3))
          }
          defaultView="day"
          events={this.props.events}
          style={{ height: "calc(100vh - 70px)" }}
          messages={messages}
          selectable={true}
          views={["month", "week", "day"]}
          formats={formats}
          onSelectSlot={({ start, end }) => {
            this.setState({ popupOpen: true, start: start, end: end });
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

                <Select
                  isClearable
                  onChange={this.handleValueChange}
                  options={this.state.patientOptions}
                  styles={customStyles}
                />
              </div>
              <div>
                <label>Rodzaj wizyty</label>
                <Select
                  value={this.selectedOption}
                  onChange={this.handleChangeSelect}
                  options={this.props.options}
                  styles={customStyles}
                />
              </div>
              <div className="buttonn">
                <Button
                  className="button"
                  onClick={() => {
                    this.setState({ popupOpen: false });
                    this.handleSelect(
                      this.state.selectedOption,
                      this.state.patientValue
                    );
                  }}
                >
                  Ok
                </Button>
              </div>
            </div>
          </Popup>
        </div>
      </div>
    );
  }
}

export default Calbar;
