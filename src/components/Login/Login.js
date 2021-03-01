import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { Navbar, Nav, NavItem, Form, Button } from 'react-bootstrap';
import { UserContext } from "../../contexts/UserContext"
import './Login.css'


function Login() {

    const [typedNickname, setTypedNickname] = useState()
    const [typedPassword, setTypedPassword] = useState()
    const history = useHistory()
    const { user, setUser, setLogged } = useContext(UserContext)

    const checkLogin = async () => {
        // console.log("check login")
        // const response = await fetch(`/api/users`, {
        //     method: "POST",
        //     headers: {
        //       "Accept": "application/json",
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         nickname: typedNickname,
        //         password: typedPassword
        //     })
        // })
        // if(!(response.status >= 200 && response.status < 300)) {
        //     return false;
        // };
        // const isCorrect = await response.json()
        
        // console.log(isCorrect)
        // return isCorrect
        return true
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        checkLogin().then((isCorrect) => {
            if (isCorrect === true) {
                setLogged(true)
                setUser(user)
                history.push("/appointments");
            }
        })
    }

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
                    onChange={({target:{value}}) => {
                        setTypedNickname(value)
                    }}/>
                </div>

                <div className="login-element">
                    <label className="login-label">Hasło</label>
                    <input
                    className="login-input" 
                    type="password" 
                    placeholder="Hasło"
                    onChange={({target:{value}}) => {
                        setTypedPassword(value)
                    }}/>
                </div>
                <Button onClick={onFormSubmit}>
                    Zaloguj
                </Button>
                </form>
            </div>
        </div>
    )
}

export default Login
