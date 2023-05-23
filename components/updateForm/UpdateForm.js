import React, { useState, useContext } from "react";
import classes from "../shared/UI/Form.module.css";
import ImageUpload from "../shared/UI/ImageUpload";
import Modal from "../shared/UI/Modal";
import { AuthContext } from "../shared/context/authContext";
import Input from "../shared/components/Input";
import { useFormDynamic } from "../shared/hooks/useForm";

const UpdateForm = (props) => {
  const authCtx = useContext(AuthContext);
  const [tour, setTour] = useState(props.tour ? props.tour : "");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmModal, setConfirmShowModal] = useState(false);
  const [showscsModal, setShowScsModal] = useState(false);
  const [error, setError] = useState();
  const [file, setFile] = useState();
  const [imageOne, setImageOne] = useState();
  const [imageTwo, setImageTwo] = useState();
  const [imageThree, setImageThree] = useState();
  const [tourName, setTourName] = useState();
  const [groupSize, setGroupSize] = useState();
  const [duration, setDuration] = useState();
  const [diff, setDiff] = useState();
  const [price, setPrice] = useState();
  const [summary, setSummary] = useState();
  const [desc, setDesc] = useState();

  function recieveFile(file) {
    setFile(file);
  }
  function recieveFileOne() {}
  function recieveFileTwo() {}
  function recieveFileThree() {}

  function recieveTourName(val) {
    setTourName(val);
  }
  function recieveGroupSize(val) {
    setGroupSize(val);
  }
  function recieveDuration(val) {
    setDuration(val);
  }
  function recieveDiff(val) {
    setDiff(val);
  }
  function recievePrice(val) {
    setPrice(val);
  }
  function recieveSummary(val) {
    setSummary(val);
  }
  function recieveDesc(val) {
    setDesc(val);
  }

  async function submitHandler() {
    const formData = new FormData();

    formData.append("name", tourName);
    formData.append("maxGroupSize", groupSize);
    formData.append("duration", duration);
    formData.append("difficulty", diff);
    formData.append("price", price);
    formData.append("summary", summary);
    formData.append("description", desc);

    formData.append("imageCover", file ? file : tour.imageCover);

    formData.append("images", imageOne ? imageOne : tour.images[0]);
    formData.append("images", imageTwo ? imageTwo : tour.images[1]);
    formData.append("images", imageThree ? imageThree : tour.images[2]);

    const sendRequest = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tour.id}`,
      {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      }
    );

    const res = await sendRequest.json();

    if (res.status === "success") {
      setConfirmShowModal(true);

      setTimeout(() => {
        window.location.href = `/tour/${tour.slug}`;
      }, 80);
    }

    if (res.status === "fail" || res.status === "error") {
      setShowErrorModal(true);
      setError(res.message);
    }
  }

  function cancelHandler() {
    setShowErrorModal(false);
    setConfirmShowModal(false);
  }

  return (
    <>
      {showErrorModal && (
        <Modal onCancel={cancelHandler} asOverlay error message={error} />
      )}

      {showConfirmModal && <Modal onCancel={cancelHandler} asOverlay />}

      <div className={classes.form_wrapper}>
        <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
          <h4 style={{ width: "90%", paddingBottom: "4rem" }}>
            Update {tour.name} Tour
          </h4>
          <Input
            value={tour.name}
            label="name"
            type="text"
            sendValue={recieveTourName}
          />
          <Input
            value={tour.maxGroupSize}
            label="maxGroupSize"
            type="number"
            sendValue={recieveGroupSize}
          />
          <Input
            value={tour.duration}
            label="duration"
            type="number"
            sendValue={recieveDuration}
          />
          <Input
            value={tour.difficulty}
            label="difficulty"
            type="text"
            sendValue={recieveDiff}
          />
          <Input
            value={tour.price}
            label="price"
            type="number"
            sendValue={recievePrice}
          />

          <>
            <span>ImageCover</span>
            <ImageUpload
              path="tours"
              update
              image={tour.imageCover}
              mountain
              sendFile={recieveFile}
            />
          </>

          <Input
            value={tour.summary}
            label="summary"
            type="textarea"
            sendValue={recieveSummary}
          />
          <Input
            value={tour.description}
            label="description"
            type="textarea"
            sendValue={recieveDesc}
          />

          <>
            <span>Images</span>
            <div className="flex__gap__4">
              <ImageUpload
                image={tour.images[0]}
                update
                mountain
                path="tours"
                sendFile={recieveFileOne}
              />
              <ImageUpload
                image={tour.images[1]}
                path="tours"
                update
                mountain
                sendFile={recieveFileTwo}
              />
              <ImageUpload
                image={tour.images[2]}
                path="tours"
                update
                mountain
                sendFile={recieveFileThree}
              />
            </div>
          </>

          <button
            onClick={submitHandler}
            type="submit"
            className={classes.btn__cta}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateForm;
