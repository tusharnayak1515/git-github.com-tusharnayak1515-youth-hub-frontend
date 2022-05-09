import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreators } from "../../redux";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Modal from "../Modal/Modal";

import styles from "./editProfile.module.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector((state) => state.userReducer, shallowEqual);
  const [userDetails, setUserDetails] = useState({
    name: profile.name,
    username: profile.username,
    email: profile.email,
    profilepic: profile.profilepic,
    bio: profile.bio ? profile.bio : ""
  });
  const [show, setShow] = useState(false);
  const [error,setError] = useState("");

  const onChangeHandler = (e)=> {
    e.preventDefault();
    setUserDetails({...userDetails, [e.target.name]: e.target.value});
  }

  const onEdit = (e)=> {
    e.preventDefault();
    const {name,username,email} = userDetails;
    if(name === "" || name.length < 5) {
        setError("Name cannot be less than 5 characters!");
    }
    else if(username === "" || username.length < 5) {
        setError("Username cannot be less than 5 characters!");
    }
    else if(email === "" || !email.toLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        setError("Enter a valid email!");
    }
    else {
        dispatch(actionCreators.editProfile(userDetails));
    }
  }

  useEffect(()=> {
    dispatch(actionCreators.profile());
  },[dispatch]);

  if(isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className={styles.editProfile}>
      <img src={profile.profilepic} alt={profile.name} className={styles.dp} onClick={()=> setShow(true)} />
      <div className={styles.flexDiv}>
        <h2>Name</h2>
        <input type="text" name="name" value={userDetails.name} onChange={onChangeHandler} />
      </div>

      <div className={styles.flexDiv}>
        <h2>Username</h2>
        <input type="text" name="username" value={userDetails.username} onChange={onChangeHandler} />
      </div>

      <div className={styles.flexDiv}>
        <h2>Email</h2>
        <input type="email" name="email" value={userDetails.email} onChange={onChangeHandler} />
      </div>

      <div className={styles.flexDiv}>
        <h2>Bio</h2>
        <input type="text" name="bio" value={userDetails.bio} onChange={onChangeHandler} />
      </div>

      <button className={styles.btn} onClick={onEdit}>Submit</button>
      <button className={styles.btn} onClick={()=> navigate('/profile', {replace: true})}>Back To Profile</button>
      {error !== "" && <h3>{error}</h3>}
      {show && <Modal setShow={setShow} profile={profile && profile} />}
    </div>
  );
};

export default EditProfile;
