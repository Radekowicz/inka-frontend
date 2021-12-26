import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { logoutUser } from "../../../requestsService/user";
import useStyles from "./Navbar.styles";
import { removeUserFromLocalStorage } from "../../../localStorage/user";

export default function Navbar() {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);

  console.log(user);

  return (
    <AppBar>
      <Toolbar>
        <div className={classes.root}>
          <Typography
            variant="h6"
            className={classes.title}
            to="/"
            component={Link}
            align="left"
          >
            Denti
          </Typography>
          {!user ? (
            <div className={classes.buttons}>
              <Button color="inherit" to="/login" component={Link}>
                Login
              </Button>
              <Button color="inherit" to="/register" component={Link}>
                Register
              </Button>
            </div>
          ) : (
            <div className={classes.buttons}>
              <Button color="inherit" to="/userData" component={Link}>
                Profile
              </Button>
              <Button
                color="inherit"
                to="/"
                component={Link}
                onClick={() => {
                  logoutUser();
                  removeUserFromLocalStorage();
                  setUser(null);
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
