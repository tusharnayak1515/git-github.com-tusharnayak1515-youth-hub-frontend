import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actionCreators } from "../../redux";

import styles from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChangeHandler = (e) => {
    e.preventDefault();
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const onLogin = (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    if (!email.toLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      setError("Enter a valid email!");
    }
    else if (password === "") {
      setError("Password cannot be empty!");
    }
    else {
      dispatch(actionCreators.login(userDetails));
      setUserDetails({ email: "", password: "" });
      navigate('/', { replace: true });
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className={styles.login}>
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
            <h1>LOGIN</h1>
          </div>
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
          <button onClick={onLogin}>LOGIN</button>
          {error && <h3>{error}</h3>}
          <h3 className={styles.register}>Dont have an account? <Link to='/register'>Register</Link> </h3>
        </div>

      </div>
    </div>
  );
};

export default Login;
