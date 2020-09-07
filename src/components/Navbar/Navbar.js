import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          Denti
          {/* <i className="fas fa-tooth"></i> */}
        </h1>
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
