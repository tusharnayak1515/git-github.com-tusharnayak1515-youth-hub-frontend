import React from "react";

import Loading_Spinner from "../utils/spinner.svg";

import styles from "./msgLoading.module.css";

const MsgLoading = () => {
  return (
    <div className={styles.loading}>
      <img src={Loading_Spinner} alt="" />
    </div>
  );
};

export default MsgLoading;
