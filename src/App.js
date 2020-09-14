import React, { useEffect, useState, Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Calbar from "./components/Calbar/Calbar";
import EventInfo from "./components/EventInfo/EventInfo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        start: "asdas",
        end: "asdasd",
        title: "asdasd",
      },
    };
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  handleEventClick = (event) => {
    console.log(event);
    this.setState({
      event: event,
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="Calendar">
          <Calbar handleEventClick={this.handleEventClick} />
        </div>
        <div>
          <EventInfo className="EventInfo" event={this.state.event} />
        </div>
      </div>
    );
  }
}

export default App;
