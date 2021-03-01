import React, { useState, useContext, useEffect } from "react";
import "./Navbar.css";
import Toolbar from "./Toolbar/Toolbar";
import { Button } from "../Button/Button"
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';


function Navbar() {

  const [userName, setUserName] = useState("dupa")
  const { logged, setLogged, user, setUser } = useContext(UserContext)

  const getUserName = async (userId) => {
    const response = await fetch(`/api/users/${userId}`)
    const data = await response.json();
    setUserName(data[0].firstName + " " + data[0].lastName)
    console.log(data[0].firstName + " " + data[0].lastName)
    return(data[0].firstName + " " + data[0].lastName)
  }

  useEffect(() => {
    getUserName(user)
  }, []);

  return (
      <nav className="NavbarItems">
        <div className="navbar-logo">
          <Link className="navbar-logo-link" to="/">Denti</Link>
        </div>
        <Toolbar />
        <div className="login-name-container">
          {logged === false 
          ? <Link to="/login"><Button>Zaloguj się</Button></Link>
          : <Link to="/user">
              <div className="name-container">
                <div className="nav-user">{userName}</div>
                <i className="fas fa-user-circle"></i>
              </div>
            </Link>
          }
        </div>

      </nav>
    );
}

export default Navbar;
