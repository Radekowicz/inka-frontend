import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Calbar from "./components/Calbar/Calbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Calbar />
    </div>
  );
}

export default App;
