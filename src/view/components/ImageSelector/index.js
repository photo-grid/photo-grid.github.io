import React, { useContext, useEffect, useState } from "react";
import { Context as GridContext } from "../../../context/grid/GridContext";
import { useLocation } from "react-router";
import {
  CssBaseline,
  Container,
  Box,
  ImageList,
  ImageListItem,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { grey } from "@material-ui/core/colors";
import { lightWeightImages } from "../../../config";

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: "url('/images/background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    display: "inline-block",
    verticalAlign: "middle",
  },
  numberLabel: {
    position: "absolute",
    width: "25px",
    height: "25px",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ImageSelector = () => {
  const classes = useStyles();
  const location = useLocation();
  const isLight = location.search.startsWith("?light=true");
  const {
    state: {
      images,
      imagesError,
      imagesProcessing,
      grid,
      gridError,
      gridProcessing,
    },
    loadImages,
    updateGrid,
  } = useContext(GridContext);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (!isLight) {
      loadImages();
    }
  }, [isLight]);

  const buildImageGridView = () =>
    (isLight ? lightWeightImages : images).map((image, index) => {
      const selectedImage = selectedImages.find(
        (selectedImage) => selectedImage.imageId === image.id
      );
      return (
        <ImageListItem key={image.id}>
          <img
            srcSet={image.picture}
            alt={`ID: ${image.id}`}
            loading="lazy"
            className={classes.image}
            onClick={() => {
              onImageClick(image, index);
            }}
          />
          {selectedImage && (
            <Box
              display="flex"
              justifyContent="center"
              bgcolor="rgba(0, 0, 0, 0.55)"
              p={1}
              className={classes.numberLabel}
            >
              <Box display="flex" alignItems="center">
                <Typography variant="h6" color={grey[400]}>
                  {selectedImage.position + 1}
                </Typography>
              </Box>
            </Box>
          )}
        </ImageListItem>
      );
    });

  const onImageClick = (image, index) => {
    const filteredSelectedItems = selectedImages.filter(
      (selectedImage) => selectedImage.imageId !== image.id
    );
    if (selectedImages.length === filteredSelectedItems.length) {
      if (selectedImages.length < 9) {
        setSelectedImages([
          ...filteredSelectedItems,
          {
            imageId: image.id,
            imageURL: image.picture,
            position: selectedImages.length,
          },
        ]);
      }
    } else {
      setSelectedImages(
        filteredSelectedItems.map((image, index) => ({
          ...image,
          position: index,
        }))
      );
    }
  };

  const onSavePress = () => {
    updateGrid(selectedImages);
  };

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Box display="flex" justifyContent="center">
          <ImageList sx={{ width: 600, height: 600 }} cols={3} rowHeight={200}>
            {buildImageGridView()}
          </ImageList>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            disabled={selectedImages.length !== 9 || gridProcessing}
            onClick={onSavePress}
          >
            Save
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ImageSelector;
