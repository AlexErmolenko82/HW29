import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import * as React from "react";
import Button from "@mui/material/Button";
import resizeImageUrl from "../helpers/resizeImageUrl";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoDialog from "./InfoDialog";

const ImagesList = () => {
  const [imagesList, setImagesList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  const handleButtonClick = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleDialogOpen = (selectedObject) => () => {
    setSelectedImage(selectedObject);
    setDialogOpen(true);
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
        {imagesList.map((element) => (
          <ImageListItem key={element.id}>
            <Box
              onClick={handleDialogOpen(element)}
              key={element.id}
              component="img"
              sx={{
                objectFit: "contain",
                height: "100px",
              }}
              alt={element.download_url}
              src={resizeImageUrl(element.download_url, 100)}
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
      <InfoDialog isOpen={isDialogOpen} info={selectedImage} />
    </Box>
  );
};

export default ImagesList;
