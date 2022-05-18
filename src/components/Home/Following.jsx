import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../../redux';

import styles from './following.module.css';

const Following = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {profile} = useSelector(state=> state.userReducer,shallowEqual);

  const unfollow = (e,id)=> {
    e.preventDefault();
    dispatch(actionCreators.unfollow(id));
  }

  const redirect = (e,id)=> {
    e.preventDefault();
    navigate(`/users/${id}`, {replace: true});
  }

  useEffect(()=> {
    dispatch(actionCreators.profile());
  },[dispatch]);

  return (
    <div className={styles.following}>
        <h4 className={styles.head}>FOLLOWING</h4>
        {profile && profile.following.length === 0 && <h4 className={styles.noUser}>You have no following to show!</h4>}
        {profile && profile.following.map((fuser,index)=> {
          if (!index < 8) {
            return <div key={fuser._id} className={styles.fuser}>
                <div className={styles.first}>
                    <img src={fuser.profilepic} alt={fuser.name} />
                    <h4 onClick={(e)=> redirect(e,fuser._id)}>{fuser.username}</h4>
                </div>
                <button onClick={(e)=> unfollow(e,fuser._id)}>Unfollow</button>
            </div>
          }
          return null;
        })}
    </div>
  )
}

export default Following;