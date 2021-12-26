import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import useStyles from "./Appbar.styles";
import { UserContext } from "../../contexts/UserContext";

export default function Appbar() {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div position="fixed" className={classes.appBar}>
        <Navbar />
      </div>
      {!!user && <Sidebar />}
    </div>
  );
}
