import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  //History Object
  const history = useHistory();

  //Authetication Context
  const authCtx = useContext(AuthContext);

  //Is Logged State
  const isLoggedIn = authCtx.isLoggedIn;

  //LogOut Handler
  const logoutHandler = () => {
    authCtx.logout();
    // redirect the user to Login
    history.replace("/auth");
  };

  return (
    <header className={classes.header}>
      {/*LOGO */}
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      {/*NAVIGATION */}
      <nav>
        <ul>
          {/*AUTHENTICATION PAGE */}
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {/*PROFILE PAGE */}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {/*LOGOUT BUTTON */}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
