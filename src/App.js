import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Toolbar from "./components/Toolbar/Toolbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Toolbar />
    </div>
  );
}

export default App;
