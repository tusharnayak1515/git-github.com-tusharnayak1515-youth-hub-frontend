import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actionCreators } from "../../redux";

import styles from "./register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user, shallowEqual);
  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onChangeHandler = (e) => {
    e.preventDefault();
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const onRegister = (e) => {
    e.preventDefault();
    const { name, username, email, password } = userDetails;
    if (name.replace(/\s/g, "").trim().length < 5) {
      setError("Name cannot be less than 5 characters!");
    }
    else if ((username.replace(/\s/g, "").trim().length < 5) || (username.replace(/\s/g, "").trim().length > 15)) {
      setError("Username cannot be less than 5 characters and more than 15 characters!");
    }
    else if (!email.toLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      setError("Enter a valid email!");
    }
    else if (password.length < 8 || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])/)) {
      setError("Password cannot be less than 8 characters and must contain atleast 1 uppercase, 1 lowercase, number and special character");
    }
    else {
      dispatch(actionCreators.register(userDetails));
      setUserDetails({ name: "", username: "", email: "", password: "" });
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className={styles.register}>
      <div className={styles.formDiv}>
        <div className={styles.banner}>
          <div className={styles.image}>
            <h1 className={styles.logo}>Youth <span>hub</span></h1>
            <h1>Connect to the youth of the world!</h1>
            <button>JOIN US NOW!</button>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.head}>
            <h1>REGISTER</h1>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={userDetails.name}
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={userDetails.username}
            onChange={onChangeHandler}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userDetails.email}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={userDetails.password}
            onChange={onChangeHandler}
          />
          <button onClick={onRegister}>REGISTER</button>
          {error && <h3>{error}</h3>}
          <h3 className={styles.login}>Already have an account? <Link to='/login'>Login</Link> </h3>
        </div>

      </div>
    </div>
  );
};

export default Register;
