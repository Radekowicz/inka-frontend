import {
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./Login.styles";
import { loginUser } from "../../requestsService/user";
import { UserContext } from "../../contexts/UserContext";
import { saveUserToLocalStorage } from "../../localStorage/user";

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [typedEmail, setTypedEmail] = useState("m.jane@gmail.com");
  const [typedPassword, setTypedPassword] = useState("Spiderhrum123");
  const [isError, setIsError] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleSubmit = async () => {
    const response = await loginUser(typedEmail, typedPassword);
    if (response?.status === 200) {
      history.push("/appointments");
      const data = response?.data;
      const user = {
        id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      };

      saveUserToLocalStorage(user);
      setUser(user);
    } else {
      setIsError(true);
    }
  };

  return (
    <Paper elevation={4} className={classes.loginPaper}>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <h2>Zaloguj się</h2>
        <TextField
          label="Email"
          type="email"
          fullWidth
          className={classes.loginTextField}
          onChange={({ target: { value } }) => {
            setTypedEmail(value);
          }}
        />
        <TextField
          label="Hasło"
          type="password"
          fullWidth
          className={classes.loginTextField}
          onChange={({ target: { value } }) => {
            setTypedPassword(value);
          }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          className={classes.loginButton}
          onClick={handleSubmit}
        >
          Zaloguj się
        </Button>
        <Typography>
          {" "}
          Nie masz konta?<Link href="/register"> Zarejestruj się</Link>
        </Typography>
        {isError ? (
          <Alert
            severity="error"
            className={classes.errorMessage}
            onClose={() => {
              setIsError(false);
            }}
          >
            Wrong email or password Please try again
          </Alert>
        ) : null}
      </Grid>
    </Paper>
  );
}
