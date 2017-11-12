import {
  REQUEST_MATCHES,
  RECEIVE_MATCHES,
  SET_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from '../actions';

const filteredMatches = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_MATCHES:
      return {
        ...state,
        isFetching: true,
        filters: action.filters
      };
    case RECEIVE_MATCHES:
      return {
        ...state,
        isFetching: false,
        filters: action.filters,
        matches: action.matches
      };
    case SET_FILTER:
      return {
        ...state,
        isFetching: action.isFetching,
        filters: {
          ...state.filters,
          [action.filter]: action.value
        }
      };
    case REMOVE_FILTER:
      const filters = { ...state.filters };
      delete filters[action.filter];
      return {
        ...state,
        isFetching: true,
        filters
      };
    case RESET_FILTERS:
      return {
        ...state,
        isFetching: true,
        filters: action.filters
      }
    default:
      return state;
  }
}

export default filteredMatches;