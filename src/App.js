import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Header from "./components/Header";

function App() {
  return (
    <Box>
      <Header />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/version2">
          <Home2 />
        </Route>
      </Router>
    </Box>
  );
}

export default App;
