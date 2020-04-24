import React, { useState, useEffect } from 'react';

import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
// MATERIAL UI IMPORTS
import { TextField, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// LOGIN STYLE CSS
import { useStyles } from './LoginStyle';
// BASE API URL
import { url } from '../../consts/consts';
// GLOBAL STATE DISPATCH
import { useStateGlobal, useDispatchState } from '../../src/GlobalState';
// LOADER SPINNER
import Loading from './../Loading/Loading';
// NOTIFICATION POPUP
import NotificationPopup from '../NotificationPopup/NotificationPopup';

const Login = () => {
  const classes = useStyles();
  const state = useStateGlobal();
  const dispatch = useDispatchState();

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      dispatch({
        type: 'SET_FETCH_RESET',
      });
    });
  }, []);

  const loginSubmit = async () => {
    const username = document.querySelector('#tbUserNameLogin').value;
    const pass = document.querySelector('#tbPassLogin').value;
    console.log(username, pass);
    const loginObj = {
      username,
      pass,
    };
    dispatch({
      type: 'SET_FETCH_START',
    });

    await axios
      .post(url + '/login', loginObj)
      .then((data) => {
        localStorage.setItem('token', data.data.jwt);

        dispatch({
          type: 'SET_SOURCE',
          data:
            'https://task-sys-laravel.herokuapp.com/user_pictures/' +
            data.data.user.imagePath,
        });
        dispatch({
          type: 'SET_PICTURE',
          data: data.data.user.imagePath,
        });
        dispatch({
          type: 'SET_LOGIN',
          data: data.data.user,
        });
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('imagePath', data.data.user.imagePath);

        Router.push('/allTasks');
      })
      .catch((err) => {
        dispatch({
          type: 'SET_FETCH_ERROR',
          data: err.response.data.message,
        });
      });
  };

  return (
    <React.Fragment>
      <div id="login" className={classes.login}>
        <h2 className={classes.loginH2}>Login</h2>
        <br></br>
        <div id="divLogin" className={classes.divLogin}>
          <TextField
            id="tbUserNameLogin"
            label="USERNAME"
            className={classes.tbLogin}
            defaultValue=""
            helperText=""
            variant="outlined"
            autoFocus
          />
        </div>

        <TextField
          id="tbPassLogin"
          type="password"
          label="PASSWORD"
          className={classes.tbLogin}
          defaultValue=""
          helperText=""
          variant="outlined"
        />
        <br></br>
        <Button
          id="btnLogin"
          className={classes.btnLogin}
          variant="outlined"
          color="primary"
          onClick={loginSubmit}
        >
          LOGIN&nbsp;<ExitToAppIcon></ExitToAppIcon>
        </Button>
        <br></br>
        <div className="no-account">
          <p>
            Don't have an account? Register{' '}
            <Link href="/register">
              <a>here!</a>
            </Link>
          </p>
        </div>
      </div>
      {state.isLoading && <Loading />}
      {(state.hasError && state.errorMessage !== '') ||
      (state.isSuccess && state.successMessage !== '') ? (
        <NotificationPopup
          variant={state.notVariant}
          message={state.hasError ? state.errorMessage : state.successMessage}
        />
      ) : null}
    </React.Fragment>
  );
};
export default Login;
