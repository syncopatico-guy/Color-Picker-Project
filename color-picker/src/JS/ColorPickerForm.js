import React, {useEffect, useState} from "react";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
//Material UI Stuff Starts
import {Button} from "@mui/material";
//Material UI Stuff Ends
import {ChromePicker} from "react-color";
import "../CSS/ColorPickerForm.css";

function ColorPickerForm(props) {
  const [currColor, setCurrColor] = useState("blue");
  const [newColorName, setNewColorName] = useState("");

  const {fullPalette, addNewColor, colors} = props;

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({name}) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every(({color}) => color !== currColor);
    });
  });

  const updateColor = (newColor) => setCurrColor(newColor.hex);

  const handleSubmit = () => {
    const newColor = {
      color: currColor,
      name: newColorName,
    };
    addNewColor(newColor);
    setNewColorName("");
  };

  return (
    <div className="ColorPickerForm">
      <ChromePicker
        color={currColor}
        onChangeComplete={updateColor}
        className="ColorPicker"
      />
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <TextValidator
          value={newColorName}
          className="CPF-input"
          onChange={(e) => setNewColorName(e.target.value)}
          name="newColorName"
          label="Color Name"
          variant="filled"
          margin="normal"
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "this field is required",
            "Color name must be unique",
            "Color already exists",
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={fullPalette}
          style={{backgroundColor: fullPalette ? "grey" : currColor}}
          className="CPF-btn"
        >
          {fullPalette ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
