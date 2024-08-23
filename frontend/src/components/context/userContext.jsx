import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children})=> {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (userData) => {
        const {userName, _id} = userData
        setUser({
          userName: userName,
          userID: _id  
        });
        setIsLoggedIn(true);

    }

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);

    }

   return <UserContext.Provider value={{user, isLoggedIn, login, logout}}>{children}</UserContext.Provider>

}