import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { Navbar, Nav, NavItem, Form, Button } from 'react-bootstrap';
import { UserContext } from "../../contexts/UserContext"
import './Login.css'


function Login() {

    const [typedNickname, setTypedNickname] = useState()
    const [typedPassword, setTypedPassword] = useState()
    const [failedLogin, setFailedLogin] = useState(false)
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
            else
                setFailedLogin(true);
        })
    }

    return (
        <div>
            {failedLogin &&
                <div className="divFailedLogin">
                    Nie udało się zalogować. Spróbuj ponownie!
                </div>
            }
            <div className="form">
                <h1>Zaloguj się</h1>
                <form onSubmit={onFormSubmit}>
                <div controlId="formBasicEmail">
                    <label>Nazwa użytkownika</label>
                    <input 
                    type="text" 
                    name="username"
                    placeholder="Login"
                    onChange={({target:{value}}) => {
                        setTypedNickname(value)
                    }}/>
                </div>

                <div controlId="formBasicPassword">
                    <label>Hasło</label>
                    <input 
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
