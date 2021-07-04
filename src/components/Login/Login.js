import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './Login.styles';

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [typedUsername, setTypedUsername] = useState('');
  const [typedPassword, setTypedPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [typedEmail, setTypedEmail] = useState('');
  const [open, setOpen] = React.useState(false);

  const sendMail = () => {
    if (typedEmail) {
      textFieldClear();
      handleClose();
      window.alert('Mail sent! Check your mail box');
    } else {
      window.alert('Email field cannot be blank!');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const textFieldClear = () => {
    setTypedEmail('');
  };

  const handleSubmit = () => {
    history.push('/appointments');
  };

  return (
    <div>
      <Paper elevation={4} className={classes.loginPaper}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <h2>Sign In</h2>
          <TextField
            label="Username"
            placeholder="Enter username"
            type="username"
            fullWidth
            className={classes.loginTextField}
            onChange={({ target: { value } }) => {
              setTypedUsername(value);
            }}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
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
            Sign in
          </Button>

          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
          />
          <Typography>
            <Link onClick={handleClickOpen}>Forgot password?</Link>
          </Typography>
          <Typography>
            {' '}
            Do you have an account?<Link href="/register"> Sign Up</Link>
          </Typography>
          {isError ? (
            <Alert
              severity="error"
              className={classes.errorMessage}
              onClose={() => {
                setIsError(false);
              }}
            >
              Wrong username or password Please try again
            </Alert>
          ) : null}
        </Grid>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please type an e-mail address associated with your account
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            value={typedEmail}
            fullWidth
            onChange={({ target: { value } }) => {
              setTypedEmail(value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => sendMail()} color="primary">
            Send
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
