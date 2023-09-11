import React from "react";
import DraggableColorBox from "../JS/DraggableColorBox";
import {ReactSortable} from "react-sortablejs";

function DraggableColorList(props) {
  const {colors, setColors, removeColor} = props;
  return (
    <ReactSortable
      tag="div"
      list={colors}
      setList={setColors}
      style={{height: "100%"}}
    >
      {colors.map((color, i) => (
        <DraggableColorBox
          color={color.color}
          name={color.name}
          handleClick={() => removeColor(color.name)}
          key={color.name}
          index={i}
        />
      ))}
    </ReactSortable>
  );
}

export default DraggableColorList;
