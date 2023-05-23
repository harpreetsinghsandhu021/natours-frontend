import React from "react";

const Footer = (props) => {
  return (
    <footer className="footer">
      <img src={`/images/logo${props.black ? "-black" : ""}.png`} />
      <p>&copy; natours 2023</p>
    </footer>
  );
};

export default Footer;
