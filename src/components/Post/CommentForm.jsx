import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux";

import styles from "./commentForm.module.css";

const CommentForm = ({ post, edit, setEdit }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const onEditChange = (e) => {
    e.preventDefault();
    setEdit({ ...edit, text: e.target.value });
  };

  const addComment = (e) => {
    e.preventDefault();
    if (comment.replace(/\s/g, "").trim().length < 1) {
      return;
    } else {
      dispatch(actionCreators.addComment(post._id, comment));
      setComment("");
    }
  };

  const editComment = (e,commentId) => {
    e.preventDefault();
    if (edit.text.replace(/\s/g, "").trim().length < 1) {
      return;
    } else {
      dispatch(actionCreators.editComment(commentId, edit.text));
      setEdit({status: false, text: ""});
    }
  };

  return (
    <div className={styles.commentDiv}>
      <input
        type="text"
        name="comment"
        placeholder="Enter Comment"
        value={edit && edit.status ? edit.text : comment}
        onChange={edit && edit.status ? onEditChange : onChange}
      />
      <button onClick={(e)=> edit && edit.status ? editComment(e,edit.id) : addComment(e)}>Post</button>
    </div>
  );
};

export default CommentForm;
