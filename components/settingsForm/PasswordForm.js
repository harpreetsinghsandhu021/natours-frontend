import React, { useContext, useState } from "react";
import Input from "../shared/components/Input";
import InputNew from "../shared/components/InputNew";
import classes from "../shared/UI/Form.module.css";
import ImageUpload from "../shared/UI/ImageUpload";
import { AuthContext } from "../shared/context/authContext";
const PasswordForm = (props) => {
  const authCtx = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showScsMsg, setShowScsMsg] = useState(false);

  function getPasswordHandler(data) {
    setPassword(data);
  }

  function getNewPasswordHandler(data) {
    setNewPass(data);
  }

  function getPasswordConfirmHandler(file) {
    setPasswordConfirm(file);
  }

  async function submitHandler(e) {
    e.preventDefault();

    const sendRequest = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/updateMyPassword`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: JSON.stringify({
          currentPassword: password,
          password: newPass,
          passwordConfirm: passwordConfirm,
        }),
      }
    );
    const res = await sendRequest.json();

    if (res && res.status === "fail") {
      setShowScsMsg(res.message);
    }
    if (res && res.status === "success") {
      setShowScsMsg(true);

      setTimeout(() => {
        setShowScsMsg(false);
        setPassword("");
        setPasswordConfirm("");
        setNewPass("");
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

  return (
    <div className="w-60">
      <div className={classes.form_wrapper}>
        <h2>UPDATE YOUR PASSWORD</h2>
        {showScsMsg && <p className="scs_msg">{showScsMsg}</p>}
        <div className={`${classes.form} ${classes.form__pad}`}>
          <Input
            type="password"
            label="Current Password"
            id="currpassword"
            sendValue={getPasswordHandler}
          />
          <Input
            type="password"
            label="New Password"
            id="passwordConfirm"
            sendValue={getNewPasswordHandler}
          />
          <Input
            type="password"
            label="Confirm Password"
            id="passwordConfirm"
            sendValue={getPasswordConfirmHandler}
          />
          <button
            onClick={(e) => submitHandler(e)}
            type="submit"
            className={classes.btn__cta}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;
