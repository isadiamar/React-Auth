import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      {/*Logo*/}
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      {/*Navigation*/}
      <nav>
        <ul>
          {/*Auth Page*/}
          <li>
            <Link to="/auth">Login</Link>
          </li>
          {/*Profile Page*/}
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
