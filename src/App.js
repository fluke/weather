import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import Plot from './Plot.js'

import {
  changeAddress,
  setSelectedTemp,
  setSelectedDate,
  fetchData
} from './actions';

class App extends Component {

  fetchData = (event) => {
    event.preventDefault();
    var location = encodeURIComponent(this.props.redux.get('address'));
    var urlPrefix = "http://api.openweathermap.org/data/2.5/forecast?APPID=3e83a72f86b83f5d62ee2c81a20003f0&units=metric&q=";

    var url = urlPrefix + location;

    this.props.dispatch(fetchData(url));
  };

  changeAddress = (event) => {
    this.props.dispatch(changeAddress(event.target.value));
  };

  onPlotClick = (data) => {
    if (data.points) {
      var number = data.points[0].pointNumber;
      this.props.dispatch(setSelectedTemp(this.props.redux.getIn(['temps', number])));
      this.props.dispatch(setSelectedDate(this.props.redux.getIn(['dates', number])));
    }
  };

  render() {
    var currentTemp = 'not loaded yet';
    if (this.props.redux.get('temps').length != 0) {
      currentTemp = this.props.redux.getIn(['temps', '0']);
    }
    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>I want to know the weather for
            <input
              placeholder={"City, Country"}
              type="text"
              value={this.props.redux.get('address')}
              onChange={this.changeAddress}
            />
          </label>
        </form>
        {(this.props.redux.getIn(['temps', '0'])) ? (
          <div className="wrapper">
            {/* Render the current temperature if no specific date is selected */}
            <p className="temp-wrapper">
              <span className="temp">
                { this.props.redux.getIn(['selected', 'temp']) ? this.props.redux.getIn(['selected', 'temp']) : currentTemp }
              </span>
              <span className="temp-symbol">°C</span>
              <span className="temp-date">
                { this.props.redux.getIn(['selected', 'temp']) ? this.props.redux.getIn(['selected', 'date']) : ''}
              </span>
            </p>
            <h2>Forecast</h2>
            <Plot
              xData={this.props.redux.get('dates')}
              yData={this.props.redux.get('temps')}
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
  return {
    redux: state
  }
}

export default connect(mapStateToProps)(App);
