import React, { useState, useEffect, useContext } from 'react';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getAppointmentsTypes } from '../../requestsService/appointmentsTypes';
import { getPatient, patchPatient } from '../../requestsService/patients';
import { UserContext } from '../../contexts/UserContext';
import useStyles from './NextAppointment.styles';

export default function NextAppointment({ patientId }) {
  const classes = useStyles();
  const [appointmentsTypes, setAppointmentsTypes] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    loadAppointmentsTypes();
  }, []);

  const loadAppointmentsTypes = async () => {
    const data = await getAppointmentsTypes(user);
    setAppointmentsTypes(data);
  };

  const updatePatient = async () => {
    if (selectedType) {
      const updatedPatient = await getPatient(patientId);
      updatedPatient.appointmentType = selectedType._id;
      await patchPatient(patientId, updatedPatient);
    }
  };

  const handleConfirmButton = () => {
    updatePatient();
  };

  return (
    <Paper className={classes.root}>
      <Autocomplete
        options={appointmentsTypes}
        getOptionLabel={(option) => option.label}
        style={{ width: 300 }}
        onChange={(event, newValue) => setSelectedType(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Wybierz następną wizytę "
            variant="outlined"
          />
        )}
      />
      <Button variant="contained" color="primary" onClick={handleConfirmButton}>
        Zatwierdź
      </Button>
    </Paper>
  );
}
