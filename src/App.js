import React, { Component } from "react";
import "./App.css";
import Appointments from "./components/Appointments/Appointments";
import Patients from "./components/Patients/Patients";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="Navbar">
            <Navbar />
          </div>
          <Switch>
            <Route path="/appointmentss" component={Appointments} />
            <Route path="/patientss" component={Patients} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
