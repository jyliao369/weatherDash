import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

theme.typography.h1 = {
  fontFamily: "ABeeZee",
  fontSize: 35,
};

const Header = () => {
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Grid item sx={{ display: "flex", justifyContent: "center", p: 1 }}>
          <Typography variant="h1">windie</Typography>
        </Grid>
      </ThemeProvider>
    </Box>
  );
};

export default Header;
