import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { UserContext } from '../../contexts/UserContext';
import './Navbar.css';

export default function Navbar() {
  const NavbarItems = [
    {
      title: 'Wizyty',
      url: '/appointments',
    },
    {
      title: 'Pacjenci',
      url: '/patients',
    },
    {
      title: 'Ustawienia',
      url: '/settings',
    },
  ];

  const { logged, setLogged, user, setUser } = useContext(UserContext);
  const [userName, setUserName] = useState('dupa');
  const [activeItemIndex, setActiveItemIndex] = useState(
    NavbarItems.findIndex((item) => item.url === window.location.pathname)
  );

  const getUserName = async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    setUserName(data[0].firstName + ' ' + data[0].lastName);
  };

  useEffect(() => {
    getUserName(user);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => setActiveItemIndex(10)}>
        <Link className="navbar-logo-link" to="/">
          Denti
        </Link>
      </div>
      <div className="navbar-items">
        {NavbarItems.map((item, index) => {
          return (
            <Link
              to={item.url}
              className={
                index === activeItemIndex
                  ? 'navbar-item-clicked'
                  : 'navbar-item'
              }
              onClick={() => setActiveItemIndex(index)}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
      <div
        className="navbar-login-username-container"
        onClick={() => setActiveItemIndex(10)}
      >
        {logged === false ? (
          <Link to="/login" className="navbar-login-container">
            Zaloguj się
          </Link>
        ) : (
          <Link to="/user" className="navbar-username-container">
            <div className="nav-user">{userName}</div>
            <i className="fas fa-user-circle"></i>
          </Link>
        )}
      </div>
    </div>
  );
}
