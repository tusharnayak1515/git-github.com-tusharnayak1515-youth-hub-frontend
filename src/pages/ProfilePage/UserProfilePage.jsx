import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProfile from "../../components/Profile/UserProfile";
import { actionCreators } from "../../redux";
import Navbar from "../../UI/Navbar";

import styles from "./userProfilePage.module.css";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.userReducer, shallowEqual);

  useEffect(() => {
    if(!user) {
      navigate('/login', {replace: true});
    }
    else {
      dispatch(actionCreators.profile());
    }
  }, [dispatch, user, navigate]);

  return (
    <div className={styles.container}>
      {user && profile && (
        <>
          <Navbar />
          <UserProfile />
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
