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