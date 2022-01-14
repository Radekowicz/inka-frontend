import React from "react";
import { Typography } from "@material-ui/core";
import "./Opening.css";
import UndrawCalendar from "../../images/undraw_calendar.svg";
import UndrawDoctors from "../../images/undraw_doctors.svg";
import UndrawMedical from "../../images/undraw_medical_research.svg";
import useStyles from "./HomePage.styles";

export default function Opening() {
  const classes = useStyles();

  return (
    <div>
      {/* <Typography variant="h2" className={classes.homepage__title}>
        Denti
      </Typography> */}
      <div className={classes.homepage__cards}>
        <div className={classes.homepage__card}>
          <img
            src={UndrawDoctors}
            alt="UndrawDoctors"
            className={classes.homepage__undraw}
          />
          <Typography variant="h3">Prosta w użyciu</Typography>
        </div>
        <div className={classes.homepage__card}>
          <Typography variant="h3">Funkcjonalna</Typography>
          <img
            src={UndrawCalendar}
            alt="UndrawCalendar"
            className={classes.homepage__undraw}
          />
        </div>
        <div className={classes.homepage__card}>
          <img
            src={UndrawMedical}
            alt="UndrawMedical"
            className={classes.homepage__undraw}
          />
          <Typography variant="h3">Łatwo dostępna</Typography>
        </div>
      </div>
    </div>
  );
}
