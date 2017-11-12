import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.scss';

const Nav = () => (
  <div className={styles.Nav}>
    <ul className={styles.NavContent}>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/matches">Matches</Link></li>
    </ul>
  </div>
);

export default Nav;