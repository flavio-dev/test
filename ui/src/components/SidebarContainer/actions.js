export const SET_FILTER = 'SET_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const RESET_FILTERS = 'RESET_FILTERS';

export const setFilter = (filter, value) => {
  return {
    type: SET_FILTER,
    filter,
    value
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
