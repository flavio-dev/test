import { connect } from 'react-redux'

import { setFilter, removeFilter, resetFilters } from './actions'

import Sidebar from './Sidebar'
import { getFilters } from './selectors'

const mapActionCreators = (dispatch) => ({
  setFilter: (filter, value) => {
    dispatch(setFilter(filter, value))
  },
  removeFilter: (filter) => {
    dispatch(removeFilter(filter))
  },
  resetFilters: (filters) => {
    dispatch(resetFilters(filters))
  }
})

const mapStateToProps = (state) => ({
  filters: getFilters(state)
})

export default connect(mapStateToProps, mapActionCreators)(Sidebar)
