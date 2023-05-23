import React from "react";
import classes from "./TourInfo.module.css";
import { FiCalendar } from "react-icons/fi";
import { BsArrowUpRight } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import moment from "moment";
const TourInfo = ({ startDates, level, people, rating, images, guides }) => {
  return (
    <section className={classes.section__info}>
      <div className={classes.left}>
        <div className={classes.facts__box}>
          <h5 className={classes.heading}>Quick facts</h5>
          <ul className={classes.fact__list}>
            <li className={classes.fact}>
              <FiCalendar /> <span className={classes.spc_span}>Next date</span>{" "}
              {moment(startDates[0]).format("MMMM,YYYY ")}
            </li>
            <li className={classes.fact}>
              <BsArrowUpRight />{" "}
              <span className={classes.spc_span}>difficulty</span>
              {level}
            </li>
            <li className={classes.fact}>
              <IoPersonOutline />{" "}
              <span className={classes.spc_span}>participants</span> {people}{" "}
              People
            </li>
            <li className={classes.fact}>
              <AiOutlineStar /> <span className={classes.spc_span}>rating</span>{" "}
              {rating} / 5
            </li>
          </ul>
        </div>
        <div className={classes.guides__box}>
          <h5 className={classes.heading}>Your tour guides</h5>
          <ul className={classes.fact__list}>
            {guides.map((guide) => (
              <li className={`${classes.fact} ${classes.guide__li}`}>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/img/users/${guide.photo}`}
                />
                <span className={classes.spc_span}>{guide.role}</span>{" "}
                {guide.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={classes.rght}>
        <img
          className={classes.img__1}
          src={`${process.env.NEXT_PUBLIC_API_URL}/img/tours/${images[0]}`}
        />
        <img
          className={classes.img__2}
          src={`${process.env.NEXT_PUBLIC_API_URL}/img/tours/${images[1]}`}
        />
        <img
          className={classes.img__3}
          src={`${process.env.NEXT_PUBLIC_API_URL}/img/tours/${images[2]}`}
        />
      </div>
    </section>
  );
};

export default TourInfo;
