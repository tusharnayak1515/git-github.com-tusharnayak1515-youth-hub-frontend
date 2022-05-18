import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";

import styles from "./followers.module.css";

const Followers = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userReducer, shallowEqual);

  const unfollow = (e, id) => {
    e.preventDefault();
    dispatch(actionCreators.unfollow(id));
  };

  const follow = (e, id) => {
    e.preventDefault();
    dispatch(actionCreators.follow(id));
  };

  useEffect(() => {
    dispatch(actionCreators.profile());
  }, [dispatch]);

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
                  <h4>{fuser.username}</h4>
                </div>
                {profile.following.includes(fuser._id) ? (
                  <button onClick={(e) => unfollow(e, fuser._id)}>
                    Unfollow
                  </button>
                ) : (
                  <button onClick={(e) => follow(e, fuser._id)}>Follow</button>
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
