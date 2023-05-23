import React from "react";
import Header from "@/components/shared/UI/Header";
import Form from "@/components/shared/UI/Form";
import Styles from "../styles/Home.module.css";

const signup = () => {
  return (
    <>
      <Header color />
      <main className={`${Styles.main__login}`}>
        <Form signup />
      </main>
    </>
  );
};

export default signup;
