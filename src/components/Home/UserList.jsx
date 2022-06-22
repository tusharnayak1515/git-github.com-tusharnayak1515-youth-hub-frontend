import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../../redux';

import styles from './userList.module.css';

const UserList = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFollow = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.follow(user._id));
  }

  const redirect = (e,id)=> {
    e.preventDefault();
    navigate(`/users/${id}`, {replace: true});
  }

  return (
    <div className={styles.userList}>
        <img src={user.profilepic} alt={user.name} />
        <h4 onClick={(e)=> redirect(e,user._id)}>{user.username}</h4>
        <button onClick={onFollow}>Follow</button>
    </div>
  )
}

export default UserList