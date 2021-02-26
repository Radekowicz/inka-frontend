import React, { Component } from "react";
import "./App.css";
import Appointments from "./components/Appointments/Appointments";
import Patients from "./components/Patients/Patients";
import PatientPage from "./components/Patients/PatientPage";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Settings from "./components/SettingsPage/Settings"
import Login from "./components/Login/Login"
import ContextProvider from './contexts/UserContext'


class App extends Component {
  render() {
    return (
      <ContextProvider>
      <Router>
        <div className="App">
          <div className="Navbar">
            <Navbar />
          </div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/appointments" component={Appointments} />
            <Route exact path="/patients/:patientId" component={PatientPage} />
            <Route exact path="/patients" component={Patients} />
            <Route exact path="/settings" component={Settings} />
          </Switch>
        </div> 
      </Router>
      </ContextProvider>
    );
  }
}

export default App;
