import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './lowerDiv.module.css';

const LowerDiv = ({ myprofile }) => {
  const navigate = useNavigate();

  const redirect = (e, id) => {
    e.preventDefault();
    navigate(`/posts/${id}`, { replace: true });
  }

  return (
    <div className={styles.lowerDiv}>
      <h2>POSTS</h2>
      {myprofile.posts.length === 0 && <div className={styles.emptyPost}>
        <h1 className={styles.noposts}>NO POSTS YET!</h1>
      </div>}
      {myprofile.posts.length > 0 && <div className={styles.posts}>
        {myprofile.posts.map((post) => {
          return (
            <div key={post._id} className={styles.post} onClick={(e) => redirect(e, post._id)}>
              <img src={post?.images[0]} alt="Post" />
            </div>
          );
        })}
      </div>}
    </div>
  )
}

export default LowerDiv