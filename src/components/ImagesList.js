import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import * as React from "react";
import Button from "@mui/material/Button";
import resizeImageUrl from "../helpers/resizeImageUrl";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ImagesList = () => {
  const [imagesList, setImagesList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  const handleButtonClick = () => {
    setPageNumber(pageNumber + 1);
  };
  const handleDialogOpen = (id) => () => {
    const selectedImg = imagesList.filter((images) => images.id === id);
    setSelectedImage({
      id: selectedImg[0].id,
      author: selectedImg[0].author,
      width: selectedImg[0].width,
      height: selectedImg[0].height,
    });
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/v2/list", {
        params: {
          page: pageNumber,
          limit: 10,
        },
      })
      .then((data) => {
        setImagesList((newImageList) => [...imagesList, ...data]);
        setLoading(false);
      });
  }, [pageNumber]);

  return (
    <Box
      component="div"
      sx={{
        margin: "auto",
        width: "500px",
        textAlign: "center",
        fontFamily: "Roboto",
        color: "blue",
      }}
    >
      <Typography variant="h5" component="h1">
        Image gallery
      </Typography>
      <ImageList cols={2}>
        {imagesList.map(({ id, download_url }) => (
          <ImageListItem key={id}>
            <Box
              onClick={handleDialogOpen(id)}
              key={id}
              component="img"
              sx={{
                objectFit: "contain",
                height: "100px",
              }}
              alt={download_url}
              src={resizeImageUrl(download_url, 100)}
            />
          </ImageListItem>
        ))}
      </ImageList>
      {isLoading ? (
        <Button variant="contained">loading...</Button>
      ) : (
        <Button variant="contained" onClick={handleButtonClick}>
          show more
        </Button>
      )}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>About picture #{selectedImage.id}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Author: {selectedImage.author}
            <br />
            Original picture size
            <br />
            width: {selectedImage.width}
            <br />
            height: {selectedImage.height}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImagesList;
