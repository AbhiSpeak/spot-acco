import { children } from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const UserContext = createContext({})

export function UserContextProvider ({children}) {
    const[user, setUser] = useState(null)
    const[ready, SetReady] = useState(false)
    useEffect(() => {
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data)
                SetReady(true)
            })
            
        }
    },[])
    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}