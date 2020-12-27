import React, { Component } from "react";
import "./Toolbar.css";
import { ToolItems } from "./ToolItems";
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';


class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: ToolItems.findIndex(item => item.url === this.props.location.pathname),
    };
  }

  handleClick = (index) => {
    this.setState({ activeItemIndex: index });
  };

  render() {
    return (
      <div>
        <ul className="tool-menu">
          {ToolItems.map((item, index) => {
            return (
              <Link
                to={item.url}
                className={
                  index === this.state.activeItemIndex
                    ? "tool-links-clicked"
                    : "tool-links"
                }
              >
                <li key={index} onClick={() => this.handleClick(index)}>
                  {item.title}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(Toolbar);
