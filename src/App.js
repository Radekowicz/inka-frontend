import React, { useEffect, useState, Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Calbar from "./components/Calbar/Calbar";
import EventInfo from "./components/EventInfo/EventInfo";
import PatientInfo from "./components/PatientInfo/PatientInfo";
import { Button } from "./components/Button";

import moment from "moment";

const options = [
  { value: "konsultacja", label: "Konsultacja" },
  { value: "wyciski", label: "Wyciski" },
  { value: "analiza", label: "Analiza i planowanie leczenia" },
  { value: "zalozenie-gora", label: "Założenie aparatu stałego góra" },
  { value: "zalozenie-dol", label: "Założenie aparatu stałego dół" },
  { value: "kontrolna-staly", label: "Wizyta kontrolna z aparatem stałym" },
  { value: "kontrolna-po", label: "Wizyta kontrolna po zdjęciu aparatu" },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: {
        id: "123",
        startDate: moment().toDate(),
        endDate: moment().toDate(),
        title: "Wizyta kontrolna",
        patient: "Ethan Jones",
      },
      events: [],
    };
    this.handleEventClick = this.handleEventClick.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
  }

  handleEventClick = (event) => {
    console.log(event);
    this.setState({
      selectedEvent: event,
    });
  };

  loadAppointments = async () => {
    const response = await fetch("/appointments");
    const data = await response.json();
    const appointments = data.map((appointment, index) => ({
      id: appointment._id,
      start: new Date(appointment.startDate),
      end: new Date(appointment.endDate),
      title: options.find((x) => x.value === appointment.title).label,
      name: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
    }));
    this.setState({ events: appointments });
  };

  deleteAppointment = async () => {
    const selectedEvent = this.state.selectedEvent;
    console.log(selectedEvent.id);

    await fetch(`appointments/${selectedEvent.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    this.loadAppointments();
  };

  render() {
    return (
      <div className="App">
        <div className="Navbar">
          <Navbar />
        </div>
        <div className="Menu">
          <div className="Calendar">
            <Calbar
              handleEventClick={this.handleEventClick}
              handleDeleteClick={this.deleteAppointment}
              options={options}
              loadAppointments={this.loadAppointments}
              events={this.state.events}
            />
          </div>
          <div className="Info">
            <div className="EventInfo">
              <EventInfo event={this.state.selectedEvent} />
            </div>
            <div className="PatientInfo">
              <PatientInfo />
            </div>
            <div className="DeleteEventButton">
              <Button onClick={this.deleteAppointment}>Usuń wizytę</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
