import React, { Component } from "react";
import "./Toolbar.css";
import { ToolItems } from "./ToolItems";

class Toolbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0
    }
  }

  handleClick = (index) => {
    this.setState({ activeItemIndex: index});
  };

  render() {
    return (
      <div>
        <ul className="tool-menu">
          {ToolItems.map((item, index) => {
            return (
              <li
                key={index}
                className={index === this.state.activeItemIndex ? "tool-links-clicked" : "tool-links"}
                onClick={() => this.handleClick(index)}
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Toolbar;
