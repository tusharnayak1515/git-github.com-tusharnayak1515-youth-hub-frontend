import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux';

import styles from './suggestions.module.css';
import UserList from './UserList';

const Suggestions = () => {
  const dispatch = useDispatch();
  const {suggestions, profile} = useSelector(state=> state.userReducer,shallowEqual);

  useEffect(()=> {
    // console.log(followingLength);
    dispatch(actionCreators.getSuggestions());
  },[dispatch ,profile.following.length]);

  return (
    <div className={styles.suggestions}>
        <h1>SUGGESTIONS</h1>
        {suggestions && suggestions.length === 0 ? <h3 className={styles.noUser}>No Suggestions!</h3> : suggestions.map((user,index)=> {
            if(index < 5) {
              return <UserList key={user._id} user={user} />
            }
            return null;
        })}
    </div>
  )
}

export default Suggestions