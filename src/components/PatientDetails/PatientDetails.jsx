import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { getPatient } from '../../requestsService/patients';
import { getAppointmentsByPatientId } from '../../requestsService/appointments';
import moment from 'moment';
import './PatientDetails.css';
import NextAppointment from '../NextAppointment/NextAppointment';

const Detail = (props) => {
  return (
    <div className="patient-page-detail">
      <span className="patient-page-detail-title">{props.title}:</span>
      <span className="patient-page-detail-info">{props.info}</span>
    </div>
  );
};

const Visit = (props) => {
  return (
    <Paper className="visit-component">
      <div>
        <b>{props.appointment.type}</b>
      </div>
      <div>
        Data wizyty:
        {moment(props.appointment.start).format(' DD-MM-YYYY').toLocaleString()}
      </div>
      <div>
        Godzina wizyty:
        {moment(props.appointment.start).format(' hh:mm').toLocaleString()}
      </div>
    </Paper>
  );
};

export default function PatientDetails({ match }) {
  const patientId = match.params.patientId;

  const [patient, setPatient] = useState();
  const [appointments, setAppointments] = useState();

  useEffect(() => {
    loadPatient();
    loadAppointments(patientId);
  }, []);

  const loadPatient = async () => {
    const patient = await getPatient(patientId);
    const myPatient = {
      id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthdate: moment(patient.birthdate).format('DD.MM.YYYY'),
      firstAppointment: moment(patient.firstAppointment).format('MM/YYYY'),
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      address: patient.address,
    };
    setPatient(myPatient);
  };

  const loadAppointments = async (patientId) => {
    const data = await getAppointmentsByPatientId(patientId);
    const appointments = data.map((appointment) => ({
      id: appointment._id,
      type: appointment.type.label,
      patient: appointment.patient,
      doctor: appointment.doctor,
      start: new Date(appointment.startDate),
      end: new Date(appointment.endDate),
      name: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
    }));
    setAppointments(appointments);
  };

  const calcAge = (dateString) => {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  };

  return (
    <div className="patient-page-container">
      <NextAppointment patientId={patientId} />
      <Paper className="patient-page-patient-info">
        <div className="patient-page-patient">
          <div className="patient-page-avatar">
            <i className="fas fa-user-circle patient-page-image" />
          </div>
          <div className="patient-page-basic-info">
            <div>
              {patient?.firstName} {patient?.lastName} (
              {calcAge(patient?.birthdate)})
            </div>
            <div>Rozpoczęcie lecznia: {patient?.firstAppointment}</div>
          </div>
        </div>
        <div className="patient-page-more-info">
          <Detail title="Email" info={patient?.email} />
          <Detail title="Telefon" info={patient?.phoneNumber} />
          <Detail title="Adres" info={patient?.address} />
        </div>
      </Paper>
      <table className="patient-page-table">
        <tr>
          <td colspan="8" className="visit-row">
            {appointments?.map((appointment, index) => (
              <Visit
                key={`${index}-${appointment.type}`}
                appointment={appointment}
              />
            ))}
          </td>
        </tr>
      </table>
    </div>
  );
}
