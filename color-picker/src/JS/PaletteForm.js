import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import DraggableColorList from "../JS/DraggableColorList";
import PaletteFormNav from "../JS/PaletteFormNav";
import ColorPickerForm from "../JS/ColorPickerForm";
//Material UI Stuff Starts
import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
//Material UI Stuff Ends
import "../CSS/PaletteForm.css";
import {DRAWER_WIDTH} from "./constants";
import seedColors from "../JS/seedColors";

const drawerWidth = DRAWER_WIDTH;

const Main = styled("main", {shouldForwardProp: (prop) => prop !== "open"})(
  ({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function PaletteForm(props) {
  const maxColors = 20;
  //deconstruct props
  const {savePalette, palettes} = props;

  //set state
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState(seedColors[0].colors);

  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  const saveNewPalette = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    savePalette(newPalette);
    navigate("/");
  };

  const handleDeletion = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const clearColors = () => {
    setColors([]);
  };

  const getRandColor = () => {
    //pick random color from existing palette
    //one way
    // const allColors = palettes.map((p) => p.colors).flat();
    // const filteredArr = allColors.filter((color) => !colors.includes(color));
    // var rand = Math.floor(Math.random() * allColors.length);
    // const randColor = filteredArr[rand];
    // console.log(randColor);
    // setColors([...colors, randColor]);

    //second way
    const usePalette = palettes.length < 3 ? seedColors : palettes;
    const randPaletteIdx = Math.floor(Math.random() * usePalette.length);
    const randPalette = usePalette[randPaletteIdx];
    const filteredPalette = randPalette.colors.filter(
      (color) => !colors.includes(color)
    );
    const randColorIndex = Math.floor(Math.random() * filteredPalette.length);
    const randColor = filteredPalette[randColorIndex];
    setColors([...colors, randColor]);
  };

  const fullPalette = colors.length >= maxColors;

  return (
    <Box sx={{display: "flex"}}>
      <PaletteFormNav
        open={open}
        saveNewPalette={saveNewPalette}
        handleDrawerOpen={handleDrawerOpen}
        palettes={palettes}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className="PaletteFormContainer">
          <Typography variant="h4" gutterBottom>
            Design your palette
          </Typography>

          <div className="PaletteFormBtns">
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className="Btn"
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={getRandColor}
              disabled={fullPalette}
              className="Btn"
            >
              Random Color
            </Button>
          </div>

          <ColorPickerForm
            fullPalette={fullPalette}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
      </Drawer>
      <Main open={open} className="Main">
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          setColors={setColors}
          removeColor={handleDeletion}
          distance={15}
        />
      </Main>
    </Box>
  );
}

export default PaletteForm;
