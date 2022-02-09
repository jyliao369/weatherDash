import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Header from "./components/Header";

function App() {
  return (
    <Box>
      <Header />

      <Home />
      {/* <Router>
        <Route exact path="/">
          
        </Route>
        <Route exact path="/version2">
          <Home2 />
        </Route>
      </Router> */}
    </Box>
  );
}

export default App;
