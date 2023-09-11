import React, {useState} from "react";
import {Link} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

// imports from Material UI
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {blue, red} from "@mui/material/colors";
//

import "../CSS/PaletteList.css";
import MiniPalette from "../JS/MiniPalette";

function PaletteList(props) {
  const {palettes, deletePalette} = props;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const openDialog = (id) => {
    setOpenDeleteDialog(true);
    setDeletingId(id);
  };

  const closeDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingId("");
  };

  const handleDelete = () => {
    deletePalette(deletingId);
    closeDialog();
  };

  return (
    <div className="PaletteList">
      <div className="container">
        <nav className="nav">
          <h1 className="title">Color Picker</h1>
          <Link to="/palette/new" className="PaletteList-link">
            Create Palette
          </Link>
        </nav>
        <TransitionGroup className="palettes">
          {palettes.map((palette) => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
              <MiniPalette
                {...palette}
                key={palette.id}
                id={palette.id}
                // deletePalette={deletePalette}
                openDialog={openDialog}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog open={openDeleteDialog} onClose={closeDialog}>
        <DialogTitle>Delete Palette?</DialogTitle>
        <List>
          <ListItem disableGutters key="delete" onClick={handleDelete}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disableGutters key="close" onClick={closeDialog}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

export default PaletteList;
