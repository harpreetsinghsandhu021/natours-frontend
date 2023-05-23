import React, { useState, useEffect } from "react";
import classes from "./Form.module.css";
import Form from "./Form";
import Map from "../components/Map";

const MultiStepForm = () => {
  const [page, setPage] = useState(0);
  const pages = [
    "details",
    "imageCover",
    "images",
    "startLocation",
    "location",
  ];

  const content = () => {
    if (page === 0) {
      return <Form addTour />;
    } else if (page === 1) {
      return <Form addImageCover />;
    } else if (page === 2) {
      return <Form addImages />;
    } else if (page === 3) {
      return <Map single />;
    } else if (page === 4) {
      return <Map fields />;
    }
  };

  return (
    <div className={classes.form_wrapper}>
      <h4>Add Tour</h4>
      <h4>{pages[page]}</h4>
      {content()}

      <div className="flex">
        <button
          disabled={page === 0}
          onClick={() => setPage((prevPage) => prevPage - 1)}
          className={classes.btn__cta}
        >
          Prev
        </button>
        <button
          disabled={page === pages.length - 1}
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className={classes.btn__cta}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;
