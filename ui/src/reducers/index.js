import {
  REQUEST_MATCHES,
  RECEIVE_MATCHES
} from '../actions'

const filteredMatches = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_MATCHES:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_MATCHES:
      return {
        ...state,
        isFetching: false,
        matches: action.matches
      };
    default:
      return state;
  }
}

export default filteredMatches;
