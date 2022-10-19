import { useState } from "react"
import React from "react"
const AuthContext=React.createContext({
    token:'',
    isLoggedIn: false,
    login: (token)=>{},
    logout: ()=>{}
})

const remainingTime=(expirationTime)=>{
    const adjustedExpiraitonTime=new Date(expirationTime).getTime()
    const currentTime=new Date().getTime()
    const remaining=adjustedExpiraitonTime-currentTime
    return remaining
}

export const AuthContextProvider=props=>{
    const initialToken=localStorage.getItem('token')
const [token,setToken]=useState(initialToken)
const userIsLoggedIn=!!token
const loginHandler=(token, expirationTime)=>{
    setToken(token)
    localStorage.setItem('token',token)
    const remaining= remainingTime(expirationTime)
    setTimeout(logoutHandler,remaining);
}
const logoutHandler=()=>{
    setToken(null)
    localStorage.removeItem('token')
}

const contextValue={
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
}

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
