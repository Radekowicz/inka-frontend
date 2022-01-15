import React from "react";
import EditAppointmentTypes from "../../components/EditAppointmentTypes/EditAppointmentTypes";
import PostponeAppointment from "../../components/PostponeAppointment/PostponeAppointment";
import useStyles from "./SettingsPage.styles";

export default function SettingsPage() {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <EditAppointmentTypes />
      <PostponeAppointment />
    </div>
  );
}
