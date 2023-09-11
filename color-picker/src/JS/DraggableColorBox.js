import React from "react";
import "../CSS/DraggableColorBox.css";
import DeleteIcon from "@mui/icons-material/Delete";
import chroma from "chroma-js";

function DraggableColorBox(props) {
  const {color, name, handleClick} = props;

  const isColorDark = chroma(color).luminance() <= 0.07;
  const isColorLight = chroma(color).luminance() >= 0.65;

  return (
    <div style={{backgroundColor: color}} className="DraggableColorBox">
      <div className={`DCB-content ${isColorDark && "light"}`}>
        <span>{name}</span>
        <DeleteIcon className="deleteIcon" onClick={handleClick} />
      </div>
    </div>
  );
}

export default DraggableColorBox;


