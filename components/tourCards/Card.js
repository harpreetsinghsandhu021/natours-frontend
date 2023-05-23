import React, { useState } from "react";
import Link from "next/link";
import classes from "./Card.module.css";
import { AiFillCalendar } from "react-icons/ai";
import { useRouter } from "next/router";
import Modal from "../shared/UI/Modal";
import { FiMapPin } from "react-icons/fi";
import { useContext } from "react";
import ReactStars from "react-stars";
import { AuthContext } from "../shared/context/authContext";
import { AiTwotoneFlag, AiFillDelete, AiFillEdit } from "react-icons/ai";
import moment from "moment";
import { GoPerson } from "react-icons/go";

const Card = ({ filter, tour }) => {
  const [showModal, setShowModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  function deleteTour() {
    console.log(tour.id);
  }

  function closeError() {
    setShowModal(false);
  }

  function filterOut(id) {
    filter(id);
  }

  return (
    <>
      {showModal && (
        <Modal
          id={tour.id}
          delete
          asOverlay
          bg="#fff"
          filterOut={filterOut}
          confirm
          onCancel={closeError}
        />
      )}
      <div className={classes.card}>
        {authCtx.userRole === "admin" && (
          <span
            onClick={() => setShowModal(true)}
            className={`${classes.svg__icon} ${classes.svg__icon__del}`}
          >
            <AiFillDelete />
          </span>
        )}
        {authCtx.userRole === "admin" && (
          <span
            onClick={() => router.push(`/tour/update?id=${tour.id}`)}
            className={`${classes.svg__icon} ${classes.svg__icon__edit}`}
          >
            <AiFillEdit />
          </span>
        )}
        <div className={classes.img__box}>
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/img/tours/${tour.imageCover}`}
            alt={tour.name}
          />
        </div>
        <h2 className={classes.tour__name}>{tour.name}</h2>
        <p className={classes.sumary}>{tour.summary}</p>

        <p>
          <span className="color--span">{tour.price}&#8377;</span> per person
        </p>
        <div className={classes.stars__wrapper}>
          <ReactStars
            count={5}
            // onChange={ratingChanged}
            className={classes.stars}
            edit={false}
            value={tour.ratingsAverage}
            size={18}
            color2={"#ffd700"}
          />
          ratings ({tour.ratingsQuantity})
        </div>
        <div className={classes.info}>
          <div className="flex">
            <FiMapPin className={classes.svg__card__map} />
            <span>{tour.startLocation.description}</span>
          </div>
          <div className="flex">
            <AiFillCalendar className={classes.svg__card} />
            <span>{moment(tour.startDates[0]).format("MMMM,YYYY ")}</span>
          </div>
          <div className="flex">
            <AiTwotoneFlag className={classes.svg__card} />
            <span>{tour.locations.length} stops</span>
          </div>
          <div className="flex">
            <GoPerson className={classes.svg__card} />
            <span>{tour.maxGroupSize} people</span>
          </div>
        </div>
        <Link href={`/tour/${tour.slug}`} className={classes.btn__cta}>
          Read more
        </Link>
      </div>
    </>
  );
};

export default Card;
