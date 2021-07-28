import React, { useState } from "react";

// Auth Context
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// Context Provider
export const AuthContextProvider = (props) => {
  //Token State Value
  const [token, setToken] = useState(null);

  //Logged User - No Token No user logged
  const userIsLoggedIn = !!token;

  //Login Handler
  const loginHandler = (token) => {
    setToken(token);
  };

  //Logout Handler
  const logoutHandler = () => {
    setToken(null);
  };

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
