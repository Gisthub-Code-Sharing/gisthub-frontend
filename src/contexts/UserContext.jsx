import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie';

const UserContext = React.createContext([{}, () => {}])

console.log("INTIAL COOKIE", Cookies.get('auth_gisthub'))
const initialUser = Cookies.get('auth_gisthub')
let initialState = {user: initialUser ? JSON.parse(initialUser) : undefined};
const UserProvider = props => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if(state.user){
            console.log("NEW STATE", state)
            const inOneWeek = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7));
            Cookies.set('auth_gisthub', JSON.stringify(state.user), {expires: inOneWeek});
        }
    }, [state])
     
    return (
        <UserContext.Provider value={[state, setState]}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}