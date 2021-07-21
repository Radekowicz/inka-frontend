import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from '../Navbar2/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import useStyles from './Appbar.styles';

export default function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div position="fixed" className={classes.appBar}>
        <Navbar />
      </div>
      <Sidebar />
    </div>
  );
}
