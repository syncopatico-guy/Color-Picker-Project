import React, {useState} from "react";
import {Link} from "react-router-dom";
import CPFDialog from "../JS/CPFDialog";
import "../CSS/PaletteFormNav.css";
import {DRAWER_WIDTH} from "./constants";
//Material UI Stuff Starts
import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
//Material UI Stuff Ends

const drawerWidth = DRAWER_WIDTH;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function PaletteFormNav(props) {
  const {open, handleDrawerOpen, saveNewPalette, palettes} = props;
  const [formShowing, setFormShowing] = useState(false);

  const showForm = () => {
    setFormShowing(true);
  };

  const hideForm = () => {
    setFormShowing(false);
  };
  return (
    <div className="PaletteFormNav">
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default" className="AppBar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{mr: 2, ...(open && {display: "none"})}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create Palette
          </Typography>
        </Toolbar>
        <div className="NavBtns">
          <Link to="/">
            <Button variant="contained" color="secondary" className="button">
              Go Back
            </Button>
          </Link>
          <Button variant="contained" onClick={showForm} className="button">
            Save Palette
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <CPFDialog
          saveNewPalette={saveNewPalette}
          palettes={palettes}
          hideForm={hideForm}
        />
      )}
    </div>
  );
}

export default PaletteFormNav;
