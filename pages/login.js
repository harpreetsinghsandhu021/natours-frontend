import React from "react";
import Header from "@/components/shared/UI/Header";
import Styles from "../styles/Home.module.css";
import Form from "@/components/shared/UI/Form";
const Login = () => {
  return (
    <>
      <Header color />
      <main className={`${Styles.main__login}`}>
        <Form login />
      </main>
    </>
  );
};

export default Login;
