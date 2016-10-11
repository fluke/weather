var initialState = {
  address: '',
  dates: [],
  temps: [],
  selected: {
    date: '',
    temp: null
  }
};

export default function mainReducer(state = initialState, action) {
  switch(action.type) {
    case 'CHANGE_ADDRESS': 
      return Object.assign({}, state, {address: action.address});
    case 'SET_TEMPS': 
      return Object.assign({}, state, {temps: action.temps});
    case 'SET_DATES': 
      return Object.assign({}, state, {dates: action.dates});
    case 'SET_SELECTED_TEMP': 
      return Object.assign({}, state, {selected: {temp: action.temp, date: state.selected.temp}});
    case 'SET_SELECTED_DATE': 
      return Object.assign({}, state, {selected: {date: action.date, temp: state.selected.date}});
    default:
      return state;
  }
}