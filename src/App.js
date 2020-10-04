import React, { useEffect, useState, Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Calbar from "./components/Calbar/Calbar";
import EventInfo from "./components/EventInfo/EventInfo";
import PatientInfo from "./components/PatientInfo/PatientInfo";
import { Button } from "./components/Button";

import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        id: "123",
        startDate: moment().toDate(),
        endDate: moment().toDate(),
        title: "Wizyta kontrolna",
        patient: "Ethan Jones",
      },
    };
    this.handleEventClick = this.handleEventClick.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
  }

  handleEventClick = (event) => {
    console.log(event);
    this.setState({
      event: event,
    });
  };

  deleteAppointment = () => {};

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
            />
          </div>
          <div className="Info">
            <div className="EventInfo">
              <EventInfo event={this.state.event} />
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
