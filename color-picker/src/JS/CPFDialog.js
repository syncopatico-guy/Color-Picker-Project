import React, {useState, useEffect} from "react";
//Material UI Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//******* */
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import Picker from "@emoji-mart/react";

function CPFDialog(props) {
  const {palettes, saveNewPalette, hideForm} = props;
  const [stage, setStage] = useState("form");
  const [newPaletteName, setNewPaletteName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPNameUnique", (value) => {
      return palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const showEmojiPicker = () => {
    setStage("emoji");
  };

  function savePalette(emoji) {
    const newPalette = {paletteName: newPaletteName, emoji: emoji.native};
    saveNewPalette(newPalette);
    setStage("");
  }

  // saveNewPalette(newPaletteName);
  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={hideForm}>
        <Picker onEmojiSelect={savePalette} />
      </Dialog>
      <Dialog open={stage === "form"} onClose={hideForm}>
        <DialogTitle>Choose Palette Name</DialogTitle>{" "}
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>Please enter a palette name. </DialogContentText>
            <TextValidator
              value={newPaletteName}
              onChange={(e) => setNewPaletteName(e.target.value)}
              name="newPaletteName"
              label="Palette Name"
              margin="normal"
              fullWidth
              validators={["required", "isPNameUnique"]}
              errorMessages={[
                "enter palette name",
                "Palette Name already exists",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
            <Button onClick={hideForm}>Cancel</Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default CPFDialog;
