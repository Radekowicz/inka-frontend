import React from "react";
import NextAppointment from "../../components/NextAppointment/NextAppointment";
import PatientDetails from "../../components/PatientDetails/PatientDetails";
import PatientAppointments from "../../components/PatientAppointments/PatientAppointments";
import useStyles from "./PatientPage.styles";
import { useParams } from "react-router-dom";

export default function PatientPage() {
  const classes = useStyles();
  const { patientId } = useParams();

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
