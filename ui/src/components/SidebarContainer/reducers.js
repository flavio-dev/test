import {
  SET_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from './actions';

const filters = (state = {}, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
          ...state.filters,
          [action.filter]: action.value
        };
    case REMOVE_FILTER:
      const filters = { ...state.filters };
      delete filters[action.filter];
      return filters
    case RESET_FILTERS:
      return action.filters
    default:
      return state;
  }
}

export default filters
