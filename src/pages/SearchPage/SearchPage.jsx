import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Users from '../../components/Search/Users';
import SearchBar from '../../components/SearchBar/SearchBar';
import { actionCreators } from '../../redux';
import Navbar from '../../UI/Navbar';

import styles from './searchPage.module.css';

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const onChangeHandler = (e)=> {
      e.preventDefault();
      setName(e.target.value);
  } 

  const onSearch = (e)=> {
    e.preventDefault();
    if(name.replace().trim() === "") {
        setError("Invalid Search!");
    }
    else {
        dispatch(actionCreators.search(name));
        setName("");
        setShow(true);
    }
  }
    
  useEffect(()=> {
    if(!user) {
        navigate('/login', {replace: true});
    }
  },[user,navigate]);

  return (
    <div className={styles.searchPage}>
        <Navbar />
        <SearchBar name={name} onChangeHandler={onChangeHandler} onSearch={onSearch} />
        {show && <Users />}
        {error !== "" && <h3>{error}</h3>}
    </div>
  )
}

export default SearchPage