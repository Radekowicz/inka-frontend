import React from 'react';
import './App.css';
import Appointments from './components/Appointments/Appointments';
import PatientDetails from './components/PatientDetails/PatientDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Settings from './components/SettingsPage/Settings';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import ContextProvider from './contexts/UserContext';
import HomePage from './components/HomePage/HomePage';
import Appbar from './components/Appbar/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Patients from './components/Patients/Patients';
import useStyles from './App.styles';

export default function App() {
  const classes = useStyles();

  return (
    <ContextProvider>
      <Router>
        <div className={classes.root}>
          <Appbar />
          <main className={classes.content}>
            <Toolbar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/appointments" component={Appointments} />
              <Route
                exact
                path="/patients/:patientId"
                component={PatientDetails}
              />
              <Route exact path="/patients" component={Patients} />
              <Route exact path="/settings" component={Settings} />
            </Switch>
          </main>
        </div>
      </Router>
    </ContextProvider>
  );
}
