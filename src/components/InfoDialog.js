import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const InfoDialog = ({ isOpen, info }) => {
  console.log("InfoDialog.props.isOpen:", isOpen);

  const handleDialogClose = () => {
    isOpen = false;
    console.log("InfoDialog.props.isOpen after close button:", isOpen);
  };

  return (
    <Dialog open={isOpen} onClose={handleDialogClose}>
      <DialogTitle>About picture #{info.id}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Author: {info.author}
          <br />
          Original picture size
          <br />
          width: {info.width}px
          <br />
          height: {info.height}px
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
