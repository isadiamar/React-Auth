import { useState, useContext } from "react";
import useInput from "./../hooks/use-input";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import { authentication } from "./../../api-calls";

const AuthForm = () => {
  //login State
  const [isLogin, setIsLogin] = useState(true);

  //Auth Context
  const authCtx = useContext(AuthContext);

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

    //Authentication Function
    authentication(url, enteredEmail, enteredPassword)
      .then((res) => {
        //SUCCESS - > return the data in JSON
        if (res.ok) {
          const data = res.json();
          return data;
        }
        //ERROR - throw a message error
        else {
          const data = res.json();
          let errorMessage = "Authentication failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }
      })
      .then(
        //If OK -> Log the user
        (data) => authCtx.login(data.idToken)
      )
      .catch((err) => {
        //If no OK - > alert with the error
        alert(err.message);
      });

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
        {/*Email Input*/}
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

        {/*Password Input*/}
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
