import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Calbar from "./components/Calbar/Calbar";
import EventInfo from "./components/EventInfo/EventInfo";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Calendar">
        <Calbar />
      </div>
      <div>
        <EventInfo className="EventInfo" />
      </div>
    </div>
  );
}

export default App;
