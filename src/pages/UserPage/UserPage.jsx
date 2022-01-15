import React, { useContext } from "react";
import { Paper, Typography } from "@material-ui/core";
import { UserContext } from "../../contexts/UserContext";
import useStyles from "./UserPage.styles";

export default function UserPage() {
  const { user } = useContext(UserContext);

  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Paper className={classes.paper}>
        <Typography variant="h6">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="h6">{user.email}</Typography>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h6">Kod gabinetu: {user.officeId}</Typography>
      </Paper>
    </div>
  );
}
