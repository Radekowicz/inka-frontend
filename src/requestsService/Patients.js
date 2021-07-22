const axios = require('axios');

const getPatients = async () => {
  try {
    const response = await axios.get('/api/patients');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getPatient = async (patientId) => {
  try {
    const response = await axios.get(`/api/patients/${patientId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getPatients, getPatient };
