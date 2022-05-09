import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux';

import styles from './userList.module.css';

const UserList = ({user}) => {
  const dispatch = useDispatch();

  const onFollow = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.follow(user._id));
  }

  return (
    <div className={styles.userList}>
        <img src={user.profilepic} alt={user.name} />
        <h4>{user.name}</h4>
        <button onClick={onFollow}>Follow</button>
    </div>
  )
}

export default UserList