import filteredMatches from './index.js';
import { getDefaultFilters } from '../containers/Matches/Matches';
import {
  REQUEST_MATCHES,
  RECEIVE_MATCHES,
  SET_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from '../actions';

describe('reducers/index.js', () => {
  const getInitialState = () => ({
    isFetching: false,
    filters: getDefaultFilters(),
    matches: []
  });

  it('returns state if action is unknown', () => {
    const state = getInitialState();

    const nextState = filteredMatches(state, { type: 'UNKNOWN_ACTION' });

    expect(nextState).toEqual(state);
  });
});