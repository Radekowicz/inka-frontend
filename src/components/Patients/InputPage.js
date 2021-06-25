import React, { useState } from 'react';
import Input from './Input';
import './InputPage.css';

export default function InputPage(props) {
  // const [patient, setPatient] = useState({
  //   firstName: 'a',
  //   lastName: 'b',
  // });
  // const setFirstName = (firstName) => {
  //   this.setState((prevState) => ({
  //     patient: {
  //       ...prevState.patient,
  //       firstName: firstName,
  //     },
  //   }));
  // };
  // const setLastName = (lastName) => {
  //   this.setState((prevState) => ({
  //     patient: {
  //       ...prevState.patient,
  //       lastName: lastName,
  //     },
  //   }));
  // };
  // const getPatient = () => {
  //   this.props.getPatient(this.state.patient);
  // };
  return (
    <div className="InputPage" onChange={this.getPatient}>
      {/* <Input label="Imię" setPatient={this.setFirstName.bind(this)} />
      <Input label="Nazwisko" setPatient={this.setLastName.bind(this)} /> */}
    </div>
  );
}
