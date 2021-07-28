import { useState } from "react";

const useInput = (validateValue) => {
  //States
  const [enteredValue, setEnteredValue] = useState("");
  const [IsTouched, setIsTouched] = useState(false);

  //Validators
  const isValid = validateValue(enteredValue);
  const hasErrors = IsTouched && !isValid;

  //Input Handler
  const inputChangedHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  //Blur Handler
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  //Reset
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid,
    hasErrors,
    inputChangedHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;