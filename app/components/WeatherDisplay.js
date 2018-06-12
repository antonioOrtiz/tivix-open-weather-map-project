import React, { Component } from 'react';
import * as api from '../utils/api';

import '../scss/app.scss';

export default function WeatherDisplay(props) {
  var { weather, dataTracker, checkedItems } = props;
  console.log('dataTracker', dataTracker);

  console.log('itemsState', checkedItems);

  return (
    <div className="weather-display">
      <h1>{weather.name}</h1>
      <h2>{`Current temperature: ${Math.floor(weather.main.temp)}`}</h2>
      <h3>{`Current humidity: ${weather.main.humidity}%`}</h3>

      {checkedItems.map(function(item) {
        if (item) {
          return <h4 key={item}>{dataTracker[item]()}</h4>;
        } else {
          return null;
        }
      })}
    </div>
  );
}
