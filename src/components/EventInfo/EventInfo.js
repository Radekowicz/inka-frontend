import React, { Component } from "react";
import "./EventInfo.css";

class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        start: "asdas",
        end: "asdasd",
        title: "asdasd",
      },
    };
  }

  handleEventClick = (event) => {
    EventInfo.setState({
      title: event.title,
    });
  };

  render() {
    return (
      <div className="EventInfo">
        <h1>{this.state.event.title}</h1>
      </div>
    );
  }
}

export default EventInfo;
