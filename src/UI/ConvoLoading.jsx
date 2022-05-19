import React from "react";

import Loading_Spinner from "../utils/spinner2.gif";

import styles from "./convoLoading.module.css";

const ConvoLoading = () => {
  return (
    <div className={styles.loading}>
      <img src={Loading_Spinner} alt="" />
    </div>
  );
};

export default ConvoLoading;
