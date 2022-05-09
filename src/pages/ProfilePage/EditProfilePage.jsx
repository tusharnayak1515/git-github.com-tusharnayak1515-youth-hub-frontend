import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditProfile from "../../components/Profile/EditProfile";
import { actionCreators } from "../../redux";
import Navbar from "../../UI/Navbar";

import styles from "./editProfilePage.module.css";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user , profile } = useSelector((state) => state.userReducer, shallowEqual);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      dispatch(actionCreators.profile());
    }
  }, [dispatch, user, navigate]);

  return (
    <div className={styles.editProfilePage}>
      <Navbar />
      {profile && <EditProfile />}
    </div>
  );
};

export default EditProfilePage;
