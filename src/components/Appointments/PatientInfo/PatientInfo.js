import React, { Component } from 'react';
import './PatientInfo.css';
import moment from 'moment';
import 'moment/locale/pl';

const Detail = (props) => {
  return (
    <div className="detail">
      <span className="detail-title">{props.title}:</span>
      <span className="detail-info">{props.info}</span>
    </div>
  );
};

export default function PatientInfo(props) {
  const calcAge = (dateString) => {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  };

  return (
    <div className="patient-info">
      <div className="patient">
        <div className="avatar">
          <i className="fas fa-user-circle patient-image" />
        </div>
        <div className="basic-info">
          <div>
            {props.patient.firstName} {props.patient.lastName} (
            {calcAge(props.patient.birthdate)})
          </div>
          <div>
            Rozpoczęcie lecznia:{' '}
            {moment(props.patient.firstAppointment).format('MM/YYYY')}
          </div>
        </div>
      </div>

      <div className="more-info">
        <Detail title="Email" info={props.patient.email} />
        <Detail title="Telefon" info={props.patient.phoneNumber} />
        <Detail title="Adres" info={props.patient.address} />
      </div>
    </div>
  );
}
