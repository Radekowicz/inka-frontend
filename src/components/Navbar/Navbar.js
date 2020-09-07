import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";
import { Button } from "../Button";

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

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
            <i class="fas fa-user-circle"></i>
          </li>
          <li className="nav-links">
            <i class="fas fa-bell"></i>
          </li>
        </ul>
        {/* <Button>Sign Up</Button> */}
      </nav>
    );
  }
}

export default Navbar;
