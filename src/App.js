import React from "react";
import styled from "styled-components";
import NotFound from "./pages/NotFound";
import SearchCity from "./pages/SearchCity";
import Result from "./pages/Result";
import { API_KEY } from "./config/constants";
import { BASE_URL } from "./config/environment";

const Title = styled.h1`
  display: block;
  height: 64px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
  color: #ffffff;
  transition: 0.3s 1.4s;
  opacity: ${({ showLabel }) => (showLabel ? 1 : 0)};

  ${({ secondary }) =>
    secondary &&
    `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 30px;
    top: 20%;
    text-align: center;
    transition: .5s;
  
    
  `}

  ${({ showResult }) =>
    showResult &&
    `
    opacity: 0;
    visibility: hidden;
    top: 10%;
  `}
`;

const Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;

class App extends React.Component {
  state = {
    value: "",
    weatherInfo: null,
    error: false,
  };

  onInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSearchCity = (e) => {
    e.preventDefault();
    const { value } = this.state;

    const weather = `${BASE_URL}weather?q=${value}&APPID=${API_KEY}&units=metric`;
    const forecast = `${BASE_URL}forecast?q=${value}&APPID=${API_KEY}&units=metric`;

    Promise.all([fetch(weather), fetch(forecast)])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()]);
        }
        throw Error(res1.statusText, res2.statusText);
      })
      .then(([dataWeather, dataForecast]) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "Nocvember",
          "December",
        ];
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`;
        const sunset = new Date(dataWeather.sys.sunset * 1000)
          .toLocaleTimeString()
          .slice(0, 5);
        const sunrise = new Date(dataWeather.sys.sunrise * 1000)
          .toLocaleTimeString()
          .slice(0, 5);

        const weatherInfo = {
          city: dataWeather.name,
          country: dataWeather.sys.country,
          date,
          description: dataWeather.weather[0].description,
          main: dataWeather.weather[0].main,
          temp: dataWeather.main.temp,
          highestTemp: dataWeather.main.temp_max,
          lowestTemp: dataWeather.main.temp_min,
          sunrise,
          sunset,
          clouds: dataWeather.clouds.all,
          humidity: dataWeather.main.humidity,
          wind: dataWeather.wind.speed,
          forecast: dataForecast.list,
        };
        this.setState({
          weatherInfo,
          error: false,
        });
      })
      .catch((error) => {
        console.log(error);

        this.setState({
          error: true,
          weatherInfo: null,
        });
      });
  };

  render() {
    const { value, weatherInfo, error } = this.state;

    return (
      <>
        <Title showLabel={(weatherInfo || error) && true}>Weather app</Title>
        <Wrapper>
          <Title secondary showResult={(weatherInfo || error) && true}>
            Odeon Weather
          </Title>
          <SearchCity
            value={value}
            showResult={(weatherInfo || error) && true}
            change={this.onInputChange}
            submit={this.onSearchCity}
          />
          {weatherInfo && <Result weather={weatherInfo} />}
          {error && <NotFound error={error} />}
        </Wrapper>
      </>
    );
  }
}

export default App;
