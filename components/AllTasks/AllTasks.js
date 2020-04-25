// AJAX LIBRARY
import axios from 'axios';
import React, { useEffect } from 'react';
// API BASE URL
import { url } from '../../consts/consts';
// GLOBAL STATE AND DISPATCH
import { useDispatchState, useStateGlobal } from '../../src/GlobalState';
// NOTIFICATION POPUP
import NotificationPopup from '../NotificationPopup/NotificationPopup';
// PAGINATION PAGE
import Pagination from '../Pagination/Paginations';
// LOADER SPINNER
import Loading from './../Loading/Loading';
// ONE TASK COMPONENT
import Task from './Task';


const AllTasks = (props) => {
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  const { id, idRole, itemsPerPage } = props;
   useEffect(()=>{

  },[state])
  useEffect(() => {

    dispatch({
      type: 'SET_PAGE',
      data: 0,
    });
    dispatch({
      type: 'SET_FETCH_START',
    });
    axios
      .post(
        url + '/tasks',
        {
          idEmployee: Number(state.loggedIn ? id : 0),
          idRole: Number(state.loggedIn ? idRole : 0),
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
        dispatch({
          type: 'SET_ALL_TASKS',
        });
        localStorage.setItem('allTasksData', JSON.stringify(data.data));
        dispatch({
          type: 'SET_FETCH_RESET',
        });
      })
      .catch((err) => {
        dispatch({
          type: 'SET_FETCH_ERROR',
          data: err.response.data.message,
        });
      });
    // window.addEventListener("beforeunload", saveStateToLocalStorage);
  }, []);
  if (state.allTasksData.length == 0)
    return (
      <h1 style={{ textAlign: 'center', color: 'grey' }}>There is no tasks!</h1>
    );
  return (
    <div>
      {state.allTasksData
        .slice(
          state.page * itemsPerPage,
          state.page * itemsPerPage + itemsPerPage
        )
        .map((el) => (
          <Task key={el.idTask} data={el} />
        ))}
      {state.allTasksData.length !== 0 ? (
        <Pagination data={state.allTasksData} />
      ) : null}
      {state.isLoading && <Loading />}
      {state.hasError && (
        <NotificationPopup
          variant={state.notVariant}
          message={state.errorMessage}
        />
      )}
    </div>
  );
};

export default AllTasks;
