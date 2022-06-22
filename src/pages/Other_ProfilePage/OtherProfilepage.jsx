import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LowerDiv from '../../components/Profile/LowerDiv';
import UpperDiv from '../../components/Profile/UpperDiv';
import { actionCreators } from '../../redux';
import LoadingSpinner from '../../UI/LoadingSpinner';
import Navbar from '../../UI/Navbar';

import styles from './otherProfilePage.module.css';

const OtherProfilepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, profile, otherUser, isLoading} = useSelector(state=> state.userReducer,shallowEqual);
  const params = useParams();
  const id = params.id;

  useEffect(()=> {
    if(!user) {
        navigate('/login', {replace: true});
    }
    else {
        dispatch(actionCreators.profile());
        dispatch(actionCreators.getUser(id));
    }

    return ()=> {
        dispatch(actionCreators.resetUser());
    }
  },[user, id, profile?.following.length, dispatch, navigate]);

  if(isLoading && !otherUser) {
    return <LoadingSpinner />
  }

  return (
    <div className={styles.otherProfilepage}>
        <Navbar />
        {otherUser && <UpperDiv myprofile={otherUser} profile={profile} />} 
        {otherUser && <LowerDiv myprofile={otherUser} />}
    </div>
  )
}

export default OtherProfilepage