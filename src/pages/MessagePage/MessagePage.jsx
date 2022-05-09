import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message/Message';
import Navbar from '../../UI/Navbar';

import styles from './messagePage.module.css';

const MessagePage = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
      
    useEffect(()=> {
        if(!user) {
            navigate('/login', {replace: true});
        }
    },[user,navigate]);

  return (
    <div className={styles.messagePage}>
        {user && <Navbar />}
        {user && <Message />}
    </div>
  )
}

export default MessagePage