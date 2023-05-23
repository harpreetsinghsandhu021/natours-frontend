import React from "react";
import classes from "./TourHero.module.css";

const TourHero = ({ coverImage, heading, description }) => {
  return (
    <div className={classes.hero}>
      <div className={classes.left}>
        <h5 className={classes.heading}>{heading}</h5>
        <p>{description}</p>
      </div>
      <div className={classes.rght}>
        <div className={classes.img__box}>
          <img
            className={classes.hero__image}
            src={`${process.env.NEXT_PUBLIC_API_URL}/img/tours/${coverImage}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TourHero;
