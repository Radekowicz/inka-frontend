const axios = require("axios");

const getAppointmentsTypes = async () => {
  try {
    const response = await axios.get(`/api/appointmentsTypes`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const postAppointmentType = async (appointmentType) => {
  try {
    const response = await axios.post(
      "/api/appointmentsTypes",
      appointmentType
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteAppointmentType = async (appointmentTypeId) => {
  try {
    const response = await axios.delete(
      `/api/appointmentsTypes/${appointmentTypeId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const patchAppointmentType = async (appointmentTypeId, appointmentType) => {
  try {
    const response = await axios.patch(
      `/api/appointmentsTypes/${appointmentTypeId}`,
      appointmentType
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export {
  getAppointmentsTypes,
  postAppointmentType,
  deleteAppointmentType,
  patchAppointmentType,
};
