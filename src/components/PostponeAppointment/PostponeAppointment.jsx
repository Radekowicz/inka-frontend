import React, { useState, useEffect } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { postponeAppointments } from '../../requestsService/appointments';
import useStyles from './PostponeAppointment.styles';

export default function PostponeAppointment() {
  const classes = useStyles();
  const [days, setDays] = useState(0);

  useEffect(() => {}, []);

  const handleConfirmButton = () => {
    if (days > 0) {
      postponeAppointments(days, new Date().toISOString());
      setDays(0);
    }
  };

  return (
    <Paper className={classes.root}>
      <Typography>Przesuń wszystkie wizyty o {days} dni</Typography>
      <TextField
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
        variant="outlined"
        fullWidth
        // className={classes.textField}
        value={days}
        onChange={({ target: { value } }) => {
          setDays(value);
        }}
      />
      <Button variant="contained" color="primary" onClick={handleConfirmButton}>
        Zatwierdź
      </Button>
    </Paper>
  );
}
