import React, { Component, Fragment } from "react";
import "./Patients.css";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
import "moment/locale/pl";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Button } from "../Button/Button";
import Popup from "reactjs-popup";
import InputPage from "./InputPage";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";


class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      patient: {
        firstName: "Jon",
        lastName: "Snow",
        birthdate: Date.now(),
        firstAppointment: Date.now(),
        email: "bla@.com",
        phoneNumber: "123456789",
        address: "Asa",
      },
      popupOpen: false,
      input: '',
      filteredPatients: [],
      isExpanded: [false, true, false],
    };
  }

  componentDidMount() {
    this.loadPatients()
  }

  setExpanded = () => {
    let arr = []
    this.state.patients.forEach(element => {
      arr.push(false)
    });
    console.log(arr)
    this.setState({ isExpanded: arr})
  }

  updateInput = async (input) => {
    const filtered = this.state.patients.filter(patient => {
     return patient.firstName.toLowerCase().includes(input.toString().toLowerCase()) || 
     patient.lastName.toLowerCase().includes(input.toString().toLowerCase())
    })
    this.setState({ input: input });
    this.setState({ filteredPatients: filtered });
 }

  loadPatients = async () => {
    const response = await fetch("/patients");
    const data = await response.json();
    const patients = data.map((patient, index) => ({
      id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthdate: moment(patient.birthdate).format("DD.MM.YYYY"),
      firstAppointment: moment(patient.firstAppointment).format("DD.MM.YYYY"),
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      address: patient.address,
    }));
    this.setState({ patients: patients });
    this.setState({ filteredPatients: patients})
  };

  columns = [
    {
      dataField: "firstName",
      text: "FIRST NAME",
    },
    {
      dataField: "lastName",
      text: "LAST NAME",
    },
    {
      dataField: "birthdate",
      text: "BIRTHDATE",
    },
    {
      dataField: "firstAppointment",
      text: "FIRST APPOINTMENT",
    },
    {
      dataField: "email",
      text: "EMAIL",
    },
    {
      dataField: "phoneNumber",
      text: "PHONE NUMBER",
    },
    {
      dataField: "address",
      text: "ADDRESS",
    },
  ];

  addPatient = async () => {
    await fetch(`/patients`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: this.state.patient.firstName,
        lastName: this.state.patient.lastName,
        birthdate: this.state.patient.birthdate,
        firstAppointment: this.state.patient.firstAppointment,
        email: this.state.patient.email,
        phoneNumber: this.state.patient.phoneNumber,
        address: this.state.patient.address,
      }),
    });

    console.log("Patient added"); //TODO: ostatnia z inputu litera jest opozniona
    console.log(this.state.patient);

    this.setState({
      popupOpen: false,
    });
    this.loadPatients();
  };

  getPatient = (patient) => {
    this.setState((prevState) => ({
      patient: {
        ...prevState.patient,
        firstName: patient.firstName,
        lastName: patient.lastName,
      },
    }));
  };

  onRowClick = (index) => {
    var arr = this.state.isExpanded
    arr[index] === true ? arr[index] = false : arr[index] = true
    this.setState({isExpanded: arr})
  }

  Visit = () => {
    return (
    <div className="visit-component">
      <h1>Delate wizyty</h1>
      
    </div>
    )
  }

  render() {
    return (
      <div className="Patients">
        <div className="patients-toolbar">
          <div className="search-bar-container">
            <input className="search-bar"
            key="random1"
            value={this.state.input}
            placeholder={"szukaj..."}
            onChange={({target:{value}}) => this.updateInput(value)}
            />
          </div>
          <div className="popup-btn">
            <Button
              onClick={() => {
                this.setState({ popupOpen: true });
              }}
            >
              Dodaj pacjenta
            </Button>
          </div>
        </div>

        <table className="PatientsTable">
          <thead>
            <tr>
              <td></td>
              {this.columns.map(column => <td className="PatientsTableHeaderCell">{column.text}</td>)}
            </tr>
          </thead>
          <tbody>
            
              {this.state.filteredPatients.map((patient, index) => (
                <Fragment>
                  <tr onClick={() => this.onRowClick(index)}>
                    <td className="PatientsTableCell">
                      {this.state.isExpanded[index] ? <FaAngleDown/> : <FaAngleRight/>}
                    </td>
                    {this.columns.map((column) => <td className="PatientsTableCell">{patient[column.dataField]}</td>)}
                  </tr>
                  {this.state.isExpanded[index] ? <tr><td colspan="8" className="visit-row">{<this.Visit />}</td></tr> : null}
                </Fragment>
              ))}
          </tbody>
        </table>

        

        <div>
          <Popup
            modal
            open={this.state.popupOpen}
            onClose={() => this.setState({ popupOpen: false })}
            contentStyle={{ width: "488px" }}
          >
            <InputPage getPatient={this.getPatient.bind(this)} />
            <Button onClick={this.addPatient}>Dodaj</Button>
          </Popup>
        </div>
      </div>
    );
  }
}

export default Patients;
