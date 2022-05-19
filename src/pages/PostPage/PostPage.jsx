import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Home/Sidebar';
import Suggestions from '../../components/Home/Suggestions';
import Post from '../../components/Post/Post';
import { actionCreators } from '../../redux';

import styles from './postPage.module.css';

const PostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const {posts} = useSelector(state=> state.postReducer,shallowEqual);
  const {comments} = useSelector(state=> state.commentReducer,shallowEqual);
  const params = useParams();
  const postId = params.id;

  const post = posts.length > 0 && [...posts].filter((p)=> p._id === postId);

  useEffect(()=> {
    if(!user) {
      navigate('/login', {replace: true});
    }
    else {
      dispatch(actionCreators.getPosts());
    }
  },[user, comments.length, navigate, dispatch]);

  return (
    <div className={styles.postPage}>
        <Sidebar />
        <Post post={post[0]} />
        <Suggestions />
    </div>
  )
}

export default PostPage