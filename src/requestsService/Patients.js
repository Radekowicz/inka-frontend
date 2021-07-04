const axios = require('axios');

const getPatients = async () => {
  try {
    const response = await axios.get('/api/patients');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getPatients };
