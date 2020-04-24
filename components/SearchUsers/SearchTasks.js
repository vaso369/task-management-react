import React from 'react';

import axios from 'axios';
import { TextField } from '@material-ui/core';
import { useStateGlobal, useDispatchState } from '../../src/GlobalState';
import { url } from '../../consts/consts';

const SearchTasks = (props) => {
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  const { classes, search } = props;
  const handleChangeSearch = (e) => {
    const searchValue = e.target.value;
    if (!state.yourTeam) {
      let done = 1;
      if (state.allTasks) done = null;
      if (state.progressTasks) done = 0;
      if (state.doneTasks) done = 1;
      axios
        .post(
          url + '/getTasksBySearch',
          {
            idBoss: Number(state.loggedIn ? state.user.id : 0),
            idRole: Number(state.loggedIn ? state.user.idPart : 0),
            searchValue: state.loggedIn ? searchValue : '',
            done: state.loggedIn ? done : 0,
          },
          {
            headers: {
              Authorization: 'JWT' + ' ' + localStorage.getItem('token'),
            },
          }
        )
        .then((data) => {
          dispatch({
            type: 'SET_TASKS',
            data: data.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: 'SET_FETCH_ERROR',
            data: err.response.data.message,
          });
        });
    } else {
    }
  };
  return (
    <TextField
      onChange={handleChangeSearch}
      style={{ width: '100% !important', border: 'none' }}
      variant="outlined"
      className={classes.inputRoot}
      label={search}
      placeholder=""
      fullWidth
      InputLabelProps={{
        classes: {
          root: classes.cssLabel,
          focused: classes.cssFocused,
        },
      }}
    />
  );
};

export default SearchTasks;
