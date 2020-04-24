import Button from '@material-ui/core/Button';
import Router from 'next/router';
import React from 'react';
import { useDispatchState, useStateGlobal } from '../../src/GlobalState';

const Logout = () => {
  const globalState = useStateGlobal();
  const dispatch = useDispatchState();

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    setTimeout(() => {
      dispatch({
        type: 'SET_LOGOUT',
      });
    }, 2000);

    Router.push('/');
  };

  return (
    <React.Fragment>
      <Button
        id="logout"
        variant="contained"
        color="primary"
        onClick={logoutUser}
      >
        LOGOUT
      </Button>
    </React.Fragment>
  );
};

export default Logout;
