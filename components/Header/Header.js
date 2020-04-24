import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchUsers from './../SearchUsers/SearchUsers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// DOT MENU
import Menu from './Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'absolute',
    top: 0,
    left: '20%',
    width: '58.5%',
    maxHeight: '100vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  labelPlacementStart: {
    backgroundColor: 'white',
    width: '80% !important',
    padding: '0% 1%',
    border: '1px white',
    borderRadius: '3px',
  },
  label: {
    color: 'grey',
  },
}));

const Header = () => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ maxWidth: 300 }}>
            <SearchUsers dense={dense} />
          </div>
          <div
            style={{
              width: '35%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <FormControlLabel
              className={`${classes.labelPlacementStart} ${classes.label} ${classes.element}`}
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Search users"
            />
            <Menu />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
