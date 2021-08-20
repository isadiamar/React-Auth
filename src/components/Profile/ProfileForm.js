import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import { change_password } from "../../api-calls";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  //History Object
  const history = useHistory();

  // Context Hook
  const authCtx = useContext(AuthContext);

  //New Password Ref
  const newPasswordInputRef = useRef();

  //Submit Handler
  const submitHandler = (event) => {
    event.preventDefault();

    //New Password
    const enteredNewPassword = newPasswordInputRef.current.value;

    //Add validation (optional)

    //Change Password Function
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=";
    change_password(url, authCtx.token, enteredNewPassword).then((res) => {
      //Assumption: Always succeeds!
      history.replace("/");
    });
  };

  return (
    // Change Password Form
    <form onSubmit={submitHandler} className={classes.form}>
      {/*Enter Password*/}
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      {/* Change Password Button */}
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
