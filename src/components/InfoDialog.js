import PropTypes from "prop-types";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const InfoDialog = ({ info }) => {
  return (
    <>
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
};

export default InfoDialog;
