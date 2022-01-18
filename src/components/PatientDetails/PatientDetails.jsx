import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import { getPatient } from "../../requestsService/patients";
import moment from "moment";
import "./PatientDetails.css";

const Detail = (props) => {
  return (
    <div className="patient-page-detail">
      <span className="patient-page-detail-title">{props.title}:</span>
      <span className="patient-page-detail-info">{props.info}</span>
    </div>
  );
};

export default function PatientDetails({ patientId }) {
  const [patient, setPatient] = useState();

  useEffect(() => {
    loadPatient();
  }, []);

  const loadPatient = async () => {
    const patient = await getPatient(patientId);
    const myPatient = {
      id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthdate: moment(patient.birthdate).format("DD.MM.YYYY"),
      firstAppointment: moment(patient.firstAppointment).format("MM/YYYY"),
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      address: patient.address,
    };
    setPatient(myPatient);
  };

  const calcAge = (dateString) => {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  };

  return (
    <div className="patient-page-container">
      <Paper className="patient-page-patient-info">
        <div className="patient-page-patient">
          <div className="patient-page-avatar">
            <i className="fas fa-user-circle patient-page-image" />
          </div>
          <div className="patient-page-basic-info">
            <div className="patient-page-name">
              <b>
                {patient?.firstName} {patient?.lastName}
              </b>{" "}
              ({calcAge(patient?.birthdate)})
            </div>
            <div className="patient-page-basic-info">
              Rozpoczęcie lecznia: {patient?.firstAppointment}
            </div>
          </div>
        </div>
        <div className="patient-page-more-info">
          <Detail title="Email" info={patient?.email} />
          <Detail title="Telefon" info={patient?.phoneNumber} />
        </div>
      </Paper>
    </div>
  );
}
