import PropTypes from "prop-types";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const InfoDialog = ({ open, info, onClose }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>About picture #{info.id}</DialogTitle>
        <DialogContent>
          <DialogContentText p={1}>Author: {info.author}</DialogContentText>
          <DialogContentText p={1}>Original picture size:</DialogContentText>
          <DialogContentText p={1}>
            width: {info.width}px
            <br />
            height: {info.height}px
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

InfoDialog.propTypes = {
  info: PropTypes.shape({
    author: PropTypes.string,
    download_url: PropTypes.string,
    height: PropTypes.number,
    id: PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.number,
  }),
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default InfoDialog;
