import React from "react";
import { useEffect, useState } from "react";

import { Grid, Box, Typography, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastWeather, setForecastWeather] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [astroWeather, setAstroWeather] = useState({});
  const [sevenForecast, setSevenForecast] = useState({});
  const [loading, setLoading] = useState(true);

  let city = "Lexington,NC";

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
  }, []);

  console.log(forecastWeather);

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

  const theme = createTheme();

  theme.typography.body1 = {
    fontFamily: "Lato",
  };

  if (loading)
    return (
      <Box>
        <h1>Grabbing weather data...</h1>
      </Box>
    );

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Grid
          item
          xs={12}
          md={2.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* THIS IS JUST GIVES THE BASIC SUMMARY OF TODAYS WEATHER */}
          <Paper sx={{ p: 2, m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Grid>
              <Typography>
                {city.split(",")[0]},{" "}
                {currentWeather.location.region.split(" ")[0].charAt(0) +
                  currentWeather.location.region.split(" ")[1].charAt(0)}{" "}
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
                    alignItems: "flex-start",
                  }}
                >
                  <Typography sx={{ fontSize: "2em" }}>
                    {currentWeather.current.feelslike_f}°F
                  </Typography>
                  <Typography sx={{ fontSize: "1.25em" }}>
                    {currentWeather.current.condition.text}
                  </Typography>
                  <Typography>
                    Day {forecastWeather[0].hour[9].temp_f}°F • Night{" "}
                    {forecastWeather[0].hour[9].temp_f}°F
                  </Typography>
                </Grid>
                <Grid>
                  <img
                    src={currentWeather.current.condition.icon}
                    alt="weatherIcon"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS IS FOR TODAYS FORCAST */}
          <Paper sx={{ p: 2, m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Typography>
              {currentWeather.location.name},{" "}
              {currentWeather.location.region.split(" ")[0].charAt(0) +
                currentWeather.location.region.split(" ")[1].charAt(0)}{" "}
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
                <img
                  src={forecastWeather[0].hour[6].condition.icon}
                  alt="weatherIcon"
                />
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
                <img
                  src={forecastWeather[0].hour[12].condition.icon}
                  alt="weatherIcon"
                />
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
                <img
                  src={forecastWeather[0].hour[18].condition.icon}
                  alt="weatherIcon"
                />
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
                <img
                  src={forecastWeather[0].hour[0].condition.icon}
                  alt="weatherIcon"
                />
                <Typography>
                  {forecastWeather[0].hour[0].condition.text}
                </Typography>
                <Typography>{forecastWeather[0].hour[0].humidity}%</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS SHOWS THE HOURLY FORECAST */}
          <Paper sx={{ p: 2, m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
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
                <img
                  src={forecastWeather[0].hour[fiveHour[0][0]].condition.icon}
                  alt="weatherIcon"
                />
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
                <img
                  src={forecastWeather[0].hour[fiveHour[1][0]].condition.icon}
                  alt="weatherIcon"
                />
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
                <img
                  src={forecastWeather[0].hour[fiveHour[2][0]].condition.icon}
                  alt="weatherIcon"
                />
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
                <img
                  src={forecastWeather[0].hour[fiveHour[3][0]].condition.icon}
                  alt="weatherIcon"
                />
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
                <img
                  src={forecastWeather[0].hour[fiveHour[4][0]].condition.icon}
                  alt="weatherIcon"
                />
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
          <Paper sx={{ p: 2, m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>
                Weather Today in {currentWeather.location.name},{" "}
                {currentWeather.location.region.split(" ")[0].charAt(0) +
                  currentWeather.location.region.split(" ")[1].charAt(0)}
              </Typography>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid>
                  <Typography>
                    {currentWeather.current.feelslike_f}°F
                  </Typography>
                  <Typography>Feels Like</Typography>
                </Grid>
                <img
                  src={currentWeather.current.condition.icon}
                  alt="weatherIcon"
                />
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
          <Paper sx={{ p: 2, m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
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
          <Paper sx={{ p: 2, m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Typography>
              Astronomy in {currentWeather.location.name},{" "}
              {currentWeather.location.region.split(" ")[0].charAt(0) +
                currentWeather.location.region.split(" ")[1].charAt(0)}
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
          <Paper sx={{ p: 2, m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Typography>3-Day Forecast</Typography>
            <Grid
              item
              sx={{
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
                <Typography>Today</Typography>
                <Typography sx={{ fontSize: "1.25em" }}>
                  {forecastWeather[0].day.maxtemp_f}°F
                </Typography>
                <Typography>{forecastWeather[0].day.mintemp_f}°F</Typography>
                <img
                  src={forecastWeather[0].day.condition.icon}
                  alt="weatherIcon"
                />
                {/* <Typography>{forecastWeather[0].day.condition.text}</Typography> */}
                <Typography>
                  {forecastWeather[0].day.daily_chance_of_rain}%
                </Typography>
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
                <Typography>
                  {sevenDay[1]} {forecastWeather[1].date.substr(8, 9)}
                </Typography>
                <Typography sx={{ fontSize: "1.25em" }}>
                  {forecastWeather[1].day.maxtemp_f}°F
                </Typography>
                <Typography>{forecastWeather[1].day.mintemp_f}°F</Typography>
                <img
                  src={forecastWeather[1].day.condition.icon}
                  alt="weatherIcon"
                />
                {/* <Typography>{forecastWeather[1].day.condition.text}</Typography> */}
                <Typography>
                  {forecastWeather[1].day.daily_chance_of_rain}%
                </Typography>
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
                <Typography>
                  {sevenDay[2]} {forecastWeather[2].date.substr(8, 9)}
                </Typography>
                <Typography sx={{ fontSize: "1.25em" }}>
                  {forecastWeather[2].day.maxtemp_f}°F
                </Typography>
                <Typography>{forecastWeather[2].day.mintemp_f}°F</Typography>
                <img
                  src={forecastWeather[2].day.condition.icon}
                  alt="weatherIcon"
                />
                {/* <Typography>{forecastWeather[2].day.condition.text}</Typography> */}
                <Typography>
                  {forecastWeather[2].day.daily_chance_of_rain}%
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* THIS FOR 7 DAY FORECAST */}
          <Paper sx={{ p: 2, m: 1, mr: 1.5, ml: 1.5 }} elevation={5}>
            <Typography>5-Day Forecast</Typography>
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
                <Typography>Today</Typography>
                <Typography>{sevenForecast.data[0].max_temp}</Typography>
                <Typography>{sevenForecast.data[0].min_temp}</Typography>
                <Typography>ICON</Typography>
                <Typography>
                  {sevenForecast.data[0].weather.description}
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
                <Typography>
                  {sevenDay[1]} {sevenForecast.data[1].valid_date.substr(8, 9)}
                </Typography>
                <Typography>{sevenForecast.data[1].max_temp}</Typography>
                <Typography>{sevenForecast.data[1].min_temp}</Typography>
                <Typography>ICON</Typography>
                <Typography>
                  {sevenForecast.data[1].weather.description}
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
                <Typography>
                  {sevenDay[2]} {sevenForecast.data[2].valid_date.substr(8, 9)}
                </Typography>
                <Typography>{sevenForecast.data[2].max_temp}</Typography>
                <Typography>{sevenForecast.data[2].min_temp}</Typography>
                <Typography>ICON</Typography>
                <Typography>
                  {sevenForecast.data[2].weather.description}
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
                <Typography>
                  {sevenDay[3]} {sevenForecast.data[3].valid_date.substr(8, 9)}
                </Typography>
                <Typography>{sevenForecast.data[3].max_temp}</Typography>
                <Typography>{sevenForecast.data[3].min_temp}</Typography>
                <Typography>ICON</Typography>
                <Typography>
                  {sevenForecast.data[3].weather.description}
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
                <Typography>
                  {sevenDay[4]} {sevenForecast.data[4].valid_date.substr(8, 9)}
                </Typography>
                <Typography>{sevenForecast.data[4].max_temp}</Typography>
                <Typography>{sevenForecast.data[4].min_temp}</Typography>
                <Typography>ICON</Typography>
                <Typography>
                  {sevenForecast.data[4].weather.description}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </ThemeProvider>
    </Box>
  );
};

export default Home;
