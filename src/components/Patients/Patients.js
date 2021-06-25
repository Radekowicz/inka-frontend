import React, { useState, useEffect, Fragment } from 'react';
import './Patients.css';
import BootstrapTable from 'react-bootstrap-table-next';
import moment from 'moment';
import 'moment/locale/pl';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button } from '../Button/Button';
import Popup from 'reactjs-popup';
import InputPage from './InputPage';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const emptyPatient = {
  firstName: '',
  lastName: '',
  birthdate: Date.now(),
  firstAppointment: Date.now(),
  email: '',
  phoneNumber: '',
  address: '',
};

export default function Patients(props) {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(emptyPatient);
  const [popupOpen, setPopupOpen] = useState(false);
  const [input, setInput] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadPatients();
    // patients.forEach((patient, index) => {
    //   loadAppointments(patient.id, index);
    // });
  }, []);

  const updateInput = async (input) => {
    const filtered = patients.filter((patient) => {
      return (
        patient.firstName
          .toLowerCase()
          .includes(input.toString().toLowerCase()) ||
        patient.lastName.toLowerCase().includes(input.toString().toLowerCase())
      );
    });
    setInput(input);
    setFilteredPatients(filtered);
  };

  const loadPatients = async () => {
    const response = await fetch('/api/patients');
    const data = await response.json();
    const patients = data.map((patient, index) => ({
      id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthdate: moment(patient.birthdate).format('DD.MM.YYYY'),
      firstAppointment: moment(patient.firstAppointment).format('DD.MM.YYYY'),
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      address: patient.address,
    }));
    setPatients(patients);
    setFilteredPatients(patients);
  };

  const columns = [
    {
      dataField: 'firstName',
      text: 'FIRST NAME',
    },
    {
      dataField: 'lastName',
      text: 'LAST NAME',
    },
    {
      dataField: 'birthdate',
      text: 'BIRTHDATE',
    },
    {
      dataField: 'firstAppointment',
      text: 'FIRST APPOINTMENT',
    },
    {
      dataField: 'email',
      text: 'EMAIL',
    },
    {
      dataField: 'phoneNumber',
      text: 'PHONE NUMBER',
    },
    {
      dataField: 'address',
      text: 'ADDRESS',
    },
  ];

  const addPatient = async () => {
    await fetch(`/api/patients`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: patient.firstName,
        lastName: patient.lastName,
        birthdate: patient.birthdate,
        firstAppointment: patient.firstAppointment,
        email: patient.email,
        phoneNumber: patient.phoneNumber,
        address: patient.address,
      }),
    });

    console.log('Patient added'); //TODO: ostatnia z inputu litera jest opozniona
    console.log(patient);

    setPopupOpen(false);

    loadPatients();
  };

  const getPatient = (newPatient) => {
    setPatient({
      ...patient,
      firstName: newPatient.firstName,
      lastName: newPatient.lastName,
    });
  };

  const onRowClick = (index) => {};

  return (
    <div className="Patients">
      <div className="patients-toolbar">
        <div className="search-bar-container">
          <input
            className="search-bar"
            key="random1"
            value={input}
            placeholder={'szukaj...'}
            onChange={({ target: { value } }) => updateInput(value)}
          />
        </div>
        <div className="popup-btn">
          <Button
            onClick={() => {
              setPopupOpen(true);
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
            {columns.map((column) => (
              <td className="PatientsTableHeaderCell">{column.text}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient, index) => (
            <Fragment>
              <tr onClick={() => onRowClick(index)}>
                <td className="PatientsTableCell">
                  <Link to={`/patients/${patients[index].id}`}>
                    <FaAngleRight />
                  </Link>
                </td>
                {columns.map((column) => (
                  <td className="PatientsTableCell">
                    {patient[column.dataField]}
                  </td>
                ))}
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>

      <div>
        <Popup
          modal
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
          contentStyle={{ width: '488px' }}
        >
          <InputPage getPatient={getPatient.bind(this)} />
          <Button onClick={addPatient}>Dodaj</Button>
        </Popup>
      </div>
    </div>
  );
}
