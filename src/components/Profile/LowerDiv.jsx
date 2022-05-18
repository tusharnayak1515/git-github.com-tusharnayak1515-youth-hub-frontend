import React from 'react';

import styles from './lowerDiv.module.css';

const LowerDiv = ({myprofile}) => {
  return (
    <div className={styles.lowerDiv}>
        <h2>POSTS</h2>
        <div className={styles.posts}>
            {myprofile.posts.length === 0 ? <h1 className={styles.noposts}>NO POSTS YET!</h1> : myprofile.posts.map((post)=> {
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