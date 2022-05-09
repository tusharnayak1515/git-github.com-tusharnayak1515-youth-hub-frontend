import React from 'react';

import styles from './user.module.css';

const User = ({user}) => {
  return (
    <div className={styles.user}>
        <img src={user.profilepic} alt={user.name} />
        <h1>{user.name}</h1>
    </div>
  )
}

export default User