import React, { useState, createContext } from "react";
import { loadUserFromLocalStorage } from "../localStorage/user";
export const UserContext = createContext();

export default function ContextProvider(props) {
  const [user, setUser] = useState(loadUserFromLocalStorage());

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
