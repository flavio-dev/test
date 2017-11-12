import config from '../config';
import goFetch from '../utils/fetch';

export const REQUEST_MATCHES = 'REQUEST_MATCHES';
export const RECEIVE_MATCHES = 'RECEIVE_MATCHES';
export const SET_FILTER = 'SET_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const RESET_FILTERS = 'RESET_FILTERS';

export const requestMatches = (filters) => {
  return {
    type: REQUEST_MATCHES,
    filters
  };
}

export const receiveMatches = (filters, json) => {
  return {
    type: RECEIVE_MATCHES,
    filters,
    matches: json.matches
  };
}

const formatUrl = (baseUrl, filters) => {
  let queryString = '';
  for (const prop in filters) {
    queryString += `${prop}=${filters[prop]}&`;
  }
  queryString = queryString.slice(0, -1);
  return `${baseUrl}?${queryString}`;
}

export const fetchMatches = (filters) => {
  return async (dispatch) => {
    dispatch(requestMatches(filters));
    const url = formatUrl(config.getApiMatchesUrl(), filters);
    const json = await goFetch(url);
    dispatch(receiveMatches(filters, json));
  }
}

export const setFilter = (filter, value, isFetching) => {
  return {
    type: SET_FILTER,
    filter,
    value,
    isFetching
  }
}

export const removeFilter = (filter) => {
  return {
    type: REMOVE_FILTER,
    filter
  }
}

export const resetFilters = (filters) => {
  return {
    type: RESET_FILTERS,
    filters
  }
}