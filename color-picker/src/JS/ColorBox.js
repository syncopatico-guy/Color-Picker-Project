import React, {useState} from "react";
import {Link} from "react-router-dom";
import {CopyToClipboard} from "react-copy-to-clipboard";

import chroma from "chroma-js";

import "../CSS/ColorBox.css";

function ColorBox(props) {
  const [state, setState] = useState({
    copied: false,
  });

  function handleCopy() {
    setState({copied: true});

    setTimeout(() => setState({copied: false}), 1200);
  }

  const {name, color, id, paletteId, showMoreLink} = props;
  const {copied} = state;

  const isColorDark = chroma(color).luminance() <= 0.07;
  const isColorLight = chroma(color).luminance() >= 0.65;

  return (
    <CopyToClipboard text={color} onCopy={handleCopy}>
      <div style={{background: color}} className="ColorBox">
        <div
          style={{background: color}}
          className={`copy-overlay  ${copied && "show"} 
          ${isColorLight && "dark"}
          `}
        />
        <div
          className={`copy-msg ${copied && "show"} ${isColorLight && "dark"}`}
        >
          <h1>Copied</h1>
          <p>{color}</p>
        </div>
        <div className="copy-container">
          <div className={`box-content ${isColorDark && "light"}`}>
            <span>{name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        {showMoreLink && (
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={`more-span ${isColorLight && "dark"}`}>More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}
export default ColorBox;
