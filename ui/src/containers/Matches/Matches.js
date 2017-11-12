import React, { Component } from 'react';
import { connect } from 'react-redux';
import SidebarContainer from '../../components/SidebarContainer/SidebarContainer';
import Main from '../../components/Main/Main';
import {
  fetchMatches
} from '../../actions';
import styles from './Matches.scss';

const formatHeight = (height) => {
  return `${height}cm`;
}

const formatCompatibilityScore = (compatibilityScore) => {
  return `${compatibilityScore * 100}%`;
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
    return (
      <div className={styles.Matches}>
        <SidebarContainer />
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
    matches: state.matches || []
  };
}

export default connect(mapStateToProps)(Matches);
