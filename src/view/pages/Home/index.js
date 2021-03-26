import React from "react";
import ImageSelector from "../../components/ImageSelector";
import { Container, CssBaseline, Grid } from "@material-ui/core";

const Home = () => {
  return (
    <>
     <CssBaseline />
      <Container fixed>
        <Grid container justifyItems="center" alignItems="center">
          <Grid item xs={6}>
            <ImageSelector />
          </Grid>
          <Grid item xs={6}>

          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
