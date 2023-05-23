import React, { useRef, useState, useEffect } from "react";
import classes from "./ImageUpload.module.css";

const ImageUpload = (props) => {
  const fileUplRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    if (!file) return;

    console.log("running!!");

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  useEffect(() => {
    if (!props.file) return;

    console.log("running!!");

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(props.file);
  }, [props.file]);

  function FilePicker() {
    if (props.update) {
      return props.mountain ? (
        <img
          src={`${
            previewUrl
              ? previewUrl
              : `${process.env.NEXT_PUBLIC_API_URL}/img/${props.path}/${props.image}`
          } `}
        />
      ) : (
        <img
          src={`${
            previewUrl
              ? previewUrl
              : `${process.env.NEXT_PUBLIC_API_URL}/img/${props.path}/${props.image}`
          } `}
        />
      );
    } else {
      return props.mountain ? (
        <img src={`${previewUrl ? previewUrl : "/images/default-m.jpg"} `} />
      ) : (
        <img src={`${previewUrl ? previewUrl : "/images/defa.png"} `} />
      );
    }
  }

  function filePickHandler(e) {
    e.preventDefault();
    let pickedFile;

    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];

      setFile(pickedFile);
      props.sendFile(pickedFile);
    }
  }

  return (
    <div className={classes.file__picker}>
      <input
        onChange={filePickHandler}
        ref={fileUplRef}
        style={{ display: "none" }}
        type="file"
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          fileUplRef.current.click();
        }}
      >
        <FilePicker />
      </button>
    </div>
  );
};

export default ImageUpload;
