import React from "react";
import Head from "next/head";
import Header from "@/components/shared/UI/Header";
import Form from "@/components/shared/UI/Form";
import MultiStepForm from "@/components/shared/UI/MultiStepForm";

const addTour = () => {
  return (
    <>
      <Head>
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js"></script>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <main className="main--add-tour">
        {/* <Form addTour /> */}
        <MultiStepForm />
      </main>
    </>
  );
};

export default addTour;
