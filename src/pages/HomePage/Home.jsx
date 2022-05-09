import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Main from '../../components/Home/Main';
import Sidebar from '../../components/Home/Sidebar';
import Suggestions from '../../components/Home/Suggestions';
import { actionCreators } from '../../redux';

import styles from './home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user , profile } = useSelector(state => state.userReducer, shallowEqual);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
    else {
      dispatch(actionCreators.profile());
    }
  }, [user, navigate, dispatch]);

  return (
    <div className={styles.container}>
      {(user && profile) && <>
        <Sidebar />
        <Main />
        <Suggestions />
      </>}
    </div>
  )
}

export default Home