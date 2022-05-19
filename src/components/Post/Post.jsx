import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Navbar from "../../UI/Navbar";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import Comment from "./Comment";

import styles from "./post.module.css";

const Post = ({ post }) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US')
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userReducer, shallowEqual);

  const onUnlike = () => {
    console.log(post.likes.includes(profile._id));
    dispatch(actionCreators.unlikePost(post._id));
  };

  const onLike = () => {
    console.log(post.likes.includes(profile._id));
    dispatch(actionCreators.likePost(post._id));
  };

  return (
    <div className={styles.post_container}>
      <Navbar />
      <div className={styles.post_box}>
        <div className={styles.topDiv}>
          <div className={styles.postUser}>
            <img src={post.user.profilepic} alt={post.user.name} />
            <h3>{post.user.name}</h3>
          </div>
          <MoreHorizIcon className={styles.dotMenu} />
        </div>

        <img src={post.images[0]} alt="" />

        <div className={styles.reactions}>
          <div className={styles.flexDiv}>
            {!post.likes.includes(profile._id) ? (
              <IconButton onClick={onLike}>
                <FavoriteBorderOutlinedIcon
                  style={{
                    fontSize: "1.7rem",
                    marginRight: "0.5rem",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={onUnlike}>
                <FavoriteIcon
                  style={{
                    fontSize: "1.5rem",
                    marginRight: "0.5rem",
                    color: "red",
                  }}
                />
              </IconButton>
            )}
            <IconButton>
              <ChatBubbleOutlineOutlinedIcon
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
              />
            </IconButton>
          </div>
          <IconButton>
            <BookmarkBorderOutlinedIcon
              style={{ fontSize: "1.5rem", cursor: "pointer" }}
            />
          </IconButton>
        </div>

        <div className={styles.likeDiv}>
          {post.likes.length === 0 ? (
            <h3 className={styles.comments}>No likes yet!</h3>
          ) : (
            <h3 className={styles.comments}>
              Liked by {post.likes.length} users
            </h3>
          )}
        </div>

        <div className={styles.bottomDiv}>
          <h3>{post.user.name}</h3>
          <h3 className={styles.caption}>{post.caption}</h3>
        </div>

        {post.comments.length === 0 ? (
          <>
            <h3 className={styles.comments}>No comments yet!</h3>
            <h4 className={styles.comments}>{timeAgo.format(post.createdAt)}</h4>
          </>
        ) : (
          <>
            <h3 className={styles.comments}>View all {post.comments.length} comments</h3>
            <h4 className={styles.comments}>{timeAgo.format(post.createdAt)}</h4>
          </>
        )}

        <Comment post={post} profile={profile} />
      </div>
    </div>
  );
};

export default Post;
