import React, { Component } from "react";
import "./MyEvent.css";

class MyEvent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="event">
        <div>{this.props.event.title}</div>
        <div>{this.props.event.name}</div>
      </div>
    );
  }
}

export default MyEvent;
