import React, {createContext, Component} from 'react';

export const UserContext = createContext()

export default class ContextProvider extends Component {
    state = { 
        user: "6037c39a6e651bf9ddcc1e16",
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
            <UserContext.Provider value={{...this.state, setUser: this.setUser, setLogged: this.setLogged}}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
 