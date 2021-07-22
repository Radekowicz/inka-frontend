import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export default function ContextProvider(props) {
  const [user, setUser] = useState('6037c39a6e651bf9ddcc1e16');
  const [logged, setLogged] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logged,
        setLogged,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
