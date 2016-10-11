import { fromJS } from 'immutable';

var initialState = fromJS({
  address: '',
  dates: [],
  temps: [],
  selected: {
    date: '',
    temp: null
  }
});

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_ADDRESS':
      return state.set('address', action.address);
    case 'SET_TEMPS':
      return state.set('temps', fromJS(action.temps));
    case 'SET_DATES':
      return state.set('dates', fromJS(action.dates));
    case 'SET_SELECTED_TEMP':
      return state.setIn(['selected', 'temp'], action.temp);
    case 'SET_SELECTED_DATE':
      return state.setIn(['selected', 'date'], action.date);
    default:
      return state;
  }
}