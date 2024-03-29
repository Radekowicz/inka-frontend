import React, { useEffect, useState } from "react";
import "./Appointments.css";
import Calbar from "../../components/Calbar/Calbar";
import EventInfo from "../../components/EventInfo/EventInfo";
import PatientInfo from "../../components/PatientInfo/PatientInfo";
import { Button, Paper } from "@material-ui/core";
import moment from "moment";
import {
  getAppointments,
  deleteAppointment,
} from "../../requestsService/appointments";
import { getAppointmentsTypes } from "../../requestsService/appointmentsTypes";
import { useHistory } from "react-router-dom";

const emptyPatient = {
  id: "",
  firstName: "",
  lastName: "",
  birthdate: Date.now(),
  firstAppointment: Date.now(),
  email: "",
  phoneNumber: "",
  address: "",
};

const emptyEvent = {
  id: "",
  start: moment().toDate(),
  end: moment().toDate(),
  title: "",
  name: "",
  patient: "",
};

export default function Appointments(props) {
  const [selectedEvent, setSelectedEvent] = useState(emptyEvent);
  const [selectedPatient, setSelectedPatient] = useState(emptyPatient);
  const [events, setEvents] = useState([]);
  const [appointmentsTypes, setAppointmentsTypes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    loadAppointmentsTypes();
    loadPatient();
  }, []);

  useEffect(() => {
    loadPatient();
  }, [selectedEvent]);

  const loadAppointmentsTypes = async () => {
    const data = await getAppointmentsTypes();
    const types = data?.map((type) => ({
      id: type._id,
      label: type.label,
      doctor: type.doctor,
      color: type.color,
    }));
    setAppointmentsTypes(types);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const loadPatient = async () => {
    if (selectedEvent) {
      const patient = selectedEvent.patient;
      setSelectedPatient({
        id: patient._id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        birthdate: patient.birthdate,
        firstAppointment: patient.firstAppointment,
        email: patient.email,
        phoneNumber: patient.phoneNumber,
        address: patient.address,
      });
    }
  };

  const loadAppointments = async () => {
    const data = await getAppointments();
    const appointments = data?.map((appointment) => ({
      id: appointment._id,
      type: appointment.type.label,
      patient: appointment.patient,
      doctor: appointment.doctor,
      start: new Date(appointment.startDate),
      end: new Date(appointment.endDate),
      name: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
    }));
    setEvents(appointments ? appointments : []);
  };

  const handleDeleteAppointment = async () => {
    await deleteAppointment(selectedEvent.id);
    loadAppointments();
  };

  const handleGoToAppointments = () => {
    history.push(`patients/${selectedPatient.id}`);
  };

  return (
    <div className="App">
      <div className="Menu">
        <div className="Calendar">
          <Paper elevation={2} style={{ padding: 20, margin: 20 }}>
            <Calbar
              handleEventClick={handleEventClick}
              handleDeleteClick={handleDeleteAppointment}
              options={appointmentsTypes}
              loadAppointments={loadAppointments}
              events={events}
            />
          </Paper>
        </div>
        {selectedPatient.id ? (
          <div className="Info" style={{ margin: 10 }}>
            <div className="PatientInfo">
              <PatientInfo patient={selectedPatient} />
            </div>
            <div className="EventInfo">
              <EventInfo event={selectedEvent} />
            </div>
            <div className="EventButtons">
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteAppointment}
                // disableTouchRipple={true}
              >
                Usuń wizytę
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGoToAppointments}
              >
                Wszystkie wizyty
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
