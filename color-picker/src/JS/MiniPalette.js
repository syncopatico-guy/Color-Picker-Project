import React from "react";
import {useNavigate} from "react-router-dom";
import "../CSS/MiniPalette.css";
import DeleteIcon from "@mui/icons-material/Delete";

function MiniPalette(props) {
  const {paletteName, emoji, colors, id, openDialog} = props;

  const history = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    history(`/palette/${id}`);
  }

  function removePalette(e) {
    e.stopPropagation();
    openDialog(id);
  }

  const miniBoxes = colors.map((color) => (
    <div
      className="miniColor"
      style={{backgroundColor: color.color}}
      key={color.name}
    ></div>
  ));
  return (
    <div className="MiniPalette" onClick={handleClick}>
      <DeleteIcon className="deleteIcon" onClick={removePalette} />
      <div className="colors">{miniBoxes}</div>
      <h5 className="title">
        {paletteName} <span className="emoji">{emoji}</span>
      </h5>
    </div>
  );
}

export default React.memo(MiniPalette, () => true);
