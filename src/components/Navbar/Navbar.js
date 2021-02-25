import React, { useState, useContext, useEffect } from "react";
import "./Navbar.css";
import Toolbar from "./Toolbar/Toolbar";
import { Button } from "../Button/Button"
import { LoginContext } from '../../contexts/LoginContext';
import { Link } from 'react-router-dom';


function Navbar() {

  const [doctorName, setDoctorName] = useState("dupa")
  const { logged, setLogged, user, setUser } = useContext(LoginContext)

  const getDoctorName = async (username) => {
    const response = await fetch(`/api/doctors/${username}`)
    const data = await response.json();
    setDoctorName(data[0].firstName + " " + data[0].lastName)
    console.log(data[0].firstName + " " + data[0].lastName)
    return(data[0].firstName + " " + data[0].lastName)
  }

  useEffect(() => {
    getDoctorName(user)
  }, []);

  return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">Denti</h1>
        <Toolbar />

        <div>
                {logged === false 
                ? <Link to="/login"><Button>Zaloguj się</Button></Link>
                : <Link to="/user">
                    <div className="nav-links">
                      <h className="nav-user">{doctorName}</h>
                      <i className="fas fa-user-circle"></i>
                    </div>
                  </Link>
                }
        </div>

      </nav>
    );
}

export default Navbar;
