import React, { useState, useEffect } from "react";
import classes from "./Reviews.module.css";
import Slider from "react-slick";
import { useContext } from "react";
import ReactStars from "react-stars";
import { AuthContext } from "../shared/context/authContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Reviews = ({ tourId, reviews }) => {
  const [stripe, setStripe] = useState();

  useEffect(() => {
    const stripe = window.Stripe(
      "pk_test_51MVDk7SJNwQAwY18RyrcY6kczVockBitNLL4Jl0h3CBd5K6hfgkObhnOpcyQJvKiW0XlaGGbkknZwXaSVHcAbMy600J71A0uJ8"
    );
    setStripe(stripe);
  }, []);

  const authCtx = useContext(AuthContext);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  async function handleBook() {
    const fetchSession = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/checkout-session/${tourId}`,
      {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      }
    );

    const res = await fetchSession.json();

    if (res) {
      const checkout = await stripe.redirectToCheckout({
        sessionId: res.session.id,
      });
    }
  }

  return (
    <>
      <div className={classes.btn__cta}>
        <button onClick={handleBook} className={classes.btn__check}>
          Book Now
        </button>
      </div>

      <Slider className={classes.slider} {...settings}>
        {reviews.map((rev) => (
          <div className={classes.card}>
            <div className={classes.inner__card}>
              <div className={classes.user_img}>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/img/users/${rev.user.photo}`}
                  alt={rev.user.photo}
                />
              </div>
              <ReactStars
                count={5}
                // onChange={ratingChanged}
                className={classes.stars}
                edit={false}
                value={rev.rating}
                size={18}
              />
              <p className={classes.user__name}>{rev.user.name}</p>
              <p className={classes.rev__txt}>{rev.review}</p>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Reviews;
