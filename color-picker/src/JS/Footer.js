import React from "react";
import "../CSS/Footer.css";

function Footer(props) {
  const {paletteName, emoji} = props.palette;
  return (
    <div className="Footer">
      {paletteName}
      <span className="emoji">{emoji}</span>
    </div>
  );
}

export default Footer;
