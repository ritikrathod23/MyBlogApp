import { createContext, useState, useContext } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = (props) =>{
    const [ userSession ,setUserSession ] = useState(false)
    return (
        <AuthContext.Provider value={{userSession, setUserSession}}>
            {props.children}
        </AuthContext.Provider>
    )
}



export const useMyContext = () => useContext(AuthContext);




