import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core';
import { useStateGlobal, useDispatchState } from '../../src/GlobalState';
import Router from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const OneEmployee = ({ props }) => {
  const classes = useStyles();
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      dispatch({
        type: 'SET_FETCH_START',
      });
    });
    Router.events.on('routeChangeComplete', () => {
      dispatch({
        type: 'SET_FETCH_RESET',
      });
    });
  }, []);
  const showEmploye = (id) => {
    console.log(id);
    const employee = state.team.filter((el) => el.id === id);
    console.log(employee);
    dispatch({
      type: 'ABOUT_EMPLOYEE',
      data: employee,
    });
    localStorage.setItem('aboutEmployeeData', JSON.stringify(employee));

    Router.push('/aboutEmployee');
  };
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start" onClick={() => showEmploye(props.id)}>
        <ListItemAvatar>
          <Avatar
            alt={state.user.first_name + ' ' + state.user.last_name}
            src={
              state.loggedIn &&
              state.user.imagePath !== '' &&
              state.user.idPart == 1
                ? 'https://task-sys-laravel.herokuapp.com/user_pictures/' +
                  props.imagePath
                : state.source
            }
          />
        </ListItemAvatar>
        <ListItemText
          primary={props.first_name + ' ' + props.last_name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.email}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default OneEmployee;
