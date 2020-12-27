import React, { Component } from "react";
import "./PatientInfo.css";
import moment from "moment";
import "moment/locale/pl";

const Detail = (props) => {
  return (
    <div className="detail">
      <span className="detail-title">{props.title}:</span>
      <span className="detail-info">{props.info}</span>
    </div>
  );
};

class PatientInfo extends Component {
  constructor(props) {
    super(props);
  }

  calcAge(dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }

  render() {
    return (
      <div className="patient-info">
        <div className="patient">
          <div className="avatar">
            <i className="fas fa-user-circle patient-image" />
          </div>
          <div className="basic-info">
            <div>
              {this.props.patient.firstName} {this.props.patient.lastName} (
              {this.calcAge(this.props.patient.birthdate)})
            </div>
            <div>
              Rozpoczęcie lecznia:{" "}
              {moment(this.props.patient.firstAppointment).format("MM/YYYY")}
            </div>
          </div>
        </div>

        <div className="more-info">
          <Detail title="Email" info={this.props.patient.email} />
          <Detail title="Telefon" info={this.props.patient.phoneNumber} />
          <Detail title="Adres" info={this.props.patient.address} />
        </div>
      </div>
    );
  }
}

export default PatientInfo;
