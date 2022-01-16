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
  firstName: yup.string("Wprowadź swoje imię").required("Imię jest wymagane"),
  lastName: yup
    .string("Wprowadź swoje nazwisko")
    .required("Nazwisko jest wymagane"),
  email: yup
    .string("Wprowadź swój email")
    .email("Wprowadź poprawny email")
    .required("Email jest wymagany"),
  password: yup
    .string("Wprowadź swoje hasło")
    .min(8, "Hasło powinno mieć minimum 8 znaków")
    .required("Hasło jest wymagane"),
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
        setError("Ten email jest zajęty");
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
