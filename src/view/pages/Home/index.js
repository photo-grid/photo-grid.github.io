import React, { createRef, useContext, useEffect, useState } from "react";
import { Context as GridContext } from "../../../context/grid/GridContext";
import { useLocation } from "react-router";
import {
  CssBaseline,
  Container,
  Box,
  ImageList,
  ImageListItem,
  Typography,
} from "@material-ui/core";
import { lightWeightImages } from "../../../config";
import { blue, grey } from "@material-ui/core/colors";

const Home = () => {
  const location = useLocation();
  const isLight = location.search.startsWith("?light=true");
  const {
    state: { images },
    loadImages,
    updateGrid,
  } = useContext(GridContext);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesCount, setSelectedImagesCount] = useState(0);

  useEffect(() => {
    if (!isLight) {
      loadImages();
    }
  }, [isLight]);

  const onImageClick = (image, index) => {
    const filteredSelectedItems = selectedImages.filter(
      (selectedImage) => selectedImage.imageId !== image.id
    );
    if (selectedImages.length === filteredSelectedItems.length) {
      // new selection
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
      // unselection
      setSelectedImages(filteredSelectedItems.map((image, index) => ({
        ...image,
        position: index
      })));
    }
  };

  return (
    <>
      {console.log({ selectedImages })}
      <CssBaseline />
      <Container fixed>
        <Box display="flex" justifyContent="center">
          <ImageList
            sx={{ width: 600, height: "100%" }}
            cols={3}
            rowHeight={200}
          >
            {(isLight ? lightWeightImages : images).map((image, index) => {
              const selectedImage = selectedImages.find(
                (selectedImage) => selectedImage.imageId === image.id
              );
              return (
                <ImageListItem key={image.id}>
                  <img
                    srcSet={image.picture}
                    alt={`ID: ${image.id}`}
                    loading="lazy"
                    style={{
                      backgroundImage: "url('/images/background.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
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
                      style={{
                        position: "absolute",
                        width: "25px",
                        height: "25px",
                      }}
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
            })}
          </ImageList>
        </Box>
      </Container>
    </>
  );
};

export default Home;
