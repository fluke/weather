import React, { Component } from 'react';
import './App.css';
import xhr from 'xhr';
import { connect } from 'react-redux';

import Plot from './Plot.js'

import {
  changeAddress,
  setSelectedTemp,
  setSelectedDate,
  setTemps,
  setDates
} from './actions';

class App extends Component {

  fetchData = (event) => {
    event.preventDefault();
    var location = encodeURIComponent(this.props.address);
    var urlPrefix = "http://api.openweathermap.org/data/2.5/forecast?APPID=3e83a72f86b83f5d62ee2c81a20003f0&units=metric&q=";

    var url = urlPrefix + location;

    var self = this;

    xhr({
      url: url
    }, function(err, data) {
      var list = JSON.parse(data.body).list, 
          dates = [], 
          temps = [];
      
      for (var i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temps.push(list[i].main.temp);
      }
      
      self.props.dispatch(setTemps(temps));
      self.props.dispatch(setDates(dates));
      self.props.dispatch(setSelectedTemp(null));
      self.props.dispatch(setSelectedDate(''));
    });
  };

  changeAddress = (event) => {
    this.props.dispatch(changeAddress(event.target.value));
  };

  onPlotClick = (data) => {
    if (data.points) {
      var number = data.points[0].pointNumber;
      this.props.dispatch(setSelectedTemp(this.props.temps[number]));
      this.props.dispatch(setSelectedDate(this.props.dates[number]));
    }
  };

  render() {
    var currentTemp = 'not loaded yet';
    if (this.props.temps.length > 0) {
      currentTemp = this.props.temps[0];
    }
    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>I want to know the weather for
            <input
              placeholder={"City, Country"}
              type="text"
              value={this.props.address}
              onChange={this.changeAddress}
            />
          </label>
        </form>
        {(this.props.temps.length > 0) ? (
          <div className="wrapper">
            {(this.props.selected.temp) ? (
              <p>The temperature on { this.props.selected.date } will be { this.props.selected.temp }°C</p>
            ) : (
              <p>The current temperature is { currentTemp }°C!</p>
            )}
            <h2>Forecast</h2>
            <Plot
              xData={this.props.dates}
              yData={this.props.temps}
              onPlotClick={this.onPlotClick}
              type="scatter"
            />
          </div>
        ) : null}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
