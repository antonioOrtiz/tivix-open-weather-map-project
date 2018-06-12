import axios from 'axios';

var key = '57b4067329333c5573c67f32a172d2ab';
var countryCode = 'us';

export const getWeather = input => {
  if (!Number.isNaN(input)) {
    var city = input;
    return axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&${countryCode}&appid=${key}`)
      .then(resp => resp.data);
  }
  return axios
    .get(`http://api.openweathermap.org/data/2.5/weather?zip=${input}&units=imperial&${countryCode}&appid=${key}`)
    .then(resp => resp.data);
};

export const getForecast = input => {
  if (!Number.isNaN(input)) {
    var city = input;
    return axios
      .get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&${countryCode}&appid=${key}`)
      .then(resp => resp.data);
  }
  return axios
    .get(`http://api.openforecastmap.org/data/2.5/forecast?zip=${input}&units=imperial&${countryCode}&appid=${key}`)
    .then(resp => resp.data);
};
