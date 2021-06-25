import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { UserContext } from '../../contexts/UserContext';
import './Login.css';

export default function Login() {
  const [typedNickname, setTypedNickname] = useState();
  const [typedPassword, setTypedPassword] = useState();
  const history = useHistory();
  const { user, setUser, setLogged } = useContext(UserContext);

  const checkLogin = async () => {
    return true;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    checkLogin().then((isCorrect) => {
      if (isCorrect === true) {
        setLogged(true);
        setUser(user);
        history.push('/appointments');
      }
    });
  };

  return (
    <div>
      <div className="form">
        <h1 className="login-title">Zaloguj się</h1>
        <form onSubmit={onFormSubmit}>
          <div className="login-element">
            <label className="login-label">Nazwa użytkownika</label>
            <input
              className="login-input"
              type="text"
              placeholder="Login"
              onChange={({ target: { value } }) => {
                setTypedNickname(value);
              }}
            />
          </div>

          <div className="login-element">
            <label className="login-label">Hasło</label>
            <input
              className="login-input"
              type="password"
              placeholder="Hasło"
              onChange={({ target: { value } }) => {
                setTypedPassword(value);
              }}
            />
          </div>
          <Button variant="contained" color="primary" onClick={onFormSubmit}>
            Zaloguj
          </Button>
        </form>
      </div>
    </div>
  );
}
