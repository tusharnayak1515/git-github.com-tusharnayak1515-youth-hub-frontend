import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import LoadingSpinner from '../../UI/LoadingSpinner';
import User from './User';

import styles from './users.module.css';

const Users = () => {
  const {profile, searchedUsers ,isLoading} = useSelector(state=> state.userReducer,shallowEqual);

  if(isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className={styles.users}>
        {searchedUsers.length === 0 ? <h2 className={styles.empty}>No Results Found</h2> : searchedUsers.map((user)=> {
          if(user._id !== profile._id) {
            return <User key={user._id} user={user} />
          }
          return null;
        })}
    </div>
  )
}

export default Users;