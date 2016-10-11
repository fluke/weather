import React, { Component } from 'react';
import './App.css';
import xhr from 'xhr';

import Plot from './Plot.js'

class App extends Component {
  state = {
    location: '',
    data: {},
    dates: [],
    temps: [],
    selected: {
      date: '',
      temp: null
    }
  }

  fetchData = (event) => {
    event.preventDefault();
    var location = encodeURIComponent(this.state.location);
    var urlPrefix = "http://api.openweathermap.org/data/2.5/forecast?APPID=3e83a72f86b83f5d62ee2c81a20003f0&units=metric&q=";

    var url = urlPrefix + location;

    var self = this;

    xhr({
      url: url
    }, function(err, data) {
      var body = JSON.parse(data.body);
      var list = body.list, dates = [], temps = [];
      
      for (var i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temps.push(list[i].main.temp);
      }

      self.setState({
        data: body,
        temps: temps,
        dates: dates, 
        selected: {
          date: '',
          temp: null
        }
      })
    });

    console.log('Data fetched for ', this.state.location);
  };

  changeLocation = (event) => {
    this.setState({
      location: event.target.value
    })
  };

  onPlotClick = (data) => {
    console.log('Plot clicked');
    if (data.points) {
      this.setState({
        selected: {
          x: data.points[0].x,
          y: data.points[0].y
        }
      })
    }
    console.log("Selected", this.state.selected)
  };

  render() {
    var currentTemp = "Not loaded yet..";
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp
    }
    return (
      <div>
        <h1>Weather App</h1>
        <h2>{this.state.selected.temp}</h2>
        <form onSubmit={this.fetchData}>
          <label>
            I want to know the weather in 
            <input placeholder={"City, Country"} name="location" value={this.location} onChange={this.changeLocation} type="text"/>
          </label>
        </form>
        {(this.state.data.list) ? (
          <div>
            {
              (this.state.selected.temp == null) ? (
                <div>
                <p className="temp-wrapper">
                  <span className="temp">{ this.state.selected.temp ? this.state.selected.temp : currentTemp }</span>
                  <span className="temp-symbol">°C</span>
                  <span className="temp-date">{ this.state.selected.temp ? this.state.selected.date : ''}</span>
                </p>
                </div>
              ) : null
            }
            <h2>Forecast</h2>
            <Plot
              xData={this.state.dates}
              yData={this.state.temps}
              type="scatter"
              onPlotClick={this.onPlotClick}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
