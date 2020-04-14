import React, { useEffect } from "react";

import { Checkbox, TextField, Avatar } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useStateGlobal, useDispatchState } from "../../src/GlobalState";
import $ from "jquery";
import { url, urlRedirect } from "../../consts/consts";
import { makeStyles } from "@material-ui/core/styles";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "none"
  },
  inputRoot: {
    width: "50%",
    border: "1px solid white !important",
    borderRadius: "3px"
  },
  cssLabel: {
    color: "white"
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": { display: "none" }
  },
  cssFocused: {
    color: "white",
    display: "none"
  },
  option: {
    backgroundColor: "black",
    margin: 0,
    padding: 0
  },
  small: {
    marginRight: "8px"
  },
  divItem: {
    display: "flex",
    alignItems: "center"
  },
  divSearch: {
    display: "flex",
    alignItems: "center"
  },
  iconSearch: {
    fontSize: "3em",
    marginRight: "1%",
    marginLeft: "-2%",
    cursor: "pointer"
  }
}));

const SearchUsers = (props) => {
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  const classes = useStyles();
  useEffect(() => {}, [state]);
  useEffect(() => {
    $.ajax({
      url: url + "/getYourTeam",
      headers: {
        Authorization: "JWT" + " " + localStorage.getItem("token")
      },
      method: "POST",
      dataType: "json",
      data: {
        idBoss: Number(state.user.id)
      },
      success: function(data) {
        console.log(data);
        dispatch({
          type: "SET_TEAM",
          data: data
        });
      },
      error: function(xhr) {
        console.log(xhr);
      }
    });
  }, []);
  const showEmployee = (id) => {
    console.log(id);
    const employee = state.team.filter((el) => el.id === id);
    console.log(employee);
    dispatch({
      type: "ABOUT_EMPLOYEE",
      data: employee
    });
  };
  const handleChangeSearch = (e) => {
    console.log(e.target.value);
    const searchValue = e.target.value;
    let done = 1;
    if (state.allTasks) done = null;
    if (state.progressTasks) done = 0;
    if (state.doneTasks) done = 1;
    $.ajax({
      url: url + "/getTasksBySearch",
      headers: {
        Authorization: "JWT" + " " + localStorage.getItem("token")
      },
      method: "POST",
      dataType: "json",
      data: {
        idBoss: Number(state.loggedIn ? state.user.id : 0),
        idRole: Number(state.loggedIn ? state.user.idPart : 0),
        searchValue: state.loggedIn ? searchValue : "",
        done: state.loggedIn ? done : 0
      },
      success: function(data) {
        dispatch({
          type: "SET_TASKS",
          data: data
        });
      },
      error: function(xhr) {
        console.log(xhr);
        if (xhr.responseJSON) {
          alert(xhr.responseJSON.message + " " + xhr.responseJSON.error);
        }
      }
    });
  };

  let search = "Search all tasks";
  if (state.allTasks) search = "Search all tasks";
  if (state.progressTasks) search = "Search progress tasks";
  if (state.doneTasks) search = "Search done tasks";
  return (
    <div className={classes.divSearch}>
      <SearchOutlinedIcon className={classes.iconSearch}></SearchOutlinedIcon>
      {props.dense ? (
        <Autocomplete
          className={classes.root}
          id="search-users"
          options={state.team}
          getOptionLabel={(option) =>
            option.first_name + " " + option.last_name
          }
          renderOption={(option, { selected }) => (
            <div
              className={classes.divItem}
              onClick={() => showEmployee(option.id)}
            >
              <Avatar
                alt={option.first_name + " " + option.last_name}
                src={`https://task-sys-laravel.herokuapp.com/user_pictures/${option.imagePath}`}
                className={classes.small}
              />
              {option.first_name + " " + option.last_name}
            </div>
          )}
          style={{ width: 500, border: "none" }}
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
                  focused: classes.cssFocused
                }
              }}
            />
          )}
        />
      ) : (
        <TextField
          onChange={handleChangeSearch}
          style={{ width: 250, border: "none" }}
          variant="outlined"
          className={classes.inputRoot}
          label={search}
          placeholder=""
          fullWidth
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
        />
      )}
    </div>
  );
};
export default SearchUsers;
