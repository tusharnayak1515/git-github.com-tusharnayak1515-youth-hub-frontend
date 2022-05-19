import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";

import styles from "./upperDiv.module.css";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux";
import Modal from "../Modal/Modal";

const UpperDiv = ({ myprofile, profile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const onEditClick = (e) => {
    e.preventDefault();
    navigate("/editprofile", { replace: true });
  };

  const follow = (e, id) => {
    e.preventDefault();
    dispatch(actionCreators.follow(id));
  }

  const unfollow = (e, id) => {
    e.preventDefault();
    dispatch(actionCreators.unfollow(id));
  }

  const redirect = (e) => {
    e.preventDefault();
    dispatch(actionCreators.newCnv(profile._id, myprofile._id))
    navigate('/message', { replace: true });
  }

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(actionCreators.logout());
  };

  useEffect(() => {
    for (let i = 0; i < profile.following.length; i++) {
      if (profile.following[i]._id === myprofile?._id) {
        setIsFollowing(true);
        break;
      }
      else {
        setIsFollowing(false);
      }
    }
    // eslint-disable-next-line
  }, [dispatch, myprofile?._id, profile.following.length]);

  return (
    <div className={styles.upperDiv}>
      <img
        src={myprofile.profilepic}
        alt={myprofile.name}
        onClick={() => myprofile._id === profile._id && setShow(true)}
      />
      <div className={styles.rightDiv}>
        <div className={styles.details}>
          <h1>{myprofile.username}</h1>
          {myprofile._id === profile._id ? (
            <button onClick={onEditClick} className={styles.editbtn}>Edit Profile</button>
          ) : isFollowing ? (
            <>
              <button className={styles.msgbtn} onClick={redirect}>Message</button>
              <button onClick={(e) => unfollow(e, myprofile._id)} className={styles.unfollowbtn}>Unfollow</button>
            </>
          ) : (
            <>
              <button className={styles.msgbtn} onClick={redirect}>Message</button>
              <button onClick={(e) => follow(e, myprofile._id)} className={styles.followbtn}>Follow</button>
            </>
          )}
          {myprofile._id === profile._id && (
            <IconButton
              onClick={onLogout}
              style={{ border: "none", background: "none", color: "black" }}
            >
              <PowerSettingsNewOutlinedIcon className={styles.links} />
            </IconButton>
          )}
        </div>

        <div className={styles.counts}>
          <h2>
            {myprofile.posts.length} <span>posts</span>
          </h2>
          <h2>
            {myprofile.followers.length} <span>followers</span>
          </h2>
          <h2>
            {myprofile.following.length} <span>following</span>
          </h2>
        </div>

        <div className={styles.name}>
          <h2>{myprofile.name}</h2>
        </div>

        <div className={styles.bio}>
          {myprofile.bio ? <h2>- {myprofile.bio}</h2> : <h2>- bio</h2>}
        </div>
        {show && <Modal setShow={setShow} profile={profile} />}
      </div>
    </div>
  );
};

export default UpperDiv;
