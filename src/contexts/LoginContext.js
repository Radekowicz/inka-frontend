import React, {createContext, Component} from 'react';

export const LoginContext = createContext()

export default class ContextProvider extends Component {
    state = { 
        user: "jwatson",
        logged: false,
     }

     setUser = (user) => {
         this.setState({user: user})
     }

     setLogged = (logged) => {
         this.setState({logged: logged})
     }


    render() { 
        return (  
            <LoginContext.Provider value={{...this.state, setUser: this.setUser, setLogged: this.setLogged}}>
                {this.props.children}
            </LoginContext.Provider>
        );
    }
}
 