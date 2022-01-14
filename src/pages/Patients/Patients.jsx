import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { Paper, IconButton } from "@material-ui/core";
import DetailsIcon from "@material-ui/icons/Details";
import { getPatients } from "../../requestsService/patients";
import moment from "moment";
import SearchBar from "../../components/SearchBar/SearchBar";
import useStyles from "./Patients.styles";

const columns = [
  {
    field: "detailsField",
    headerName: "Szczegóły",
    sortable: false,
    width: 120,
    disableClickEventBubbling: true,
    renderCell: (params) => (
      <IconButton onClick={() => {}}>
        <DetailsIcon />
      </IconButton>
    ),
  },
  { field: "firstName", headerName: "Imię", width: 150 },
  { field: "lastName", headerName: "Nazwisko", width: 150 },
  {
    field: "birthdate",
    headerName: "Data urodzenia",
    width: 180,
  },
  { field: "firstAppointment", headerName: "Pierwsza wizyta", width: 200 },
  { field: "email", headerName: "Email", width: 150 },
  {
    field: "phoneNumber",
    headerName: "Telefon",
    width: 150,
  },
  { field: "address", headerName: "Adres", width: 150 },
];

export default function Patients() {
  const classes = useStyles();
  const history = useHistory();

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState(null);

  const setPatients = async () => {
    const patients = await getPatients();
    const newPatients = patients?.map((patient) => ({
      id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthdate: moment(patient.birthdate).format("DD.MM.YYYY"),
      firstAppointment: moment(patient.firstAppointment).format("DD.MM.YYYY"),
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      address: patient.address,
    }));
    setRows(newPatients ? newPatients : []);
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
    if (params.field === "__check__") return;
    if (params.field === "settingsField") {
    }
    if (params.field === "detailsField") {
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
