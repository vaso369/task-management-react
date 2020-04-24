import React, { useEffect } from 'react';

// AJAX LIBRARY
import axios from 'axios';
// MATERIAL UI
import { TextField, Avatar } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
// GLOBAL STATE AND DISPATCH
import { useStateGlobal, useDispatchState } from '../../src/GlobalState';
// API BASE URL
import { url } from '../../consts/consts';
// NEXT ROUTER
import Router from 'next/router';
// SEARCH STYLE
import { useStyles } from './SearchStyle';
// SEARCH TASKS
import SearchTasks from './SearchTasks';

const SearchUsers = (props) => {
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  const classes = useStyles();
  useEffect(() => {}, [state]);
  useEffect(() => {
    axios
      .post(
        url + '/getYourTeam',
        {
          idBoss: Number(state.user.id),
        },
        {
          headers: {
            Authorization: 'JWT' + ' ' + localStorage.getItem('token'),
          },
        }
      )
      .then((data) => {
        dispatch({
          type: 'SET_TEAM',
          data: data.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'SET_FETCH_ERROR',
          data: err.response.data.message,
        });
      });
  }, []);
  const showEmployee = (id) => {
    console.log(id);
    const employee = state.team.filter((el) => el.id === id);
    console.log(employee);
    dispatch({
      type: 'ABOUT_EMPLOYEE',
      data: employee,
    });
    dispatch({
      type: 'SET_ACTIVITIES_SEARCH',
    });
    Router.push('/aboutEmployee');
  };

  let search = 'Search all tasks';
  if (state.allTasks) search = 'Search all tasks';
  if (state.progressTasks) search = 'Search progress tasks';
  if (state.doneTasks) search = 'Search done tasks';
  if (state.yourTeam) search = 'Search your team';
  if (state.activitiesSearch) search = 'Search user activities';
  return (
    <div className={classes.divSearch}>
      <SearchOutlinedIcon className={classes.iconSearch}></SearchOutlinedIcon>
      {props.dense ? (
        <Autocomplete
          className={classes.root}
          id="search-users"
          options={state.team}
          getOptionLabel={(option) =>
            option.first_name + ' ' + option.last_name
          }
          renderOption={(option, { selected }) => (
            <div
              className={classes.divItem}
              onClick={() => showEmployee(option.id)}
            >
              <Avatar
                alt={option.first_name + ' ' + option.last_name}
                src={`https://task-sys-laravel.herokuapp.com/user_pictures/${option.imagePath}`}
                className={classes.small}
              />
              {option.first_name + ' ' + option.last_name}
            </div>
          )}
          style={{ width: 600, border: 'none' }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              className={classes.inputRoot}
              label=""
              placeholder=""
              fullWidth
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
            />
          )}
        />
      ) : (
        <SearchTasks classes={classes} search={search} />
      )}
    </div>
  );
};
export default SearchUsers;
