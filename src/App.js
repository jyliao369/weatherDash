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
        backgroundImage: `linear-gradient(135deg, #243746, #5982A1, #A6D3D3)`,
      }}
    >
      <Header />
      <Router basename={`/${process.env.PUBLIC_URL}`}>
        <Route exact path="/">
          <Home />
        </Route>
      </Router>
    </Box>
  );
}

export default App;
