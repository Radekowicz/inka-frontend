import React, { useEffect, useState, Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Calbar from "./components/Calbar/Calbar";
import EventInfo from "./components/EventInfo/EventInfo";
import PatientInfo from "./components/PatientInfo/PatientInfo";

import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        start: moment().toDate(),
        end: moment().toDate(),
        title: "Wizyta kontrolna",
        name: "Ethan Jones",
      },
    };
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  handleEventClick = (event) => {
    console.log(event);
    this.setState({
      event: event,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="Navbar">
          <Navbar />
        </div>
        <div className="Menu">
          <div className="Calendar">
            <Calbar handleEventClick={this.handleEventClick} />
          </div>
          <div className="Info">
            <div className="EventInfo">
              <EventInfo event={this.state.event} />
            </div>
            <div className="PatientInfo">
              <PatientInfo />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
