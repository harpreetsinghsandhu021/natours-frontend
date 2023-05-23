import React from "react";
import classes from "./Tour.module.css";
import TourHero from "./TourHero";
import TourInfo from "./TourInfo";
import Reviews from "./Reviews";
import TourMap from "./Map";
import dynamic from "next/dynamic";

const DynamicReviews = dynamic(() => import("./Reviews"), { ssr: false });
const Tour = ({ tour }) => {
  return (
    <>
      <section className={classes.section__tour}>
        <TourHero
          coverImage={tour[0].imageCover}
          heading={tour[0].summary}
          description={tour[0].description}
        />
        <TourInfo
          startDates={tour[0].startDates}
          level={tour[0].difficulty}
          people={tour[0].maxGroupSize}
          rating={tour[0].ratingsAverage}
          images={tour[0].images}
          guides={tour[0].guides}
        />
        {tour[0].locations.length !== 0 && (
          <TourMap locations={tour[0].locations} />
        )}
        <DynamicReviews tourId={tour[0].id} reviews={tour[0].reviews} />
      </section>
    </>
  );
};

export default Tour;
