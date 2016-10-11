import xhr from 'xhr';

export function changeAddress(address) {
  return {
    type: 'CHANGE_ADDRESS',
    address: address
  };
}

export function setSelectedTemp(temp) {
  return {
    type: 'SET_SELECTED_TEMP',
    temp: temp
  };
}

export function setSelectedDate(date) {
  return {
    type: 'SET_SELECTED_DATE',
    date: date
  };
}

export function setTemps(temps) {
  return {
    type: 'SET_TEMPS',
    temps: temps
  };
}

export function setDates(dates) {
  return {
    type: 'SET_DATES',
    dates: dates
  };
}

export function fetchData(url) {
  return function thunk(dispatch) {
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
      
      dispatch(setTemps(temps));
      dispatch(setDates(dates));
      dispatch(setSelectedTemp(null));
      dispatch(setSelectedDate(''));
    });
  }
}