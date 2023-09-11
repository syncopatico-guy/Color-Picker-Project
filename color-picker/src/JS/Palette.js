import React, {useState} from "react";
import ColorBox from "../JS/ColorBox";
import Navbar from "../JS/Navbar";
import "../CSS/Palette.css";
import Footer from "../JS/Footer";

function Palette(props) {
  const [state, setState] = useState({
    level: 500,
    format: "hex",
  });
  const {colors, id} = props.palette;
  const {level, format} = state;
  const colorBoxes = colors[level].map((color) => (
    <ColorBox
      color={color[format]}
      name={color.name}
      key={color.id}
      id={color.id}
      paletteId={id}
      showMoreLink={true}
    />
  ));

  function changeLevel(level) {
    setState({
      ...state,
      level: level,
    });
  }

  function changeFormat(val) {
    setState({
      ...state,
      format: val,
    });
  }
  return (
    <div className="Palette">
      <Navbar
        level={level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        showSlider={true}
      />
      <div className="Palette-colors">{colorBoxes}</div>
      <Footer palette={props.palette} />
    </div>
  );
}

export default Palette;
