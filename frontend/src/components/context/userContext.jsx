import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { newWorkoutContext } from "./newWorkoutContext.jsx";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setIsNewWorkout } = useContext(newWorkoutContext);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth-check", {
          method: "GET",
          credentials: "include",
        });
        console.log(response);
        if (response.ok) {
          const userData = await response.json();
          setUser({
            userName: userData.userName,
            userID: userData.userID
          });
          setIsLoggedIn(true);
          navigate('/home')
        } else {
          setUser(null);
          navigate("/");
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

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
