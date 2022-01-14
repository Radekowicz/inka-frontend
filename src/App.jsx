import React from "react";
import "./App.css";
import Appointments from "./pages/Appointments/Appointments";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ContextProvider from "./contexts/UserContext";
import HomePage from "./pages/HomePage/HomePage";
import Appbar from "./components/Appbar/Appbar";
import Toolbar from "@material-ui/core/Toolbar";
import Patients from "./pages/Patients/Patients";
import PatientPage from "./pages/PatientPage/PatientPage";
import useStyles from "./App.styles";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";

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
              <Route exact path="/appointments">
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              </Route>
              <Route exact path="/patients/:patientId">
                <ProtectedRoute>
                  <PatientPage />
                </ProtectedRoute>
              </Route>
              <Route exact path="/patients">
                <ProtectedRoute>
                  <Patients />
                </ProtectedRoute>
              </Route>
              <Route exact path="/settings">
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              </Route>
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </Router>
    </ContextProvider>
  );
}
