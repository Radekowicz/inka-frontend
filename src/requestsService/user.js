const axios = require("axios");

const registerUser = async (user) => {
  try {
    await axios.post("/api/users/register", user);
  } catch (error) {
    console.error(error);
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/api/users/auth", {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const logoutUser = async () => {
  try {
    const response = await axios.post("/api/users/logout");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export { registerUser, loginUser, logoutUser };
