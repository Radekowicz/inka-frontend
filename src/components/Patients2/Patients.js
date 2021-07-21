import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { Paper, IconButton } from '@material-ui/core';
import DetailsIcon from '@material-ui/icons/Details';
import SettingsIcon from '@material-ui/icons/Settings';
import { getPatients } from '../../requestsService/Patients';
import moment from 'moment';
import SearchBar from '../SearchBar/SearchBar';
import useStyles from './Patients.styles';

const columns = [
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  {
    field: 'birthdate',
    headerName: 'Birthdate',
    width: 150,
  },
  { field: 'firstAppointment', headerName: 'First Appointment', width: 200 },
  { field: 'email', headerName: 'Email', width: 150 },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    width: 150,
  },
  { field: 'address', headerName: 'Address', width: 150 },
  {
    field: 'settingsField',
    headerName: 'Settings',
    sortable: false,
    width: 70,
    disableClickEventBubbling: true,
    renderCell: (params) => (
      <IconButton onClick={() => console.log(params)}>
        <SettingsIcon />
      </IconButton>
    ),
  },
  {
    field: 'detailsField',
    headerName: 'Details',
    sortable: false,
    width: 70,
    disableClickEventBubbling: true,
    renderCell: (params) => (
      <IconButton onClick={() => {}}>
        <DetailsIcon />
      </IconButton>
    ),
  },
];

export default function Patients() {
  const classes = useStyles();
  const history = useHistory();

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState(null);

  const setPatients = async () => {
    const patients = await getPatients();
    const newPatients = patients.map((patient) => ({
      id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthdate: moment(patient.birthdate).format('DD.MM.YYYY'),
      firstAppointment: moment(patient.firstAppointment).format('DD.MM.YYYY'),
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      address: patient.address,
    }));
    setRows(newPatients);
  };

  const updateFilteredRows = (input) => {
    if (input) {
      const filtered = [...rows].filter((item) =>
        item.firstName.toLowerCase().includes(input.toString().toLowerCase())
      );
      setFilteredRows(filtered);
    } else {
      setFilteredRows(null);
    }
  };

  const onCellClick = (params) => {
    if (params.field === '__check__') return;
    if (params.field === 'settingsField') {
    }
    if (params.field === 'detailsField') {
      history.push(`/patients/${params.row.id}`);
    }
  };

  useEffect(() => {
    setPatients();
  }, []);

  return (
    <div className={classes.root}>
      <SearchBar
        updateFilteredData={updateFilteredRows}
        placeholder="Search"
        className={classes.searchBar}
      />
      <Paper elevation={2} className={classes.table}>
        <DataGrid
          rows={filteredRows ? filteredRows : rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick={true}
          onCellClick={onCellClick}
        />
      </Paper>
    </div>
  );
}
