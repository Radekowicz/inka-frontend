import {
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import useStyles from "./Register.styles";
import { registerUser } from "../../requestsService/user";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your first name")
    .required("First name is required"),
  lastName: yup
    .string("Enter your last name")
    .required("Last name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const user = {
        role: "doctor",
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };

      const response = await registerUser(user);
      if (response?.status === 200) {
        history.push("/login");
      } else {
        setError("This email address is already being used");
      }
    },
  });

  return (
    <div>
      <Paper elevation={4} className={classes.registerPaper}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <h2>Zarejestruj się</h2>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="Imię"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              className={classes.registerTextField}
            />

            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Nazwisko"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              className={classes.registerTextField}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              className={classes.registerTextField}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Hasło"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              className={classes.registerTextField}
            />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              className={classes.registerButton}
            >
              Zarejestruj się
            </Button>
          </form>
          <Typography>
            {" "}
            Już masz konto?<Link href="/login"> Zaloguj się</Link>
          </Typography>
        </Grid>
        {error ? (
          <Alert
            severity="error"
            className={classes.errorMessage}
            onClose={() => {
              setError("");
            }}
          >
            {error}
          </Alert>
        ) : null}
      </Paper>
    </div>
  );
}
