import React, { useEffect, useState, useContext } from 'react';
import './Appointments.css';
import Calbar from './Calbar/Calbar';
import EventInfo from './EventInfo/EventInfo';
import PatientInfo from './/PatientInfo/PatientInfo';
// import { Button } from '../Button/Button';
import { Button, Paper } from '@material-ui/core';
import { UserContext } from '../../contexts/UserContext';
import moment from 'moment';

const emptyPatient = {
  id: '',
  firstName: '',
  lastName: '',
  birthdate: Date.now(),
  firstAppointment: Date.now(),
  email: '',
  phoneNumber: '',
  address: '',
};

const emptyEvent = {
  id: '',
  start: moment().toDate(),
  end: moment().toDate(),
  title: '',
  name: '',
  patient: '',
};

export default function Appointments(props) {
  const [selectedEvent, setSelectedEvent] = useState(emptyEvent);
  const [selectedPatient, setSelectedPatient] = useState(emptyPatient);
  const [events, setEvents] = useState([]);
  const [appointmentsTypes, setAppointmentsTypes] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    loadAppointmentsTypes();
    loadPatient();
  }, []);

  useEffect(() => {
    loadPatient();
  }, [selectedEvent]);

  const loadAppointmentsTypes = async () => {
    const response = await fetch(`/api/appointmentsTypes/${user}`);
    const data = await response.json();
    const types = data.map((type) => ({
      id: type._id,
      label: type.label,
      doctor: type.doctor,
      color: type.color,
    }));
    console.log(types);
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
    const response = await fetch('/api/appointments');
    const data = await response.json();
    const appointments = data.map((appointment, index) => ({
      id: appointment._id,
      type: appointment.type.label,
      patient: appointment.patient,
      doctor: appointment.doctor,
      start: new Date(appointment.startDate),
      end: new Date(appointment.endDate),
      name: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
    }));
    setEvents(appointments);
  };

  const deleteAppointment = async () => {
    await fetch(`/api/appointments/${selectedEvent.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    loadAppointments();
  };

  return (
    <div className="App">
      <div className="Menu">
        <div className="Calendar">
          <Paper elevation={2} style={{ padding: 20, margin: 20 }}>
            <Calbar
              handleEventClick={handleEventClick}
              handleDeleteClick={deleteAppointment}
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
            <div className="DeleteEventButton">
              <Button
                variant="contained"
                color="primary"
                onClick={deleteAppointment}
                // disableTouchRipple={true}
              >
                Usuń wizytę
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
