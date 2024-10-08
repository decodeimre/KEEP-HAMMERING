import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const server = import.meta.env.VITE_Server;

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await fetch(`${server}/auth-check`, {
          method: "GET",
          credentials: "include",
        });
        console.log(response);
        if (response.ok) {
          const userData = await response.json();
          setUser({
            userName: userData.userName,
            userID: userData.userID,
          });
          setIsLoggedIn(true);
          navigate("/home");
        } else {
          setUser(null);
          navigate("/");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("error during authentication:", error);
      }
    };
    authenticate();
  }, []);

  const login = (userData) => {
    const { userName, _id } = userData;
    setUser({
      userName: userName,
      userID: _id,
    });
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      const response = await fetch(`${server}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      console.log("Error during Logout:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
