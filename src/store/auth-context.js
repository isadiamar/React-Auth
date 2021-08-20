import React, { useState, useEffect, useCallback } from "react";
import {
  calculatingRemainingTime,
  retrieveStoredToken,
} from "../helpers/helper-functions";

//Global Variable
let logoutTimer;

// Auth Context
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// Context Provider
export const AuthContextProvider = (props) => {
  //Initial Token (saved in the browser)
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  //Token State Value
  const [token, setToken] = useState(initialToken);

  //Logged User - No Token == No user logged
  const userIsLoggedIn = !!token;

  //Logout Handler
  const logoutHandler = useCallback(() => {
    setToken(null);

    //Remove the State from the browser
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    //Clear the timer if it's set
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  //Login Handler
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    //Save the states in the browser
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    //Calculate the remaining time
    const remainingTime = calculatingRemainingTime(expirationTime);

    //LogOut once the expiration time is over
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  // Side Effects Hook
  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  //Provider Value
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
