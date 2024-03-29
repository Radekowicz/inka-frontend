const axios = require('axios');

const getAppointments = async () => {
  try {
    const response = await axios.get('/api/appointments');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getAppointmentsByPatientId = async (patientId) => {
  try {
    const response = await axios.get(`/api/appointments/${patientId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getAppointmentsByDate = async (date, time) => {
  try {
    const response = await axios.get(
      `/api/appointments?date=${date}&&time=${time}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getAppointment = async (appointmentId) => {
  try {
    const response = await axios.get(`/api/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const postAppointment = async (appointment) => {
  try {
    const response = await axios.post('/api/appointments', appointment);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteAppointment = async (appointmentId) => {
  try {
    const response = await axios.delete(`/api/appointments/${appointmentId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
// by days
const postponeAppointments = async (interval, fromDate) => {
  try {
    const response = await axios.patch(
      `/api/appointments?interval=${interval}&&fromDate=${fromDate}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export {
  getAppointments,
  getAppointmentsByPatientId,
  getAppointmentsByDate,
  getAppointment,
  postAppointment,
  deleteAppointment,
  postponeAppointments,
};
