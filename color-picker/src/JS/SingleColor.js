import React, {useState} from "react";
import ColorBox from "../JS/ColorBox";
import {Link} from "react-router-dom";
import "../CSS/SingleColor.css";
import Navbar from "../JS/Navbar";
import Footer from "../JS/Footer";

function SingleColor(props) {
  const {palette, colorId} = props;
  let _shades = getShades(palette, colorId);

  const [state, setState] = useState({
    format: "hex",
  });

  const {format} = state;
  function getShades(palette, colorToFind) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFind)
      );
    }
    return shades.slice(1);
  }

  const colorBoxes = _shades.map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      color={color[format]}
      showMoreLink={false}
    />
  ));

  function changeFormat(val) {
    setState({
      ...state,
      format: val,
    });
  }

  return (
    <div className="SingleColor SingleColorPalette">
      <Navbar showSlider={false} changeFormat={changeFormat} />
      <div className="SingleColor-colors">
        {colorBoxes}
        <div className="SingleColor-back ColorBox">
          <Link to={`/palette/${palette.id}`} className="back-btn">
            Go Back
          </Link>
        </div>
      </div>

      <Footer palette={palette} />
    </div>
  );
}

export default SingleColor;
