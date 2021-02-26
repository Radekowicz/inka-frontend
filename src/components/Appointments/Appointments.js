import React, { useEffect, useState, Component } from "react";
import "./Appointments.css";
import Calbar from "./Calbar/Calbar";
import EventInfo from "./EventInfo/EventInfo";
import PatientInfo from ".//PatientInfo/PatientInfo";
import { Button } from "../Button/Button";
import Options from "../../constants/Options"

import moment from "moment";



class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: {
        id: "123",
        start: moment().toDate(),
        end: moment().toDate(),
        title: "Wizyta kontrolna",
        name: "Ethan Jones",
        patient: null,
      },
      selectedPatient: {
        id: "123",
        firstName: "Jon",
        lastName: "Snow",
        birthdate: Date.now(),
        firstAppointment: Date.now(),
        email: "bla@.com",
        phoneNumber: "123456789",
        address: "Asa",
      },
      events: [],
    };
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  handleEventClick = (event) => {
    this.setState(
      {
        selectedEvent: event,
      },
      () => {
        this.loadPatient();
      }
    );
  };

  loadPatient = async () => {
    const selectedEvent = this.state.selectedEvent;
    if (selectedEvent) {
      const patient = selectedEvent.patient;
      this.setState({
        selectedPatient: {
          id: patient._id,
          firstName: patient.firstName,
          lastName: patient.lastName,
          birthdate: patient.birthdate,
          firstAppointment: patient.firstAppointment,
          email: patient.email,
          phoneNumber: patient.phoneNumber,
          address: patient.address,
        },
      });
    }
  };

  loadAppointments = async () => {
    const response = await fetch("/api/appointments");
    const data = await response.json();
    const appointments = data.map((appointment, index) => ({
      id: appointment._id,
      start: new Date(appointment.startDate),
      end: new Date(appointment.endDate),
      //title: Options.find((x) => x.value === appointment.title).label,
      title: "dua",
      name: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
      patient: appointment.patient,
    }));
    this.setState({ events: appointments });
  };

  deleteAppointment = async () => {
    const selectedEvent = this.state.selectedEvent;

    await fetch(`/api/appointments/${selectedEvent.id}`, {
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
        <div className="Menu">
          <div className="Calendar">
            <Calbar
              handleEventClick={this.handleEventClick}
              handleDeleteClick={this.deleteAppointment}
              options={Options}
              loadAppointments={this.loadAppointments}
              events={this.state.events}
            />
          </div>
          <div className="Info">
            <div className="PatientInfo">
              <PatientInfo patient={this.state.selectedPatient} />
            </div>
            <div className="EventInfo">
              <EventInfo event={this.state.selectedEvent} />
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

export default Appointments;
