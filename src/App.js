import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Box
      item
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundImage: `linear-gradient(135deg, #243746, #5982A1, #8DD0EC)`,
      }}
    >
      <Grid item xs={12} md={5} lg={2.5}>
        <Header />

        <Router basemname={`/${process.env.PUBLIC_URL}`}>
          <Route exact path="/">
            <Home />
          </Route>
        </Router>

        <Footer />
      </Grid>
    </Box>
  );
}

export default App;
