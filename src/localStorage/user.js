const saveUserToLocalStorage = (state) => {
  const user = {
    id: state.id,
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
  };
  localStorage.setItem("user", JSON.stringify(user));
};

const loadUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export {
  saveUserToLocalStorage,
  loadUserFromLocalStorage,
  removeUserFromLocalStorage,
};
