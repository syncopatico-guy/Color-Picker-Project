import React, {useState} from "react";
import {Link} from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../CSS/Navbar.css";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

function Navbar(props) {
  const [state, setState] = useState({
    format: "hex",
    open: false,
  });
  const {level, changeLevel, changeFormat, showSlider} = props;
  const {format, open} = state;

  function handleFormatChange(evt) {
    const {value} = evt.target;
    setState({
      format: value,
      open: true,
    });
    changeFormat(value);
  }
  function handleClose() {
    setState({
      ...state,
      open: false,
    });
  }
  return (
    <nav className="Navbar">
      <div className="logo">
        <Link to="/">ColorPicker</Link>
      </div>
      {/* conditional logic to show slider based on prop passed down */}
      {showSlider && (
        <div>
          <span>Level: {level}</span>

          <div className="slider">
            <Slider
              defaultValue={level}
              trackStyle={{backgroundColor: "transparent"}}
              handleStyle={{
                borderColor: "green",
                outline: "none",
                border: "2px solid green",
                boxShadow: "none",
                width: "13px",
                height: "13px",
                marginLeft: "-7px",
                marginTop: "-3px",
                backgroundColor: "green",
              }}
              railStyle={{height: 8}}
              min={100}
              max={900}
              step={100}
              onChange={changeLevel}
            />
          </div>
        </div>
      )}
      <div className="select-container">
        <Box sx={{minWidth: 120}}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={format}
              label=""
              onChange={handleFormatChange}
            >
              <MenuItem value={"hex"}>Hex - #ffffff</MenuItem>
              <MenuItem value={"rgb"}>RGB - rgb(255,255,255)</MenuItem>
              <MenuItem value={"rgba"}>RGBA - rgba(255,255,255,1.0) </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <Snackbar
        anchorOrigin={{vertical: "bottom", horizontal: "left"}}
        open={open}
        autoHideDuration={3500}
        message={
          <span id="message-id">Format changed to {format.toUpperCase()}</span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        onClose={handleClose}
        action={[
          <IconButton
            onClick={handleClose}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </nav>
  );
}

export default Navbar;
