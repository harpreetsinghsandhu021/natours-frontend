import { useState, useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

function inputReducer(state, action) {
  if (action.type === "Input") {
    return { isTouched: state.isTouched, value: action.value };
  }

  if (action.type === "Blur") {
    return { isTouched: true, value: state.value };
  }

  if (action.type === "Reset") {
    return { isTouched: false, value: "" };
  }

  return inputReducer;
}

export const useForm = (validate) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const valueIsValid = validate(inputState.value);

  const hasError = !valueIsValid && inputState.isTouched;

  const inputHandler = (e) => {
    dispatch({ type: "Input", value: e.target.value });
  };

  const blurHandler = () => {
    dispatch({ type: "Blur" });
  };

  const resetHandler = () => {
    dispatch({ type: "Reset" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    inputHandler,
    blurHandler,
    resetHandler,
  };
};

export const useFormDynamic = (validate, value) => {
  const initialStateDynamic = {
    value: value,
    isTouched: true,
  };
  const [inputStateDynamic, dispatch] = useReducer(
    inputReducer,
    initialStateDynamic
  );

  const valueIsValid = validate(initialStateDynamic.value);

  const hasError = !valueIsValid && inputStateDynamic.isTouched;

  const inputHandler = (e) => {
    dispatch({ type: "Input", value: e.target.value });
  };

  const blurHandler = () => {
    dispatch({ type: "Blur" });
  };

  const resetHandler = () => {
    dispatch({ type: "Reset" });
  };

  return {
    value: inputStateDynamic.value,
    isValid: valueIsValid,
    hasError,
    inputHandler,
    blurHandler,
    resetHandler,
  };
};
