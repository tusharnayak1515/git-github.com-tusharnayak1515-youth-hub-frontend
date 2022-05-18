import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { Link, useLocation } from "react-router-dom";

import styles from "./navbar.module.css";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(actionCreators.logout());
  };

  return (
    <div className={styles.navbar}>
      <Link
        to="/"
        className={
          location.pathname === "/"
            ? `${styles.links} ${styles.active}`
            : `${styles.links}`
        }
      >
        <HomeOutlinedIcon />
      </Link>
      <Link
        to="/search"
        className={
          location.pathname === "/search"
            ? `${styles.links} ${styles.active}`
            : `${styles.links}`
        }
      >
        <SearchOutlinedIcon />
      </Link>
      <Link
        to="/message"
        className={
          location.pathname === "/message"
            ? `${styles.links} ${styles.active}`
            : `${styles.links}`
        }
      >
        <MessageOutlinedIcon />
      </Link>
      <Link
        to="/profile"
        className={
          location.pathname === "/profile"
            ? `${styles.links} ${styles.active}`
            : `${styles.links}`
        }
      >
        <PermIdentityOutlinedIcon />
      </Link>
      <Link to="" className={`${styles.links}`} onClick={onLogout}>
        <PowerSettingsNewOutlinedIcon />
      </Link>
    </div>
  );
};

export default Navbar;
