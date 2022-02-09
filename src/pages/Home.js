import React from "react";
import { useEffect, useState } from "react";

import { Grid, Box, Typography, Paper } from "@mui/material";

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastWeather, setForecastWeather] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [astroWeather, setAstroWeather] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(
    "trying to get it up on git hub pages for a whdjfhsafdffffffffffffffffffffffffffffffffffffffff"
  );

  let city = "Lexington,NC";
  let main_key = "5f6f81baec5847c4aad01156220302";

  console.log(process.env.REACT_APP_API_TEST);

  const current_URL = `http://api.weatherapi.com/v1/current.json?key=${main_key}&q=${city}`;
  const airQuality_URL = `http://api.weatherapi.com/v1/current.json?key=${main_key}&q=${city}&aqi=yes`;
  const forecast_URL = `http://api.weatherapi.com/v1/forecast.json?key=${main_key}&q=${city}&days=3&aqi=yes&alerts=yes`;
  const astro_URL = `https://api.weatherapi.com/v1/astronomy.json?key=${main_key}&q=${city}`;

  useEffect(() => {
    fetch(current_URL)
      .then((response) => response.json())
      .then((data) => {
        setCurrentWeather(data);
      });
    fetch(airQuality_URL)
      .then((response) => response.json())
      .then((data) => {
        setAirQuality(data.current.air_quality);
      });
    fetch(forecast_URL)
      .then((response) => response.json())
      .then((data) => {
        setForecastWeather(data.forecast.forecastday);
      });
    fetch(astro_URL)
      .then((response) => response.json())
      .then((data) => {
        setAstroWeather(data.astronomy.astro);
        setLoading(false);
      });
  }, []);

  // console.log(currentWeather);
  // console.log(forecastWeather);
  // console.log(airQuality);
  // console.log(astroWeather);

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
  // console.log(fiveHour);

  if (loading)
    return (
      <Box>
        <h1>Grabbing weather data...</h1>
      </Box>
    );

  return (
    <Box>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12}>
          {/* THIS IS JUST GIVES THE BASIC SUMMARY OF TODAYS WEATHER */}
          <Paper sx={{ p: 2, m: 2 }} elevation={5}>
            <Grid>
              <Typography>
                {currentWeather.location.name}, {currentWeather.location.region}{" "}
                As of {currentWeather.location.localtime}
              </Typography>
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
                  <Typography>
                    {currentWeather.current.feelslike_f}°F
                  </Typography>
                  <Typography>
                    {currentWeather.current.condition.text}
                  </Typography>
                  <Typography>
                    Day {forecastWeather[0].hour[9].temp_f}°F • Night{" "}
                    {forecastWeather[0].hour[9].temp_f}°F
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS IS FOR TODAYS FORCAST */}
          <Paper sx={{ p: 2, m: 2 }} elevation={5}>
            <Typography>
              {currentWeather.location.name}, {currentWeather.location.region}{" "}
              Forecast
            </Typography>
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
                <Typography>{forecastWeather[0].hour[6].temp_f}°F</Typography>
                <Typography>icon</Typography>
                <Typography>
                  {forecastWeather[0].hour[6].condition.text}
                </Typography>
                <Typography>{forecastWeather[0].hour[6].humidity}%</Typography>
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
                <Typography>{forecastWeather[0].hour[12].temp_f}°F</Typography>
                <Typography>icon</Typography>
                <Typography>
                  {forecastWeather[0].hour[12].condition.text}
                </Typography>
                <Typography>{forecastWeather[0].hour[12].humidity}%</Typography>
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
                <Typography>{forecastWeather[0].hour[18].temp_f}°F</Typography>
                <Typography>icon</Typography>
                <Typography>
                  {forecastWeather[0].hour[18].condition.text}
                </Typography>
                <Typography>{forecastWeather[0].hour[18].humidity}%</Typography>
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
                <Typography>{forecastWeather[0].hour[0].temp_f}°F</Typography>
                <Typography>icon</Typography>
                <Typography>
                  {forecastWeather[0].hour[0].condition.text}
                </Typography>
                <Typography>{forecastWeather[0].hour[0].humidity}%</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS SHOWS THE HOURLY FORECAST */}
          <Paper sx={{ p: 2, m: 2 }} elevation={5}>
            <Typography>Hourly Forecast</Typography>
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
                <Typography>Now</Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[0][0]].temp_f}°F
                </Typography>
                <Typography>ICON</Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[0][0]].condition.text}
                </Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[0][0]].chance_of_rain}%
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
                <Typography>{fiveHour[1][1]}</Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[1][0]].temp_f}°F
                </Typography>
                <Typography>ICON</Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[1][0]].condition.text}
                </Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[1][0]].chance_of_rain}%
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
                <Typography>{fiveHour[2][1]}</Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[2][0]].temp_f}°F
                </Typography>
                <Typography>ICON</Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[2][0]].condition.text}
                </Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[2][0]].chance_of_rain}%
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
                <Typography>{fiveHour[3][1]}</Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[3][0]].temp_f}°F
                </Typography>
                <Typography>ICON</Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[3][0]].condition.text}
                </Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[3][0]].chance_of_rain}%
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
                <Typography>{fiveHour[4][1]}</Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[4][0]].temp_f}°F
                </Typography>
                <Typography>ICON</Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[4][0]].condition.text}
                </Typography>
                <Typography>
                  {forecastWeather[0].hour[fiveHour[4][0]].chance_of_rain}%
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS SHOWS THE WEATHER CONDIIONS FOR THE DAY AND MINOR DETAILS */}
          <Paper sx={{ p: 2, m: 2 }} elevation={5}>
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>
                Weather Today in {currentWeather.location.name},{" "}
                {currentWeather.location.region}
              </Typography>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Grid>
                  <Typography>
                    {currentWeather.current.feelslike_f}°F
                  </Typography>
                  <Typography>Feels Like</Typography>
                </Grid>
                <Grid>Icon</Grid>
              </Grid>
            </Grid>

            {/* THIS IS FOR CURRENT WEATHER CONDITIONS */}
            <Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography>High / Low</Typography>
                <Typography>
                  {forecastWeather[0].day.maxtemp_f}°F /{" "}
                  {forecastWeather[0].day.mintemp_f}°F
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
                <Typography>Wind Direction</Typography>
                <Typography>{currentWeather.current.wind_dir}</Typography>
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
                <Typography>{currentWeather.current.wind_mph} mph</Typography>
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
                <Typography>Gust Speed</Typography>
                <Typography>{currentWeather.current.gust_mph} mph</Typography>
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
                <Typography>{currentWeather.current.humidity}%</Typography>
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
                <Typography>
                  {currentWeather.current.pressure_in} in.
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
                <Typography>UV Index</Typography>
                <Typography>{currentWeather.current.uv} out of 10</Typography>
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
                <Typography>
                  {currentWeather.current.vis_miles} miles
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
                <Typography>Moon Phase</Typography>
                <Typography>{forecastWeather[0].astro.moon_phase}</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS SHOWS THE AIR QUALITY OF THE LOCATION */}
          <Paper sx={{ p: 2, m: 2 }} elevation={5}>
            <Typography>
              {currentWeather.location.name}, {currentWeather.location.region}{" "}
              Air Quality
            </Typography>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography>Carbon Monoxide (CO2)</Typography>
              <Typography>{Math.floor(airQuality.co)} (μg/m3)</Typography>
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
              <Typography>Ozone (O3)</Typography>
              <Typography>{Math.floor(airQuality.o3)} (μg/m3)</Typography>
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
              <Typography>Sulphur Dioxide (SO2)</Typography>
              <Typography>{Math.floor(airQuality.so2)} (μg/m3)</Typography>
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
              <Typography>PM2.5</Typography>
              <Typography>{Math.floor(airQuality.pm2_5)} (μg/m3)</Typography>
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
              <Typography>PM10</Typography>
              <Typography>{Math.floor(airQuality.pm10)} (μg/m3)</Typography>
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
              <Typography>UK Defra Index</Typography>
              <Typography>{airQuality["gb-defra-index"]} out of 10</Typography>
            </Grid>
          </Paper>

          {/* THIS IS FOR ASTRONOMY RELATED TO THE CITY AND LOCATION */}
          <Paper sx={{ p: 2, m: 2 }} elevation={5}>
            <Typography>
              Astronomy in {currentWeather.location.name},{" "}
              {currentWeather.location.region}
            </Typography>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography>Moon Illumination</Typography>
              <Typography>{astroWeather.moon_illumination}%</Typography>
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
              <Typography>Sunrise</Typography>
              <Typography>{astroWeather.sunrise}</Typography>
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
              <Typography>Sunset</Typography>
              <Typography>{astroWeather.sunset}</Typography>
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
              <Typography>Moonrise</Typography>
              <Typography>{astroWeather.moonrise}</Typography>
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
              <Typography>Moonset</Typography>
              <Typography>{astroWeather.moonset}</Typography>
            </Grid>
          </Paper>

          {/* THIS FOR 3 DAY FORECAST */}
          <Paper sx={{ p: 2, m: 2 }} elevation={5}>
            <Typography>3-Day Forecast</Typography>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>Today</Typography>
                <Typography></Typography>
              </Grid>
              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>
                  {sevenDay[1]} {forecastWeather[1].date.substr(8, 9)}
                </Typography>
                <Typography></Typography>
              </Grid>
              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>
                  {sevenDay[2]} {forecastWeather[2].date.substr(8, 9)}
                </Typography>
                <Typography></Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS FOR 7 DAY FORECAST */}
          <Paper sx={{ p: 2, m: 2 }} elevation={5}>
            <Typography>7-Day Forecast</Typography>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>Today</Typography>
                <Typography></Typography>
              </Grid>
              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>{sevenDay[1]}</Typography>
                <Typography></Typography>
              </Grid>
              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>{sevenDay[2]}</Typography>
                <Typography></Typography>
              </Grid>
              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>{sevenDay[3]}</Typography>
                <Typography></Typography>
              </Grid>
              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>{sevenDay[4]}</Typography>
                <Typography></Typography>
              </Grid>
              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>{sevenDay[5]}</Typography>
                <Typography></Typography>
              </Grid>
              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>{sevenDay[6]}</Typography>
                <Typography></Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Box>
  );
};

export default Home;
