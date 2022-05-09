import React from 'react';

import styles from './lowerDiv.module.css';

const LowerDiv = ({profile}) => {
  return (
    <div className={styles.lowerDiv}>
        <h2>POSTS</h2>
        <div className={styles.posts}>
            {profile.posts === [] ? <h2>No Posts Yet!</h2> : profile.posts.map((post)=> {
                return(
                    <div key={post._id} className={styles.post}>
                        <img src={post.images[0]} alt="Post" />
                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default LowerDiv