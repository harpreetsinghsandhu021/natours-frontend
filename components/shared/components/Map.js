import mapboxgl from "mapbox-gl";
import React, { useState, useEffect, useRef } from "react";
import { MdDescription } from "react-icons/md";
import { BsFillCalendar2DayFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";

import classes from "./Map.module.css";

const TourMap = ({ locations, single, fields, sendStartLoc }) => {
  const mapRefNew = useRef();
  const [marker, setMarker] = useState();
  const [location, setLocation] = useState();
  const [locationsToShow, setLocationsToShow] = useState([]);
  const [startLocation, setStartLocation] = useState([]);
  const [index, setIndex] = useState(1);
  const [map, setMap] = useState();
  const formRef = useRef();

  const center = [-34.397, 150.644];

  const zoom = 8;

  useEffect(() => {
    if (mapboxgl) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiaGFycHJlZXQtLTg0IiwiYSI6ImNsZTZtaThmaDBva24zcnZ6OXF1MjZicnkifQ.jyznjHDWDdAu0tEDl4xbzg";
      const map = new mapboxgl.Map({
        container: mapRefNew.current,
        style: "mapbox://styles/harpreet--84/clepn67nt001a01mqo5k3js3z", // style URL
        zoom: 8,
        center: [75.68658, 30.783577], // starting zoom
      });
      setMap(map);
      map.on("click", (e) => {
        // console.log(e);

        if (single) {
          console.log(startLocation.length);
          if (index > 1) setIndex(1);
          if (startLocation[0]) return;
          showForm();
          setLocation(e.lngLat);
        }

        if (fields) {
          if (index > 4) setIndex(1);
          if (locationsToShow.length === 4) return;
          showForm();
          setLocation(e.lngLat);
        }
      });
    }
  }, [single, fields]);

  function showForm() {
    document.getElementById("loc-desc").focus();

    formRef.current.classList.add("form--show");
  }
  function hideForm() {
    document.getElementById("loc-desc").value = "";
    document.getElementById("loc-day").value = "";
    formRef.current.classList.remove("form--show");
  }

  // useEffect(() => {
  //   if (location.length > 4) return;
  //   location &&
  //     location.map((loc) => {
  //       const el = document.createElement("div");
  //       el.className = "marker";

  //       new mapboxgl.Marker({
  //         element: el,
  //         anchor: "bottom",
  //       })
  //         .setLngLat(loc)
  //         .addTo(map);
  //     });
  //   console.log(marker, location);
  // }, [location]);

  function handleFormSubmit(e) {
    e.preventDefault();

    const desc = document.getElementById("loc-desc").value;
    const day = document.getElementById("loc-day").value;

    let locationCurr = {
      description: desc,
      day: +day,
      coordinates: [location.lng, location.lat],
    };

    hideForm();
    if (fields) {
      setLocationsToShow((prevLocation) => prevLocation.concat(locationCurr));
    } else {
      setStartLocation((prevLocation) => prevLocation.concat(locationCurr));
    }
    renderMarkers(locationCurr);
  }
  // useEffect(() => {
  //   renderMarkers();
  // }, []);

  function renderMarkers(currLocation) {
    const el = document.createElement("div");
    el.className = `marker marker--${index}`;
    el.id = `marker--${index}`;

    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<h3>${currLocation.description}</h3><p>${
              days[currLocation.day]
            }</p>`
          )
      )
      .setLngLat(currLocation.coordinates)
      .addTo(map);

    setIndex((prevIndex) => prevIndex + 1);
  }
  console.log(startLocation);

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  function handleCross(e, index) {
    console.log(index);

    const marker = document.getElementById(`marker--${index + 1}`);

    removeMarker(marker);

    if (fields) {
      let newLoc = [...locationsToShow];
      newLoc.splice(index, 1);
      setLocationsToShow(newLoc);
    } else {
      let newLoc = [...startLocation];
      newLoc.splice(index, 1);
      setStartLocation(newLoc);
    }
  }

  function removeMarker(marker) {
    if (marker) {
      marker.style.display = "none";
    }
  }

  return (
    <>
      {fields ? (
        <>
          <div className={classes.wrapper}>
            <div className={`${classes.form__map} `}>
              <form
                onSubmitCapture={handleFormSubmit}
                ref={formRef}
                className={`${classes.form__inner} form--hidden`}
              >
                <div className={classes.input_wrap}>
                  <label>description</label>
                  <input type="text" id="loc-desc" />
                </div>
                <div className={classes.input_wrap}>
                  <label>day</label>
                  <input type="text" id="loc-day" />
                </div>
                <button className="d-none">ok</button>
              </form>
              {locationsToShow.length > 0 &&
                locationsToShow.map((loc, index) => {
                  return (
                    <>
                      <h5>Stop {index + 1}</h5>
                      <div className={classes.loc__card}>
                        <p>
                          <MdDescription /> {loc.description}
                        </p>
                        <p>
                          <BsFillCalendar2DayFill /> {days[loc.day]}
                        </p>
                        <RxCrossCircled
                          onClick={(e) => handleCross(e, index)}
                          className={classes.btn__cross}
                        />{" "}
                      </div>
                    </>
                  );
                })}
            </div>
            <div className={classes.map_wrap} ref={mapRefNew}></div>
          </div>
        </>
      ) : (
        <div className={classes.wrapper}>
          <div className={`${classes.form__map} `}>
            <form
              onSubmitCapture={handleFormSubmit}
              ref={formRef}
              className={`${classes.form__inner} form--hidden`}
            >
              <div className={classes.input_wrap}>
                <label>description</label>
                <input type="text" id="loc-desc" />
              </div>
              <div className={classes.input_wrap}>
                <label>day</label>
                <input type="text" id="loc-day" />
              </div>
              <button className="d-none">ok</button>
            </form>
            {startLocation.length > 0 &&
              startLocation.map((loc, index) => {
                return (
                  <>
                    <h5>Stop {index + 1}</h5>
                    <div className={classes.loc__card}>
                      <p>
                        <MdDescription /> {loc.description}
                      </p>
                      <p>
                        <BsFillCalendar2DayFill /> {days[loc.day]}
                      </p>
                      <RxCrossCircled
                        onClick={(e) => handleCross(e, index)}
                        className={classes.btn__cross}
                      />{" "}
                    </div>
                  </>
                );
              })}
          </div>
          <div className={classes.map_wrap} ref={mapRefNew}></div>
        </div>
      )}
    </>
  );
};

export default TourMap;
