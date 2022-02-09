import React from "react";
import { useEffect, useState } from "react";

import { Grid, Box, Typography, Paper } from "@mui/material";

const Home2 = () => {
  const [weatherData0, setWeatherData0] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [weatherData2, setWeatherData2] = useState({});
  const [loading, setLoading] = useState(true);

  const API_URL1 =
    "https://api.weatherapi.com/v1/forecast.json?key=5f6f81baec5847c4aad01156220302&q=raleigh&days=1&aqi=no&alerts=no";

  const API_URL2 =
    "https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=5d192ad5542349b58363cc5c93939a5f&include=minutely";

  const API_URL3 =
    "https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=5d192ad5542349b58363cc5c93939a5f";

  useEffect(() => {
    fetch(API_URL1)
      .then((response) => response.json())
      .then((data) => {
        console.log("test");
        console.log(data);
        setWeatherData0(data);
      });
    fetch(API_URL2)
      .then((response) => response.json())
      .then((data) => {
        // console.log("test");
        // console.log(data);
        setWeatherData(data);
      });
    fetch(API_URL3)
      .then((response) => response.json())
      .then((data) => {
        // console.log("test");
        // console.log(data);
        setWeatherData2(data);
        setLoading(false);
      });
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
            <Typography>
              {weatherData.data[0].city_name}, {weatherData.data[0].state_code}{" "}
              As of {weatherData.data[0].ob_time}
            </Typography>
          </Grid>
        </Paper>
        {/* THIS IS FOR TODAY's FORECAST AND HOURLY */}
        <Grid>
          <Paper sx={{ p: 2, m: 2 }} elevation={5}>
            <Grid>
              <Typography>
                {weatherData.data[0].city_name},{" "}
                {weatherData.data[0].state_code} Forecast
              </Typography>
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
                <Typography>
                  {weatherData0.forecast.forecastday[0].hour[6].feelslike_c}°C
                </Typography>
                <Typography>
                  {weatherData0.forecast.forecastday[0].hour[6].condition.text}
                </Typography>
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
                <Typography>
                  {weatherData0.forecast.forecastday[0].hour[12].feelslike_c}°C
                </Typography>
                <Typography>
                  {weatherData0.forecast.forecastday[0].hour[12].condition.text}
                </Typography>
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
                <Typography>
                  {weatherData0.forecast.forecastday[0].hour[18].feelslike_c}°C
                </Typography>
                <Typography>
                  {weatherData0.forecast.forecastday[0].hour[18].condition.text}
                </Typography>
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
                <Typography>
                  {weatherData0.forecast.forecastday[0].hour[0].feelslike_c}°C
                </Typography>
                <Typography>
                  {weatherData0.forecast.forecastday[0].hour[0].condition.text}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* THIS IS FOR MORE IN-DEPTH DETAIL OF TODAYS WEATHER */}
        <Paper sx={{ p: 2, m: 2 }} elevation={5}>
          <Grid>
            <Typography>
              Weather Today in {weatherData.data[0].city_name},{" "}
              {weatherData.data[0].state_code}
            </Typography>
          </Grid>
          <Grid>
            <Grid>
              <Typography>{weatherData.data[0].app_temp}°C</Typography>
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
            <Typography>
              {weatherData2.data[0].high_temp}°C/{weatherData2.data[0].low_temp}
              °C
            </Typography>
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
            <Typography>{weatherData.data[0].wind_spd} mph</Typography>
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
            <Typography>{weatherData.data[0].wind_cdir_full}</Typography>
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
            <Typography>{weatherData.data[0].rh}%</Typography>
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
            <Typography>{weatherData.data[0].dewpt}°C</Typography>
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
            <Typography>{weatherData.data[0].pres} mb</Typography>
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
            <Typography>{weatherData.data[0].uv} of 10</Typography>
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
            <Typography>{weatherData.data[0].vis} km</Typography>
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
