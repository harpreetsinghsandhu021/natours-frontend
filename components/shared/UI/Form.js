import React, { useState, useContext, useRef } from "react";
import classes from "./Form.module.css";
import Modal from "./Modal";
import ImageUpload from "./ImageUpload";
import { AuthContext } from "../context/authContext";
import { useForm, useFormDynamic } from "../hooks/useForm";
import Map from "../components/Map";
import { isEmail, isValidName, isValidText } from "@/utils/validators";

const Form = (props) => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmModal, setConfirmShowModal] = useState(false);
  const [showscsModal, setShowScsModal] = useState(false);
  const [error, setError] = useState();
  const [file, setFile] = useState();
  const [imageOne, setImageOne] = useState();
  const [imageTwo, setImageTwo] = useState();
  const [imageThree, setImageThree] = useState();

  const authCtx = useContext(AuthContext);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputHandler: emailInputHandler,
    blurHandler: emailBlurHandler,
    resetHandler: emailResetHandler,
  } = useForm(isEmail);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputHandler: passwordInputHandler,
    blurHandler: passwordBlurHandler,
    resetHandler: passwordResetHandler,
  } = useForm(isValidText);
  const {
    value: passwordConfirmValue,
    isValid: passwordConfirmIsValid,
    hasError: passwordConfirmHasError,
    inputHandler: passwordConfirmInputHandler,
    blurHandler: passwordConfirmBlurHandler,
    resetHandler: passwordConfirmResetHandler,
  } = useForm(isValidText);
  const {
    value: UsernameValue,
    isValid: UsernameIsValid,
    hasError: UsernameHasError,
    inputHandler: UsernameInputHandler,
    blurHandler: UsernameBlurHandler,
    resetHandler: UsernameResetHandler,
  } = useForm(isValidText);

  const {
    value: tourNameValue,
    isValid: tourNameIsValid,
    hasError: tourNameHasError,
    inputHandler: tourNameInputHandler,
    blurHandler: tourNameBlurHandler,
    resetHandler: tourNameResetHandler,
  } = useForm(isValidName);
  const {
    value: groupSizeValue,
    isValid: groupSizeIsValid,
    hasError: groupSizeHasError,
    inputHandler: groupSizeInputHandler,
    blurHandler: groupSizeBlurHandler,
    resetHandler: groupSizeResetHandler,
  } = useForm(isValidText);
  const {
    value: durationValue,
    isValid: durationIsValid,
    hasError: durationHasError,
    inputHandler: durationInputHandler,
    blurHandler: durationBlurHandler,
    resetHandler: durationResetHandler,
  } = useForm(isValidText);
  const {
    value: difficultyValue,
    isValid: difficultyIsValid,
    hasError: difficultyHasError,
    inputHandler: difficultyInputHandler,
    blurHandler: difficultyBlurHandler,
    resetHandler: difficultyResetHandler,
  } = useForm(isValidText);
  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: priceHasError,
    inputHandler: priceInputHandler,
    blurHandler: priceBlurHandler,
    resetHandler: priceResetHandler,
  } = useForm(isValidText);
  const {
    value: summaryValue,
    isValid: summaryIsValid,
    hasError: summaryHasError,
    inputHandler: summaryInputHandler,
    blurHandler: summaryBlurHandler,
    resetHandler: summaryResetHandler,
  } = useForm(isValidText);
  const {
    value: descValue,
    isValid: descIsValid,
    hasError: descHasError,
    inputHandler: descInputHandler,
    blurHandler: descBlurHandler,
    resetHandler: descResetHandler,
  } = useForm(isValidText);

  async function submitHandler(e) {
    e.preventDefault();

    let res;

    try {
      if (props.login) {
        const sendRequest = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: emailValue,
              password: passwordValue,
            }),
          }
        );

        res = await sendRequest.json();
      } else if (props.signup) {
        const formData = new FormData();

        formData.append("email", emailValue);
        formData.append("password", passwordValue);
        formData.append("name", UsernameValue);
        formData.append("passwordConfirm", passwordConfirmValue);
        formData.append("photo", file);

        const sendRequest = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
          {
            method: "POST",
            body: formData,
          }
        );

        res = await sendRequest.json();
      }

      if (res.status === "success") {
        setShowScsModal(true);
        authCtx.login(res.token, res.user._id, res.user.role);

        setTimeout(() => {
          window.location.href = "/";
        }, 80);
      }

      if (
        res.status === "fail" ||
        res.error.status === "fail" ||
        res.error.status === "error"
      ) {
        setShowErrorModal(true);
        setError(res.message);
      }
    } catch (error) {}
  }

  async function submitTourHandler(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", tourNameValue);
    formData.append("maxGroupSize", groupSizeValue);
    formData.append("duration", durationValue);
    formData.append("difficulty", difficultyValue);
    formData.append("price", priceValue);
    formData.append("summary", summaryValue);
    formData.append("description", descValue);
    formData.append("imageCover", file);
    formData.append("images", imageOne);
    formData.append("images", imageTwo);
    formData.append("images", imageThree);

    const sendRequest = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tours`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      }
    );

    const res = await sendRequest.json();

    if (res.status === "success") {
      setConfirmShowModal(true);
      tourNameResetHandler();
      groupSizeResetHandler();
      durationResetHandler();
      difficultyResetHandler();
      priceResetHandler();
      summaryResetHandler();
      descResetHandler();

      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    }

    if (res.status === "fail" || res.status === "error") {
      setShowErrorModal(true);
      setError(res.message);
    }
  }

  function recieveFile(file) {
    setFile(file);
  }
  function recieveFileOne(file) {
    setImageOne(file);
  }
  function recieveFileTwo(file) {
    setImageTwo(file);
  }
  function recieveFileThree(file) {
    setImageThree(file);
  }

  function cancelHandler() {
    setShowErrorModal(false);
    setShowScsModal(false);
    setConfirmShowModal(false);
  }
  return (
    <>
      {showErrorModal && (
        <Modal
          onCancel={cancelHandler}
          asOverlay
          bg="#000"
          error
          message={error}
        />
      )}
      {showscsModal && (
        <Modal method="login" bg="#000" onCancel={cancelHandler} asOverlay />
      )}
      {showConfirmModal && (
        <Modal
          method="creating Document"
          bg="#fff"
          onCancel={cancelHandler}
          asOverlay
        />
      )}
      <div className={classes.form_wrapper}>
        <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
          {props.signup && <h4>sign up</h4>}
          {props.login && <h4>login</h4>}

          {props.signup || props.login ? (
            <span>
              hey, enter your credentials to{" "}
              {props.signup && "sign up for new account"}
              {props.login && "login to your account"}
            </span>
          ) : null}

          {props.login || props.signup ? (
            <>
              <div>
                <div className={classes.input__name}>
                  <input
                    className={` ${emailHasError && classes.err_input}${
                      classes.email
                    }`}
                    autoComplete="off"
                    id="email"
                    value={emailValue}
                    onInput={emailInputHandler}
                    onBlur={emailBlurHandler}
                    type="text"
                    required
                  />

                  <label className={classes.label_email}>
                    <span className={classes.lbl_em_span}>Email</span>
                    <div className={classes.line}></div>
                  </label>
                </div>
                {emailHasError && (
                  <p className="err-txt">please provide us your email. </p>
                )}
              </div>
            </>
          ) : null}

          {props.addTour && (
            <div className={classes.input__name}>
              <input
                className={classes.email}
                autoComplete="off"
                id="tourName"
                value={tourNameValue}
                onInput={tourNameInputHandler}
                onBlur={tourNameBlurHandler}
                type="text"
                required
              />
              <label className={classes.label_email}>
                <span className={classes.lbl_em_span}>Tour Name</span>
                <div className={classes.line}></div>
              </label>
            </div>
          )}
          {props.addTour && (
            <div className={classes.input__name}>
              <input
                className={classes.email}
                autoComplete="off"
                id="maxGroupSize"
                value={groupSizeValue}
                onInput={groupSizeInputHandler}
                onBlur={groupSizeBlurHandler}
                type="number"
                required
              />
              <label className={classes.label_email}>
                <span className={classes.lbl_em_span}>maxGroupSize</span>
                <div className={classes.line}></div>
              </label>
            </div>
          )}
          {props.addTour && (
            <div className={classes.input__name}>
              <input
                className={classes.email}
                autoComplete="off"
                id="duration"
                value={durationValue}
                onInput={durationInputHandler}
                onBlur={durationBlurHandler}
                type="number"
                required
              />
              <label className={classes.label_email}>
                <span className={classes.lbl_em_span}>duration</span>
                <div className={classes.line}></div>
              </label>
            </div>
          )}
          {props.addTour && (
            <div className={classes.input__name}>
              <input
                className={classes.email}
                autoComplete="off"
                id="diff"
                value={difficultyValue}
                onInput={difficultyInputHandler}
                onBlur={difficultyBlurHandler}
                type="text"
                required
              />
              <label className={classes.label_email}>
                <span className={classes.lbl_em_span}>Tour Difficulty</span>
                <div className={classes.line}></div>
              </label>
            </div>
          )}
          {props.addTour && (
            <div className={classes.input__name}>
              <input
                className={classes.email}
                autoComplete="off"
                id="price"
                value={priceValue}
                onInput={priceInputHandler}
                onBlur={priceBlurHandler}
                type="number"
                required
              />
              <label className={classes.label_email}>
                <span className={classes.lbl_em_span}>Tour Price</span>
                <div className={classes.line}></div>
              </label>
            </div>
          )}
          {props.addImageCover && (
            <>
              <span>ImageCover</span>
              <ImageUpload file={file} mountain sendFile={recieveFile} />
            </>
          )}
          {props.addTour && (
            <div className={classes.input__name}>
              <input
                className={classes.email}
                autoComplete="off"
                id="tourName"
                value={summaryValue}
                onInput={summaryInputHandler}
                onBlur={summaryBlurHandler}
                type="text"
                required
              />
              <label className={classes.label_email}>
                <span className={classes.lbl_em_span}>Summary</span>
                <div className={classes.line}></div>
              </label>
            </div>
          )}
          {props.addTour && (
            <div className={classes.input__name}>
              <input
                className={classes.email}
                autoComplete="off"
                id="tourName"
                value={descValue}
                onInput={descInputHandler}
                onBlur={descBlurHandler}
                type="text"
                required
              />
              <label className={classes.label_email}>
                <span className={classes.lbl_em_span}>Description</span>
                <div className={classes.line}></div>
              </label>
            </div>
          )}

          {props.addImages && (
            <>
              <span>Images</span>
              <div className="flex__gap__4">
                <ImageUpload
                  file={imageOne}
                  mountain
                  sendFile={recieveFileOne}
                />
                <ImageUpload
                  file={imageTwo}
                  mountain
                  sendFile={recieveFileTwo}
                />
                <ImageUpload
                  file={imageThree}
                  mountain
                  sendFile={recieveFileThree}
                />
              </div>
            </>
          )}

          {props.signup && (
            <div className={classes.input__name}>
              <input
                className={classes.email}
                autoComplete="off"
                value={UsernameValue}
                onBlur={UsernameBlurHandler}
                onInput={UsernameInputHandler}
                id="username"
                type="text"
                required
              />
              <label className={classes.label_email}>
                <span className={classes.lbl_em_span}>UserName</span>
                <div className={classes.line}></div>
              </label>
            </div>
          )}

          {props.signup && <ImageUpload sendFile={recieveFile} />}
          {props.login || props.signup ? (
            <>
              <div>
                <div className={classes.input__pass}>
                  <input
                    autoComplete="off"
                    id="password"
                    value={passwordValue}
                    onInput={passwordInputHandler}
                    onBlur={passwordBlurHandler}
                    type="password"
                    required
                  />
                  <label className={classes.label_pass}>
                    <span className={classes.lbl_pass_span}>Password</span>
                  </label>
                </div>
                {passwordHasError && (
                  <p className="err-txt">The above field field is necessary</p>
                )}
              </div>
            </>
          ) : null}
          {props.signup && (
            <>
              <div className={classes.input__pass}>
                <input
                  autoComplete="off"
                  id="passwordConfirm"
                  value={passwordConfirmValue}
                  onInput={passwordConfirmInputHandler}
                  onBlur={passwordConfirmBlurHandler}
                  type="password"
                  required
                />
                <label className={classes.label_pass}>
                  <span className={classes.lbl_pass_span}>
                    Confirm Password
                  </span>
                </label>
              </div>
            </>
          )}

          {props.login || props.signup ? (
            <button
              type="submit"
              onClick={props.addTour ? submitTourHandler : submitHandler}
              className={classes.btn__cta}
            >
              Submit
            </button>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default Form;
