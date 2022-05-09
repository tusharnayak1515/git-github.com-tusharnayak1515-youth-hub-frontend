import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux';
import LoadingSpinner from '../../UI/LoadingSpinner';
import Post from './Post';

import styles from './posts.module.css';

const Posts = () => {
  const dispatch = useDispatch();
  const {posts, isLoading} = useSelector(state=> state.postReducer,shallowEqual);

  const postLength = posts && posts.length;

  useEffect(()=> {
      dispatch(actionCreators.getPosts());
  },[dispatch,postLength]);

  if(isLoading) {
      return <LoadingSpinner />
  }

  return (
    <div className={styles.posts}>
        {posts && posts.length === 0 ? <h3>No Posts to show!</h3> : posts.map((post)=> {
            return <Post key={post._id} post={post} />
        })}
    </div>
  )
}

export default Posts