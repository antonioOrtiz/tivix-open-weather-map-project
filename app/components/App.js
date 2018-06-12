import React, { Component } from 'react';
import WeatherDisplay from './WeatherDisplay';
import * as api from '../utils/api';
import dataTracker from '../utils/dataTracker';

import '../scss/app.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      weatherFromInput: null,
      dataTracker: null,
      checkedItems: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  componentDidMount() {
    console.dir(dataTracker);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  handleCheckboxChange(event) {
    const target = event.target;
    const id = target.id;
    const isChecked = target.checked;
    const { checkedItems } = this.state;

    if (!isChecked) {
      const updatedItems = checkedItems.filter(item => item !== id);

      this.setState({ checkedItems: updatedItems });
      return;
    }

    // Add the new item
    const updatedItems = checkedItems.concat(id);
    // Update state
    this.setState({ checkedItems: updatedItems });
  }

  handleSubmit(event) {
    event.preventDefault();
    var mode = function mode(arr) {
      return arr.reduce(
        function(current, item) {
          var val = (current.numMapping[item] = (current.numMapping[item] || 0) + 1);
          if (val > current.greatestFreq) {
            current.greatestFreq = val;
            current.mode = item;
          }
          return current;
        },
        { mode: null, greatestFreq: -Infinity, numMapping: {} },
        arr
      ).mode;
    };
    var promises = Promise.all([api.getWeather(this.state.input), api.getForecast(this.state.input)]);

    promises.then(
      function(input) {
        var firstSevenDays = input[1].list.slice(0, 7);
        var tempertures = firstSevenDays.map(function(day) {
          return Math.floor(day.main.temp);
        });
        var dataObj = new dataTracker(
          input[0].main.temp_min,
          input[0].main.temp_max,
          input[0].main.temp_min + input[0].main.temp_max / 2,
          mode(tempertures)
        );
        this.setState({ weatherFromInput: input[0], input: '', dataTracker: dataObj });
      }.bind(this)
    );
  }

  render() {
    return (
      <div className="container">
        <div className="container">
          <form name="weatherApp" onSubmit={this.handleSubmit}>
            <h2>Open Weather App</h2>
            <div className="row">
              <div className="one-half column">
                <label htmlFor="insertMode">Insert your location</label>
                <input
                  name="zipcode"
                  className="u-full-width"
                  placeholder="please enter city or zipcode"
                  type="text"
                  autoComplete="off"
                  value={this.state.input}
                  onChange={this.handleChange}
                />
              </div>
              <div className="one-half column">
                <label htmlFor="showMin">show minimum</label>
                <input type="checkbox" id="showMin" onChange={this.handleCheckboxChange} />
                <label htmlFor="showMax">show maximum</label>
                <input type="checkbox" id="showMax" onChange={this.handleCheckboxChange} />
                <label htmlFor="showMean">show mean</label>
                <input type="checkbox" id="showMean" onChange={this.handleCheckboxChange} />
                <label htmlFor="showMode">show mode</label>
                <input type="checkbox" id="showMode" onChange={this.handleCheckboxChange} />
              </div>
            </div>
            <div className="row">
              <div className="two-half column">
                <input type="submit" value="Submit" />
              </div>
            </div>
          </form>
        </div>

        <div className="container">
          <div className="row">
            <div className="twelve columns">
              {this.state.weatherFromInput !== null ? (
                <WeatherDisplay
                  weather={this.state.weatherFromInput}
                  dataTracker={this.state.dataTracker}
                  checkedItems={this.state.checkedItems}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
