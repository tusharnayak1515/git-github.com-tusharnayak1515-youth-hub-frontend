import React, { Fragment, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import CommentForm from "./CommentForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MsgLoading from "../../UI/MsgLoading";
import { IconButton } from "@mui/material";

import styles from "./comment.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner";

const Comment = ({ post, profile }) => {
  const dispatch = useDispatch();
  const { comments, isLoading } = useSelector(
    (state) => state.commentReducer,
    shallowEqual
  );

  const comment = comments && comments.length > 0 && [...comments].filter((c) => c.post._id === post?._id);

  const [edit, setEdit] = useState({ status: false, id: "", text: "" });

  const onEdit = (e, id, text) => {
    e.preventDefault();
    setEdit({ status: true, id: id, text: text });
  }

  const deleteComment = (e, postId, commentId) => {
    e.preventDefault();
    dispatch(actionCreators.deleteComment(postId, commentId));
  }

  const likeComment = (e, id) => {
    e.preventDefault();
    dispatch(actionCreators.likeComment(id));
  };

  const unlikeComment = (e, id) => {
    e.preventDefault();
    dispatch(actionCreators.unlikeComment(id));
  };

  useEffect(() => {
    dispatch(actionCreators.getComments());
  }, [dispatch, post.comments.length]);

  return (
    <Fragment>
      <div className={styles.comments}>
        {isLoading && <LoadingSpinner />}
        {comment && !isLoading && comment.length > 0 &&
          comment.map((c) => {
            return (
              <div className={styles.comment} key={c._id}>
                <img src={c.user.profilepic} alt={c.user.username} />
                <h4>{c.user.username}</h4>
                <p>{c.comment}</p>
                {c.user._id === profile._id ? (
                  <div className={styles.flex}>
                    <IconButton onClick={(e) => onEdit(e, c._id, c.comment)}>
                      <EditIcon
                        className={`${styles.editicon} ${styles.icons}`}
                      />
                    </IconButton>
                    <IconButton onClick={(e) => deleteComment(e, c.post._id, c._id)}>
                      <DeleteIcon
                        className={`${styles.deleteicon} ${styles.icons}`}
                      />
                    </IconButton>
                    {c.likes.includes(profile._id) ? (
                      <IconButton onClick={(e) => unlikeComment(e, c._id)}>
                        <FavoriteIcon
                          className={`${styles.liked} ${styles.icons}`}
                        />
                      </IconButton>
                    ) : (
                      <IconButton onClick={(e) => likeComment(e, c._id)}>
                        <FavoriteBorderIcon
                          className={`${styles.unliked} ${styles.icons}`}
                        />
                      </IconButton>
                    )}
                  </div>
                ) : c.likes.includes(profile._id) ? (
                  <IconButton onClick={(e) => unlikeComment(e, c._id)}>
                    <FavoriteIcon
                      className={`${styles.liked} ${styles.icons}`}
                    />
                  </IconButton>
                ) : (
                  <IconButton onClick={(e) => likeComment(e, c._id)}>
                    <FavoriteBorderIcon
                      className={`${styles.unliked} ${styles.icons}`}
                    />
                  </IconButton>
                )}
              </div>
            );
          })}
      </div>
      <div className={styles.commentdiv}>
        <CommentForm post={post} edit={edit} setEdit={setEdit} />
      </div>
    </Fragment>
  );
};

export default Comment;
