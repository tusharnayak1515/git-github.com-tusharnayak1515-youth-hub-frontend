import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Followers from './Followers';
import Following from './Following';

import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <div className={styles.heading}>
            <h1>Youth <span>hub</span></h1>
            <FontAwesomeIcon icon={faHandshake} size="2x" />
        </div>
        <Following />
        <Followers />
    </div>
  )
}

export default Sidebar