import mapboxgl from "mapbox-gl";
import React, { useState, useEffect, useRef } from "react";
import classes from "./Map.module.css";

const TourMap = ({ locations }) => {
  const mapRef = useRef();

  const center = [-34.397, 150.644];

  const zoom = 8;

  useEffect(() => {
    if (mapboxgl) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiaGFycHJlZXQtLTg0IiwiYSI6ImNsZTZtaThmaDBva24zcnZ6OXF1MjZicnkifQ.jyznjHDWDdAu0tEDl4xbzg";
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: "mapbox://styles/harpreet--84/clepn67nt001a01mqo5k3js3z", // style URL
        zoom: 9, // starting zoom
      });

      const bounds = new mapboxgl.LngLatBounds();

      locations &&
        locations.map((loc) => {
          const el = document.createElement("div");
          el.className = "marker";

          new mapboxgl.Marker({
            element: el,
            anchor: "bottom",
          })
            .setLngLat(loc.coordinates)
            .addTo(map);

          bounds.extend(loc.coordinates);
        });

      map &&
        map.fitBounds(bounds, {
          padding: {
            top: 100,
            bottom: 100,
            left: 100,
            right: 100,
          },
        });
    }
  }, []);

  return <div className={classes.map_wrap} ref={mapRef}></div>;
};

export default TourMap;
