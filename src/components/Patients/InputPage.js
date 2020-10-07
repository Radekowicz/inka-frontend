import React, { Component } from "react";
import Input from "./Input";
import "./InputPage.css";

class InputPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: {
        firstName: "a",
        lastName: "b",
      },
    };
  }

  setFirstName = (firstName) => {
    this.setState((prevState) => ({
      patient: {
        ...prevState.patient,
        firstName: firstName,
      },
    }));
  };

  setLastName = (lastName) => {
    this.setState((prevState) => ({
      patient: {
        ...prevState.patient,
        lastName: lastName,
      },
    }));
  };

  getPatient = () => {
    this.props.getPatient(this.state.patient);
  };

  render() {
    return (
      <div className="InputPage" onChange={this.getPatient}>
        <Input label="Imię" setPatient={this.setFirstName.bind(this)} />
        <Input label="Nazwisko" setPatient={this.setLastName.bind(this)} />
      </div>
    );
  }
}
export default InputPage;
