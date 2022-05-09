import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import styles from "./userProfile.module.css";
import UpperDiv from "./UpperDiv";
import LowerDiv from "./LowerDiv";
import { actionCreators } from "../../redux";
import LoadingSpinner from "../../UI/LoadingSpinner";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector((state) => state.userReducer, shallowEqual);

  useEffect(() => {
    dispatch(actionCreators.profile());
  }, [dispatch]);

  if(isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className={styles.userProfile}>
        <UpperDiv profile={profile} /> 
        <LowerDiv profile={profile} />
    </div>
  );
};

export default UserProfile;
