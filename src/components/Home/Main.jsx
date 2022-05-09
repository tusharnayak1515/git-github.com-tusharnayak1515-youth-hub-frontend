import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux';
import Navbar from '../../UI/Navbar';

import styles from './main.module.css';
import Posts from './Posts';

const Main = () => {
  const dispatch = useDispatch();
  const {profile} = useSelector(state=> state.userReducer,shallowEqual);
  const {posts} = useSelector(state=> state.postReducer,shallowEqual);

  useEffect(()=> {
    dispatch(actionCreators.getPosts());
  },[dispatch]);

  return (
    <div className={styles.main}>
        {profile && <Navbar />}
        {posts && <Posts />}
    </div>
  )
}

export default Main