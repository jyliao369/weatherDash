import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
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
          <Route exact path="/version2">
            <Home2 />
          </Route>
        </Router>

        <Footer />
      </Grid>
    </Box>
  );
}

export default App;
