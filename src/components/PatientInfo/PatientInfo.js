import React, { Component } from "react";
import "./PatientInfo.css";

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

  render() {
    return (
      <div className="patient-info">
        <div className="patient">
          <div className="avatar">
            <i className="fas fa-user-circle" />
          </div>
          <div className="basic-info">
            <div>Karen Marks (30)</div>
            <div>Rozpoczęcie lecznia: 22.03.2019</div>
          </div>
        </div>

        <div className="more-info">
          <Detail title="Email" info="k.marks@gmail.com" />
          <Detail title="Telefon" info="603241826" />
          <Detail title="Adres" info="Piastowska 13B" />
        </div>
      </div>
    );
  }
}

export default PatientInfo;
