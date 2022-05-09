import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

import styles from './searchBar.module.css';
import { IconButton } from '@mui/material';

const SearchBar = ({name,onChangeHandler,onSearch}) => {
  return (
    <div className={styles.searchBar}>
        <input type="text" value={name} onChange={onChangeHandler} placeholder="Search Users" />
        <IconButton className={styles.icon} onClick={onSearch}>
            <SearchIcon />
        </IconButton>
    </div>
  )
}

export default SearchBar