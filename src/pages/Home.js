import React from "react";
import { useEffect, useState } from "react";

import { Grid, Box, Typography, Paper, TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import StormOutlinedIcon from "@mui/icons-material/StormOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import CompressOutlinedIcon from "@mui/icons-material/CompressOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import FirstQuarter from "../images/First_Quarter.png";
import FullMoon from "../images/Full_Moon.png";
import LastQuarter from "../images/Last_Quarter.png";
import NewMoon from "../images/New_Moon.png";
import WaningQuarter from "../images/Waning_Crescent.png";
import WaningGibbous from "../images/Waning_Gibbous.png";
import WaxingCrescent from "../images/Waxing_Crescent.png";
import WaxingGibbous from "../images/Waxing_Gibbous.png";

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastWeather, setForecastWeather] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [astroWeather, setAstroWeather] = useState({});
  const [sevenForecast, setSevenForecast] = useState({});
  const [loading, setLoading] = useState(true);

  let currentCity = "Raleigh";
  const [city, setCity] = useState(currentCity);
  const [searchedCity, setSearchedCity] = useState("");

  const searchCity = async () => {
    await setCity(searchedCity);
  };

  let main_key = process.env.REACT_APP_API_KEY;
  const current_URL = `https://api.weatherapi.com/v1/current.json?key=${main_key}&q=${city}`;
  const forecast_URL = `https://api.weatherapi.com/v1/forecast.json?key=${main_key}&q=${city}&days=3&aqi=yes&alerts=yes`;
  const airQuality_URL = `https://api.weatherapi.com/v1/current.json?key=${main_key}&q=${city}&aqi=yes`;
  const astro_URL = `https://api.weatherapi.com/v1/astronomy.json?key=${main_key}&q=${city}`;

  let main_key2 = process.env.REACT_APP_API_KEY2;
  const sevenForecast_URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${main_key2}`;

  useEffect(() => {
    (async () => {
      try {
        const res1 = await fetch(current_URL);
        setCurrentWeather(await res1.json());

        const res2 = await fetch(forecast_URL);
        setForecastWeather((await res2.json()).forecast.forecastday);

        const res3 = await fetch(airQuality_URL);
        setAirQuality((await res3.json()).current.air_quality);

        const res4 = await fetch(astro_URL);
        setAstroWeather((await res4.json()).astronomy.astro);

        const res5 = await fetch(sevenForecast_URL);
        setSevenForecast(await res5.json());
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [
    current_URL,
    forecast_URL,
    airQuality_URL,
    astro_URL,
    sevenForecast_URL,
    city,
  ]);

  let todayDay = Date().split(" ")[0];
  let sevenDay = [];
  const getSevenDayofWeek = () => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let dayIndex = "";

    for (let a = 0; a < daysOfWeek.length; a++) {
      if (todayDay === daysOfWeek[a]) {
        dayIndex = a;
        break;
      }
    }

    for (let b = 0; b < 7; b++) {
      sevenDay.push(daysOfWeek[dayIndex]);
      if (dayIndex === daysOfWeek.length - 1) {
        dayIndex = 0;
      } else {
        dayIndex = dayIndex + 1;
      }
    }
  };
  getSevenDayofWeek();

  let currentHour = Date().split(" ")[4].substr(0, 2) + ":00";
  let fiveHour = [];
  const getFiveHour = () => {
    const hours = [
      ["00:00", "12 AM"],
      ["01:00", "1 AM"],
      ["02:00", "2 AM"],
      ["03:00", "3 AM"],
      ["04:00", "4 AM"],
      ["05:00", "5 AM"],
      ["06:00", "6 AM"],
      ["07:00", "7 AM"],
      ["08:00", "8 AM"],
      ["09:00", "9 AM"],
      ["10:00", "10 AM"],
      ["11:00", "11 AM"],
      ["12:00", "12 PM"],
      ["13:00", "1 PM"],
      ["14:00", "2 PM"],
      ["15:00", "3 PM"],
      ["16:00", "4 PM"],
      ["17:00", "5 PM"],
      ["18:00", "6 PM"],
      ["19:00", "7 PM"],
      ["20:00", "8 PM"],
      ["21:00", "9 PM"],
      ["22:00", "10 PM"],
      ["23:00", "11 PM"],
    ];
    let hourIndex = "";

    for (let a = 0; a < hours.length; a++) {
      if (currentHour === hours[a][0]) {
        hourIndex = a;
        break;
      }
    }

    for (let b = 0; b < 5; b++) {
      fiveHour.push([hourIndex, hours[hourIndex][1]]);
      if (hourIndex === hours.length - 1) {
        hourIndex = 0;
      } else {
        hourIndex = hourIndex + 1;
      }
    }
  };
  getFiveHour();

  const getMoonPhaseIcon = (phase) => {
    let moonPhase = phase.split(" ").join("");
    if (moonPhase === "FirstQuarter") {
      return <img alt="moonPhase" src={FirstQuarter} height="75px" />;
    } else if (moonPhase === "FullMoon") {
      return <img alt="moonPhase" src={FullMoon} height="75px" />;
    } else if (moonPhase === "LastQuarter") {
      return <img alt="moonPhase" src={LastQuarter} height="75px" />;
    } else if (moonPhase === "NewMoon") {
      return <img alt="moonPhase" src={NewMoon} height="75px" />;
    } else if (moonPhase === "WaningQuarter") {
      return <img alt="moonPhase" src={WaningQuarter} height="75px" />;
    } else if (moonPhase === "WaningGibbous") {
      return <img alt="moonPhase" src={WaningGibbous} height="75px" />;
    } else if (moonPhase === "WaxingCrescent") {
      return <img alt="moonPhase" src={WaxingCrescent} height="75px" />;
    } else if (moonPhase === "WaxingGibbous") {
      return <img alt="moonPhase" src={WaxingGibbous} height="75px" />;
    }
  };

  const theme = createTheme();

  theme.typography.body1 = {
    fontFamily: "Lato",
  };

  if (loading)
    return (
      <Box height="100vh">
        <h1>Grabbing weather data...</h1>
      </Box>
    );

  return (
    <Box>
      <Grid item sx={{ display: "flex", flexDirection: "column" }}>
        <Grid item sx={{ display: "flex", justifyContent: "center", m: 1 }}>
          <TextField
            size="small"
            sx={{ background: "white", borderRadius: "4px", mr: 1 }}
            onChange={(event) => setSearchedCity(event.target.value)}
          />
          <Button onClick={() => searchCity()} variant="contained">
            <SearchOutlinedIcon />
          </Button>
        </Grid>
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ color: "white" }}>
            Search City or Zip Code
          </Typography>
        </Grid>
      </Grid>

      <ThemeProvider theme={theme}>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mt: 1,
            mb: 1,
          }}
        >
          {/* THIS IS JUST GIVES THE BASIC SUMMARY OF TODAYS WEATHER */}
          <Paper sx={{ m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Grid>
              <Grid item sx={{ p: 1.5, background: "#000040", opacity: ".75" }}>
                <Typography
                  sx={{ fontSize: "1.2em", color: "white", mb: "5px" }}
                >
                  {currentWeather.location.name},{" "}
                  {currentWeather.location.region}
                </Typography>
                <Typography sx={{ fontSize: "1em", color: "white" }}>
                  As of {currentWeather.location.localtime}
                </Typography>
              </Grid>

              <Grid
                item
                sx={{
                  p: 1.5,
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
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "2.25em" }}>
                    {currentWeather.current.feelslike_f}°F
                  </Typography>
                  <Typography sx={{ fontSize: "1.15em" }}>
                    {currentWeather.current.condition.text}
                  </Typography>
                  <Typography sx={{ fontSize: "1.15em" }}>
                    Day {forecastWeather[0].hour[9].temp_f}°F • Night{" "}
                    {forecastWeather[0].hour[9].temp_f}°F
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Grid>
                    <img
                      src={currentWeather.current.condition.icon}
                      alt="weatherIcon"
                      height="100px"
                      width="100px"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS IS FOR TODAYS FORCAST */}
          <Paper sx={{ m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Grid item sx={{ p: 1.5, pb: 0 }}>
              <Typography sx={{ fontSize: "1.2em" }}>
                {currentWeather.location.name}, {currentWeather.location.region}{" "}
                Forecast
              </Typography>
            </Grid>

            <Grid
              item
              sx={{
                p: 1.5,
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
                <Typography sx={{ fontSize: "1.1em", mb: 0.75 }}>
                  Morning
                </Typography>
                <Typography>{forecastWeather[0].hour[6].temp_f}°F</Typography>
                <img
                  src={forecastWeather[0].hour[6].condition.icon}
                  alt="weatherIcon"
                />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "5.5em",
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
                    {forecastWeather[0].hour[6].condition.text
                      .split(" ")
                      .map((word) => (
                        <Typography key={word}>{word}</Typography>
                      ))}
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <BeachAccessOutlinedIcon />
                    <Typography>
                      {forecastWeather[0].hour[6].humidity}%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1em", mb: 0.75 }}>
                  Afternoon
                </Typography>
                <Typography>{forecastWeather[0].hour[12].temp_f}°F</Typography>
                <img
                  src={forecastWeather[0].hour[12].condition.icon}
                  alt="weatherIcon"
                />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "5.5em",
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
                    {forecastWeather[0].hour[12].condition.text
                      .split(" ")
                      .map((word) => (
                        <Typography key={word}>{word}</Typography>
                      ))}
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <BeachAccessOutlinedIcon />
                    <Typography>
                      {forecastWeather[0].hour[12].humidity}%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1em", mb: 0.75 }}>
                  Evening
                </Typography>
                <Typography>{forecastWeather[0].hour[18].temp_f}°F</Typography>
                <img
                  src={forecastWeather[0].hour[18].condition.icon}
                  alt="weatherIcon"
                />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "5.5em",
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
                    {forecastWeather[0].hour[18].condition.text
                      .split(" ")
                      .map((word) => (
                        <Typography key={word}>{word}</Typography>
                      ))}
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <BeachAccessOutlinedIcon />
                    <Typography>
                      {forecastWeather[0].hour[18].humidity}%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1em", mb: 0.75 }}>
                  Overnight
                </Typography>
                <Typography>{forecastWeather[0].hour[0].temp_f}°F</Typography>
                <img
                  src={forecastWeather[0].hour[0].condition.icon}
                  alt="weatherIcon"
                />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "5.5em",
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
                    {forecastWeather[0].hour[0].condition.text
                      .split(" ")
                      .map((word) => (
                        <Typography key={word}>{word}</Typography>
                      ))}
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <BeachAccessOutlinedIcon />
                    <Typography>
                      {forecastWeather[0].hour[0].humidity}%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS SHOWS THE HOURLY FORECAST */}
          <Paper sx={{ m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Grid item sx={{ p: 1.5, pb: 0 }}>
              <Typography sx={{ fontSize: "1.2em" }}>
                Hourly Forecast
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                p: 1.5,
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
                <Typography sx={{ fontSize: "1.1em", mb: 0.75 }}>
                  Now
                </Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[0][0]].temp_f}°F
                </Typography>
                <img
                  src={forecastWeather[0].hour[fiveHour[0][0]].condition.icon}
                  alt="weatherIcon"
                />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "5.5em",
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
                    {forecastWeather[0].hour[fiveHour[0][0]].condition.text
                      .split(" ")
                      .map((word) => (
                        <Typography key={word}>{word}</Typography>
                      ))}
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <BeachAccessOutlinedIcon />
                    <Typography>
                      {forecastWeather[0].hour[fiveHour[0][0]].chance_of_rain}%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1em", mb: 0.75 }}>
                  {fiveHour[1][1]}
                </Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[1][0]].temp_f}°F
                </Typography>
                <img
                  src={forecastWeather[0].hour[fiveHour[1][0]].condition.icon}
                  alt="weatherIcon"
                />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "5.5em",
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
                    {forecastWeather[0].hour[fiveHour[1][0]].condition.text
                      .split(" ")
                      .map((word) => (
                        <Typography key={word}>{word}</Typography>
                      ))}
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <BeachAccessOutlinedIcon />
                    <Typography>
                      {forecastWeather[0].hour[fiveHour[1][0]].chance_of_rain}%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1em", mb: 0.75 }}>
                  {fiveHour[2][1]}
                </Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[2][0]].temp_f}°F
                </Typography>
                <img
                  src={forecastWeather[0].hour[fiveHour[2][0]].condition.icon}
                  alt="weatherIcon"
                />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "5.5em",
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
                    {forecastWeather[0].hour[fiveHour[2][0]].condition.text
                      .split(" ")
                      .map((word) => (
                        <Typography key={word}>{word}</Typography>
                      ))}
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <BeachAccessOutlinedIcon />
                    <Typography>
                      {forecastWeather[0].hour[fiveHour[2][0]].chance_of_rain}%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1em", mb: 0.75 }}>
                  {fiveHour[3][1]}
                </Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[3][0]].temp_f}°F
                </Typography>
                <img
                  src={forecastWeather[0].hour[fiveHour[3][0]].condition.icon}
                  alt="weatherIcon"
                />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "5.5em",
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
                    {forecastWeather[0].hour[fiveHour[3][0]].condition.text
                      .split(" ")
                      .map((word) => (
                        <Typography key={word}>{word}</Typography>
                      ))}
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <BeachAccessOutlinedIcon />
                    <Typography>
                      {forecastWeather[0].hour[fiveHour[3][0]].chance_of_rain}%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1em", mb: 0.75 }}>
                  {fiveHour[4][1]}
                </Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[4][0]].temp_f}°F
                </Typography>
                <img
                  src={forecastWeather[0].hour[fiveHour[4][0]].condition.icon}
                  alt="weatherIcon"
                />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "5.5em",
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
                    {forecastWeather[0].hour[fiveHour[4][0]].condition.text
                      .split(" ")
                      .map((word) => (
                        <Typography key={word}>{word}</Typography>
                      ))}
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <BeachAccessOutlinedIcon />
                    <Typography>
                      {forecastWeather[0].hour[fiveHour[4][0]].chance_of_rain}%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS SHOWS THE WEATHER CONDIIONS FOR THE DAY AND MINOR DETAILS */}
          <Paper sx={{ m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Grid
              item
              sx={{ p: 1.5, pb: 0, display: "flex", flexDirection: "column" }}
            >
              <Grid>
                <Typography sx={{ fontSize: "1.2em" }}>
                  Weather Today in {currentWeather.location.name},{" "}
                  {currentWeather.location.region}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  m: 0.5,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid item>
                  <Typography sx={{ fontSize: "2.25em" }}>
                    {currentWeather.current.feelslike_f}°F
                  </Typography>
                  <Typography sx={{ fontSize: "1.25em" }}>
                    Feels Like
                  </Typography>
                </Grid>
                <img
                  src={currentWeather.current.condition.icon}
                  alt="weatherIcon"
                  height="100px"
                  width="100px"
                />
              </Grid>
            </Grid>
            {/* THIS IS FOR CURRENT WEATHER CONDITIONS */}
            <Grid item sx={{ p: 1.5, pt: 0 }}>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <ThermostatOutlinedIcon />{" "}
                  <Typography sx={{ fontSize: "1.1em" }}>High / Low</Typography>
                </Grid>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {forecastWeather[0].day.maxtemp_f}°F /{" "}
                  {forecastWeather[0].day.mintemp_f}°F
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <AirOutlinedIcon />{" "}
                  <Typography sx={{ fontSize: "1.1em" }}>
                    Wind Direction
                  </Typography>
                </Grid>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {currentWeather.current.wind_dir}
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <AirOutlinedIcon />{" "}
                  <Typography sx={{ fontSize: "1.1em" }}>Wind Speed</Typography>
                </Grid>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {currentWeather.current.wind_mph} mph
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <StormOutlinedIcon />{" "}
                  <Typography sx={{ fontSize: "1.1em" }}>Gust Speed</Typography>
                </Grid>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {currentWeather.current.gust_mph} mph
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <OpacityOutlinedIcon />{" "}
                  <Typography sx={{ fontSize: "1.1em" }}>Humidity</Typography>
                </Grid>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {currentWeather.current.humidity}%
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <CompressOutlinedIcon />{" "}
                  <Typography sx={{ fontSize: "1.1em" }}>Pressure</Typography>
                </Grid>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {currentWeather.current.pressure_in} in.
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <LightModeOutlinedIcon />{" "}
                  <Typography sx={{ fontSize: "1.1em" }}>UV Index</Typography>
                </Grid>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {currentWeather.current.uv} out of 10
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <VisibilityOutlinedIcon />{" "}
                  <Typography sx={{ fontSize: "1.1em" }}>Visibility</Typography>
                </Grid>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {currentWeather.current.vis_miles} miles
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 0,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <DarkModeOutlinedIcon />{" "}
                  <Typography sx={{ fontSize: "1.1em" }}>Moon Phase</Typography>
                </Grid>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {forecastWeather[0].astro.moon_phase}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS SHOWS THE AIR QUALITY OF THE LOCATION */}
          <Paper sx={{ m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Grid item sx={{ p: 1.5 }}>
              <Typography sx={{ fontSize: "1.2em" }}>
                {currentWeather.location.name}, {currentWeather.location.region}{" "}
                Air Quality
              </Typography>
            </Grid>
            <Grid item sx={{ p: 1.5 }}>
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "1.1em" }}>
                  Carbon Monoxide (CO2)
                </Typography>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {Math.floor(airQuality.co)} (μg/m3)
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "1.1em" }}>Ozone (O3)</Typography>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {Math.floor(airQuality.o3)} (μg/m3)
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "1.1em" }}>
                  Sulphur Dioxide (SO2)
                </Typography>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {Math.floor(airQuality.so2)} (μg/m3)
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "1.1em" }}>PM2.5</Typography>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {Math.floor(airQuality.pm2_5)} (μg/m3)
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "1.1em" }}>PM10</Typography>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {Math.floor(airQuality.pm10)} (μg/m3)
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 0,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "1.1em" }}>
                  UK Defra Index
                </Typography>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {airQuality["gb-defra-index"]} out of 10
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS IS FOR ASTRONOMY RELATED TO THE CITY AND LOCATION */}
          <Paper sx={{ m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Grid item sx={{ p: 1.5 }}>
              <Typography sx={{ fontSize: "1.2em" }}>
                Astronomy in {currentWeather.location.name},{" "}
                {currentWeather.location.region}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                p: 1.5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Grid>
                {getMoonPhaseIcon(forecastWeather[0].astro.moon_phase)}
              </Grid>
              <Grid>
                <Typography>Current Moon Phase: </Typography>
                <Typography>{forecastWeather[0].astro.moon_phase}</Typography>
              </Grid>
            </Grid>
            <Grid item sx={{ p: 1.5 }}>
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "1.1em" }}>
                  Moon Illumination
                </Typography>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {astroWeather.moon_illumination}%
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "1.1em" }}>Sunrise</Typography>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {astroWeather.sunrise}
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "1.1em" }}>Sunset</Typography>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {astroWeather.sunset}
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "1.1em" }}>Moonrise</Typography>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {astroWeather.moonrise}
                </Typography>
              </Grid>
              <hr />
              <Grid
                item
                sx={{
                  mt: 1.25,
                  mb: 1.25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "1.1em" }}>Moonset</Typography>
                <Typography sx={{ fontSize: "1.1em" }}>
                  {astroWeather.moonset}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS FOR 3 DAY FORECAST */}
          <Paper sx={{ m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Grid item sx={{ p: 1.5 }}>
              <Typography sx={{ fontSize: "1.2em" }}>3-Day Forecast</Typography>
            </Grid>
            <Grid
              item
              sx={{
                p: 1.5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1em", mb: 0.75 }}>
                  Today
                </Typography>
                <Typography sx={{ fontSize: "1.25em", mb: 0.75 }}>
                  {forecastWeather[0].day.maxtemp_f}°F
                </Typography>
                <Typography>{forecastWeather[0].day.mintemp_f}°F</Typography>
                <img
                  src={forecastWeather[0].day.condition.icon}
                  alt="weatherIcon"
                />
                {/* <Typography>{forecastWeather[0].day.condition.text}</Typography> */}
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <BeachAccessOutlinedIcon />
                  <Typography>
                    {forecastWeather[0].day.daily_chance_of_rain}%
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1em", mb: 0.75 }}>
                  {sevenDay[1]} {forecastWeather[1].date.substr(8, 9)}
                </Typography>
                <Typography sx={{ fontSize: "1.25em", mb: 0.75 }}>
                  {forecastWeather[1].day.maxtemp_f}°F
                </Typography>
                <Typography>{forecastWeather[1].day.mintemp_f}°F</Typography>
                <img
                  src={forecastWeather[1].day.condition.icon}
                  alt="weatherIcon"
                />
                {/* <Typography>{forecastWeather[1].day.condition.text}</Typography> */}
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <BeachAccessOutlinedIcon />
                  <Typography>
                    {forecastWeather[1].day.daily_chance_of_rain}%
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.1em", mb: 0.75 }}>
                  {sevenDay[2]} {forecastWeather[2].date.substr(8, 9)}
                </Typography>
                <Typography sx={{ fontSize: "1.25em", mb: 0.75 }}>
                  {forecastWeather[2].day.maxtemp_f}°F
                </Typography>
                <Typography>{forecastWeather[2].day.mintemp_f}°F</Typography>
                <img
                  src={forecastWeather[2].day.condition.icon}
                  alt="weatherIcon"
                />
                {/* <Typography>{forecastWeather[2].day.condition.text}</Typography> */}
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <BeachAccessOutlinedIcon />
                  <Typography>
                    {forecastWeather[2].day.daily_chance_of_rain}%
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS FOR 7 DAY FORECAST */}
          <Paper sx={{ m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Grid item sx={{ p: 1.5, pb: 0 }}>
              <Typography>5-Day Forecast</Typography>
            </Grid>
            <Grid
              item
              sx={{
                p: 1.5,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography>Today</Typography>
                  <Typography>
                    {sevenForecast.data[0].max_temp} /{" "}
                    {sevenForecast.data[0].min_temp}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    width: "7.25em",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography>
                    {sevenForecast.data[0].weather.description}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography>
                    {sevenDay[1]}{" "}
                    {sevenForecast.data[1].valid_date.substr(8, 9)}
                  </Typography>
                  <Typography>
                    {sevenForecast.data[1].max_temp} /{" "}
                    {sevenForecast.data[1].min_temp}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    width: "7.25em",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography>
                    {sevenForecast.data[1].weather.description}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography>
                    {sevenDay[2]}{" "}
                    {sevenForecast.data[2].valid_date.substr(8, 9)}
                  </Typography>
                  <Typography>
                    {sevenForecast.data[2].max_temp} /{" "}
                    {sevenForecast.data[2].min_temp}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    width: "7.25em",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography>
                    {sevenForecast.data[2].weather.description}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography>
                    {sevenDay[3]}{" "}
                    {sevenForecast.data[3].valid_date.substr(8, 9)}
                  </Typography>
                  <Typography>
                    {sevenForecast.data[3].max_temp} /{" "}
                    {sevenForecast.data[3].min_temp}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    width: "7.25em",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography>
                    {sevenForecast.data[3].weather.description}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography>
                    {sevenDay[4]}{" "}
                    {sevenForecast.data[4].valid_date.substr(8, 9)}
                  </Typography>
                  <Typography>
                    {sevenForecast.data[4].max_temp} /{" "}
                    {sevenForecast.data[4].min_temp}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    width: "7.25em",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography>
                    {sevenForecast.data[4].weather.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </ThemeProvider>
    </Box>
  );
};

export default Home;
