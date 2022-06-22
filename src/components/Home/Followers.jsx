import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreators } from "../../redux";

import styles from "./followers.module.css";

const Followers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userReducer, shallowEqual);
  const [followings, setFollowings] = useState([]);

  const unfollow = (e, id) => {
    e.preventDefault();
    dispatch(actionCreators.unfollow(id));
  };

  const follow = (e, id) => {
    e.preventDefault();
    dispatch(actionCreators.follow(id));
  };

  const redirect = (e,id)=> {
    e.preventDefault();
    navigate(`/users/${id}`, {replace: true});
  }

  useEffect(() => {
    dispatch(actionCreators.profile());
  }, [dispatch]);

  useEffect(()=> {
    for(let i=0; i < profile.following.length; i++) {
      let id = profile.following[i]._id;
      setFollowings([...followings, id]);
    }
    // eslint-disable-next-line
  },[]);

  return (
    <div className={styles.followers}>
      <h4 className={styles.head}>FOLLOWERS</h4>
      {profile && profile.followers.length === 0 && (
        <h4 className={styles.noUser}>You have no followers to show!</h4>
      )}
      {profile &&
        profile.followers.map((fuser, index) => {
          if (!index < 8) {
            return (
              <div key={fuser._id} className={styles.fuser}>
                <div className={styles.first}>
                  <img src={fuser.profilepic} alt={fuser.name} />
                  <h4 onClick={(e)=> redirect(e,fuser._id)}>{fuser.username}</h4>
                </div>
                {followings.includes(fuser._id) ? (
                  <button onClick={(e) => unfollow(e, fuser._id)} className={styles.unfollowbtn}>
                    Unfollow
                  </button>
                ) : (
                  <button onClick={(e) => follow(e, fuser._id)} className={styles.followbtn}>Follow</button>
                )}
              </div>
            );
          }
          return null;
        })}
    </div>
  );
};

export default Followers;
