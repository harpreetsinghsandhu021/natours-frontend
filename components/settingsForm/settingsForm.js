import { getCookie } from "cookies-next";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../shared/context/authContext";
import AccountForm from "./AccountForm";
import PasswordForm from "./PasswordForm";

const SettingsForm = (props) => {
  return (
    <>
      <div className="flex-rght">
        {props.display === "myaccount" ? (
          <AccountForm user={props.user} />
        ) : null}
        {props.display === "passwords" ? (
          <PasswordForm user={props.user} />
        ) : null}
      </div>
    </>
  );
};

export default SettingsForm;
