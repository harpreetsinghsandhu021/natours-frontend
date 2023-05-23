import React, { useContext, useState } from "react";
import Input from "../shared/components/Input";
import InputNew from "../shared/components/InputNew";
import classes from "../shared/UI/Form.module.css";
import ImageUpload from "../shared/UI/ImageUpload";
import { AuthContext } from "../shared/context/authContext";
const AccountForm = (props) => {
  const authCtx = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState(props.user);
  const [showScsMsg, setShowScsMsg] = useState(false);

  function getNameHandler(data) {
    setName(data);
  }

  function getEmailHandler(data) {
    setEmail(data);
  }

  function recieveFile(file) {
    setFile(file);
  }

  async function submitHandler(e) {
    e.preventDefault();
    let formData = new FormData();

    formData.append("photo", file);
    formData.append("name", name);
    formData.append("email", email);

    const sendRequest = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/updateme`,
      {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      }
    );
    const res = await sendRequest.json();

    if (res && res.status === "success") {
      console.log(res);
      setShowScsMsg(true);
      setUser(res.updatedUser);

      setTimeout(() => {
        setShowScsMsg(false);
      }, 1000);
    }
  }

  return (
    <div className="w-60 ">
      <div className={classes.form_wrapper}>
        <h2>YOUR ACCOUNT SETTINGS</h2>
        {showScsMsg && <p className="scs_msg">Data SuccessFully updated.</p>}
        <div className={`${classes.form} ${classes.form__pad}`}>
          <ImageUpload
            path="users"
            image={user.photo}
            update
            sendFile={recieveFile}
          />

          <Input
            type="text"
            label="name"
            value={user.name}
            sendValue={getNameHandler}
          />
          <Input
            type="text"
            label="email"
            value={user.email}
            sendValue={getEmailHandler}
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

export default AccountForm;
