import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Box>
      <Grid>
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
