import React, { Component } from "react";
import "./Navbar.css";
import Toolbar from "../Toolbar/Toolbar";

class Navbar extends Component {
  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">Denti</h1>
        <Toolbar />
        <ul className="nav-menu">
          <li className="nav-links">
            <h className="nav-user">Krzysztof Hołowczyc</h>
            <i className="fas fa-user-circle"></i>
          </li>
          <li className="nav-links">
            <i className="fas fa-bell"></i>
          </li>
        </ul>
        {/* <Button>Sign Up</Button> */}
      </nav>
    );
  }
}

export default Navbar;
