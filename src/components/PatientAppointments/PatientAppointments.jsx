import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { getAppointmentsByPatientId } from '../../requestsService/appointments';
import moment from 'moment';

const columns = [
  { field: 'appointmentType', title: 'Rodzaj wizyty	' },
  { field: 'date&time', title: 'Data i godzina wizyty' },
  { field: 'appointmentStatus', title: 'Status wizyty' },
];

export default function PatientAppointments({ patientId }) {
  const [appointments, setAppointments] = useState();

  useEffect(() => {
    loadAppointments(patientId);
  }, []);

  const loadAppointments = async (patientId) => {
    const data = await getAppointmentsByPatientId(patientId);
    const appointments = data.map((appointment) => ({
      id: appointment._id,
      type: appointment.type.label,
      patient: appointment.patient,
      doctor: appointment.doctor,
      start: new Date(appointment.startDate),
      end: new Date(appointment.endDate),
      name: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
    }));
    setAppointments(appointments);
  };

  const formatDate = (date) => {
    return `${moment(date).format(' DD-MM-YYYY').toLocaleString()} ${moment(
      date
    )
      .format(' hh:mm')
      .toLocaleString()}`;
  };

  return (
    <Paper>
      <Table bordered hover>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field}>
                <b>{column.title}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments?.map((appointment) => (
            <TableRow>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>{formatDate(appointment.start)}</TableCell>
              <TableCell>
                <span
                  style={{
                    backgroundColor: 'lightgreen',
                    color: 'white',
                    padding: 7,
                    borderRadius: 10,
                  }}
                >
                  Potwierdzona
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
