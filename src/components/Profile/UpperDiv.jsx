import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';

import styles from './upperDiv.module.css';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux';
import Modal from '../Modal/Modal';

const UpperDiv = ({profile}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const onEditClick = (e)=> {
    e.preventDefault();
    navigate('/editprofile', {replace: true});
  }

  const onLogout = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.logout());
  }

  return (
    <div className={styles.upperDiv}>
        <img src={profile.profilepic} alt={profile.name} onClick={()=> setShow(true)} />
        <div className={styles.rightDiv}>

            <div className={styles.details}>
                <h1>{profile.username}</h1>
                <button onClick={onEditClick}>Edit Profile</button>
                <IconButton onClick={onLogout} style={{border: 'none', background: 'none', color: 'black'}}>
                    <PowerSettingsNewOutlinedIcon className={styles.links} />
                </IconButton>
            </div>

            <div className={styles.counts}>
                <h2>{profile.posts.length} <span>posts</span></h2>
                <h2>{profile.followers.length} <span>followers</span></h2>
                <h2>{profile.following.length} <span>following</span></h2>
            </div>

            <div className={styles.name}>
                <h2>{profile.name}</h2>
            </div>

            <div className={styles.bio}>
                {profile.bio && <h2>- {profile.bio}</h2>}
            </div>
            {show && <Modal setShow={setShow} profile={profile} />}
        </div>
    </div>
  )
}

export default UpperDiv