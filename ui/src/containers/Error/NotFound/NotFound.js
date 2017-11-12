import React from 'react';
import styles from './NotFound.scss';

const NotFound = () => (
  <div className={styles.NotFound}>
    <h1>Oops!</h1>
    <div>Looks like you're lost...</div>
    <div>
      <a href="/">Get me out of here!</a>
    </div>
  </div>
);

export default NotFound;