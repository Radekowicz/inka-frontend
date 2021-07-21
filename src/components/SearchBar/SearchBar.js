import React from 'react';
import { InputBase, IconButton, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './SearchBar.styles';

export default function SearchBar(props) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={props.placeholder}
        type="text"
        onChange={({ target: { value } }) => {
          props.updateFilteredData(value);
        }}
      />
      <IconButton className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
