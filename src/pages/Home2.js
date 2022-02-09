import React from "react";
import { useEffect, useState } from "react";

import { Grid, Box, Typography, Paper } from "@mui/material";

const Home2 = () => {
  // const [weatherData0, setWeatherData0] = useState({});
  // const [weatherData, setWeatherData] = useState({});
  // const [weatherData2, setWeatherData2] = useState({});
  const [loading, setLoading] = useState(true);

  const API_URL1 =
    "https://api.weatherapi.com/v1/forecast.json?key=5f6f81baec5847c4aad01156220302&q=raleigh&days=1&aqi=no&alerts=no";

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(API_URL1);
        const json = await response.json();
        console.log("test");
        console.log(json);
      } catch (e) {
        console.log(e);
      }
    })();

    setLoading(false);
  }, []);

  if (loading)
    return (
      <Box>
        <h1>Grabbing Weather Data</h1>
      </Box>
    );

  return (
    <Box>
      <Grid item sx={{ display: "flex", flexDirection: "column" }}>
        {/* THIS IS A FIRST GLIMPS SUMMARY */}
        <Paper sx={{ p: 2, m: 2 }} elevation={5}>
          <Grid>
            <Typography></Typography>
          </Grid>
        </Paper>
        {/* THIS IS FOR TODAY's FORECAST AND HOURLY */}
        <Grid>
          <Paper sx={{ p: 2, m: 2 }} elevation={5}>
            <Grid>
              <Typography></Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography>Morning</Typography>
                <Typography></Typography>
                <Typography></Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography>Afternoon</Typography>
                <Typography></Typography>
                <Typography></Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography>Evening</Typography>
                <Typography></Typography>
                <Typography></Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography>Overnight</Typography>
                <Typography></Typography>
                <Typography></Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* THIS IS FOR MORE IN-DEPTH DETAIL OF TODAYS WEATHER */}
        <Paper sx={{ p: 2, m: 2 }} elevation={5}>
          <Grid>
            <Typography></Typography>
          </Grid>
          <Grid>
            <Grid>
              <Typography></Typography>
              <Typography>Feels Like</Typography>
            </Grid>
          </Grid>
          <hr />
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>High/Low</Typography>
            <Typography></Typography>
          </Grid>
          <hr />
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Wind Speed</Typography>
            <Typography></Typography>
          </Grid>
          <hr />
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Wind Direction</Typography>
            <Typography></Typography>
          </Grid>
          <hr />
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Humidity</Typography>
            <Typography></Typography>
          </Grid>
          <hr />
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Dew Point</Typography>
            <Typography></Typography>
          </Grid>
          <hr />
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Pressure</Typography>
            <Typography></Typography>
          </Grid>
          <hr />
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>UV Index</Typography>
            <Typography></Typography>
          </Grid>
          <hr />
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Visibility</Typography>
            <Typography></Typography>
          </Grid>
          <hr />
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Moon Phase</Typography>
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Home2;
