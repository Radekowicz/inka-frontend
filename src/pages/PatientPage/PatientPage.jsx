import React from 'react';
import NextAppointment from '../../components/NextAppointment/NextAppointment';
import PatientDetails from '../../components/PatientDetails/PatientDetails';
import PatientAppointments from '../../components/PatientAppointments/PatientAppointments';
import useStyles from './PatientPage.styles';

export default function PatientPage({ match }) {
  const classes = useStyles();
  const patientId = match.params.patientId;

  return (
    <div className={classes.root}>
      <div className={classes.upperContainer}>
        <PatientDetails patientId={patientId} />
        <NextAppointment patientId={patientId} />
      </div>
      <PatientAppointments patientId={patientId} />
    </div>
  );
}
