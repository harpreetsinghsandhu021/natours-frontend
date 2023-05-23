import React from "react";
import classes from "../UI/Form.module.css";
const TourDetails = () => {
  return (
    <div>
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
      {props.addTour && (
        <>
          <span>ImageCover</span>
          <ImageUpload mountain sendFile={recieveFile} />
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

      {props.addTour && (
        <>
          <span>Images</span>
          <div className="flex__gap__4">
            <ImageUpload mountain sendFile={recieveFileOne} />
            <ImageUpload mountain sendFile={recieveFileTwo} />
            <ImageUpload mountain sendFile={recieveFileThree} />
          </div>
        </>
      )}
    </div>
  );
};

export default TourDetails;
