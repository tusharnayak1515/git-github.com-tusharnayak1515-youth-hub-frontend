import React, { useState } from "react";
import reactDom from "react-dom";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./modal.module.css";
import { IconButton } from "@mui/material";

const Modal = ({setShow, profile}) => {
  const dispatch = useDispatch();
  const [dp, setDp] = useState("");
  const [image, setImage] = useState(profile.profilepic);
  const [error, setError] = useState("");

  const onPicChange = (e) => {
    setImage(e.target.files[0]);
    setDp(URL.createObjectURL(e.target.files[0]));
  };

  const onRemove = (e) => {
    e.preventDefault();
    setDp("");
    setImage("");
  };

  const onUpload = () => {
    if (image === "") {
      setError("Upload a valid image");
    }
    else if(image === profile.profilepic) {
        setShow(false);
    }
    else {
      dispatch(actionCreators.addDp(image));
      setShow(false);
    }
  };

  return reactDom.createPortal(
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.modal}>
        <div className={styles.imagePreview}>
          {dp !== "" && (
            <IconButton className={styles.deletebtn} onClick={onRemove}>
              <DeleteIcon style={{ color: "red" }} />
            </IconButton>
          )}
          {dp !== "" ? (
            <img src={dp} alt="Profile" className={styles.image} />
          ) : (
            <label htmlFor="dp">
              <AddIcon className={styles.addIcon} />
            </label>
          )}
          <input type="file" id="dp" onChange={onPicChange} />
        </div>
        <button className={styles.uploadbtn} onClick={onUpload}>Upload</button>
        <button className={styles.cancelbtn} onClick={()=> setShow(false)}>Cancel</button>
        {error !== "" && <h3>{error}</h3>}
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
