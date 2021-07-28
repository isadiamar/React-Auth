import { useState } from "react";
import useInput from "./../hooks/use-input";
import classes from "./AuthForm.module.css";
import { authentication } from "../../api-calls";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [, setIsLoading] = useState(false);
  //Email Input Hook
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasErrors: emailHasErrors,
    inputChangedHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(
    (value) =>
      value.trim() !== "" && value.includes("@") && value.trim().length > 6
  );

  //Password Input Hook
  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasErrors: passwordHasErrors,
    inputChangedHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== "" && value.trim().length > 6);

  //Form Validator
  let formIsValid = false;
  if (passwordIsValid && emailIsValid) formIsValid = true;

  // Toogle Auth - Login Handler
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  //Submit Handler
  const submitHandler = (event) => {
    event.preventDefault();
    let url;
    //Login Mode
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    //Sign Up Mode
    else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    }
    authentication(url, enteredEmail, enteredPassword);

    //Clear inputs
    resetEmail();
    resetPassword();
  };

  //Email Classes
  let emailForm = `${classes.control} ${
    emailHasErrors ? classes.invalid : ""
  } `;

  //Password Classes
  let passwordForm = `${classes.control} ${
    passwordHasErrors ? classes.invalid : ""
  }`;

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {/*Email*/}
        <div className={emailForm}>
          <label htmlFor="email">Your Email</label>
          <input
            value={enteredEmail}
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
            type="email"
            id="email"
            required
          ></input>
          {emailHasErrors && (
            <p className={classes["error-text"]}>
              The email is not valid. Please, try again!
            </p>
          )}
        </div>
        {/*Password*/}
        <div className={passwordForm}>
          <label htmlFor="password">Your Password</label>
          <input
            value={enteredPassword}
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
            type="password"
            id="password"
            required
          ></input>
          {passwordHasErrors && (
            <p className={classes["error-text"]}>
              The password must have at least 6 characters
            </p>
          )}
        </div>

        {/*Submit Button*/}
        <div className={classes.actions}>
          <button disabled={!formIsValid}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
