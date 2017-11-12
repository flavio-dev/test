import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from '../../config';
import Sidebar from '../../components/Sidebar/Sidebar';
import Main from '../../components/Main/Main';
import {
  fetchMatches,
  setFilter,
  removeFilter,
  resetFilters
} from '../../actions';
import styles from './Matches.scss';

const formatHeight = (height) => {
  return `${height}cm`;
}

const formatCompatibilityScore = (compatibilityScore) => {
  return `${compatibilityScore * 100}%`;
}

export const getDefaultFilters = () => {
  return {
    compatibilityScoreMin: config.COMPATIBILITY_SCORE_MIN,
    compatibilityScoreMax: config.COMPATIBILITY_SCORE_MAX,
    ageMin: config.AGE_MIN,
    heightMin: config.HEIGHT_MIN,
    distanceMin: 0,
    distanceMax: config.DISTANCE_MIN
  }
}

export class Matches extends Component {
  componentDidMount() {
    const { dispatch, filters } = this.props;
    dispatch(fetchMatches(filters));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filters !== this.props.filters && nextProps.isFetching) {
      const { dispatch, filters } = nextProps;
      dispatch(fetchMatches(filters));
    }
  }
  
  handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      this.props.dispatch(setFilter(name, checked, true));
    } else {
      this.props.dispatch(removeFilter(name, true));
    }
  }

  handleInputRangeChange = (nameMin, nameMax, value) => {
    const { min, max } = value;
    const { dispatch, filters } = this.props;
    if (min !== filters[nameMin]) {
      dispatch(setFilter(nameMin, min, false));
    }
    if (max !== filters[nameMax]) {
      dispatch(setFilter(nameMax, max, false));
    }
  }

  handleInputRangeChangeComplete = () => {
    const { dispatch, filters } = this.props;
    dispatch(fetchMatches(filters));
  }

  handleInputRangeWithOpenBoundsChangeComplete = (name, boundValue) => {
    const { dispatch, filters } = this.props;
    if (filters[name] === boundValue) {
      dispatch(removeFilter(name));
    } else {
      dispatch(fetchMatches(filters));
    }
  }
  
  handleResetButtonClick = (e) => {
    e.preventDefault();
    this.props.dispatch(resetFilters(getDefaultFilters()));
  }

  renderMatches = () => {
    const { isFetching, matches } = this.props;
    if (isFetching) {
      return <div>Loading...</div>;
    }

    if (matches.length === 0) {
      return 'No matches found.';
    }

    return matches.map((match, index) => (
      <div key={index} className={styles.MatchWrapper}>
        <img src={match.main_photo} alt={match.main_photo} className={styles.MatchPhoto}/>
        <div className={styles.MatchDetails}>
          <div><b>{match.display_name}</b>, {match.age}</div>
          <div>{formatCompatibilityScore(match.compatibility_score)}</div>
          <div>{formatHeight(match.height_in_cm)}</div>
          <div>{match.city.name}</div>
          <div>{match.job_title}</div>
        </div>
      </div>
    ));
  }

  render() {
    const { filters } = this.props;
    return (
      <div className={styles.Matches}>
        <Sidebar
          filters={filters}
          handleCheckboxChange={this.handleCheckboxChange}
          handleInputRangeChange={this.handleInputRangeChange}
          handleInputRangeChangeComplete={this.handleInputRangeChangeComplete}
          handleInputRangeWithOpenBoundsChangeComplete={this.handleInputRangeWithOpenBoundsChangeComplete}
          handleResetButtonClick={this.handleResetButtonClick}
        />
        <Main
          heading="Matches"
          body={this.renderMatches()}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching || false,
    filters: state.filters || getDefaultFilters(),
    matches: state.matches || []
  };
}

export default connect(mapStateToProps)(Matches);