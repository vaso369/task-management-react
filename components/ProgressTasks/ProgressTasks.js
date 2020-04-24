import React, { useEffect } from 'react';

import axios from 'axios';
import { url, urlRedirect } from '../../consts/consts';
import { useStateGlobal, useDispatchState } from '../../src/GlobalState';
import Task from '../AllTasks/Task';
import Pagination from '../Pagination/Paginations';
// LOADER SPINNER
import Loading from './../Loading/Loading';
// NOTIFICATION POPUP
import NotificationPopup from '../NotificationPopup/NotificationPopup';

const ProgressTasks = (props) => {
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  const { id, idRole, itemsPerPage } = props;

  useEffect(() => {
    dispatch({
      type: 'SET_FETCH_START',
    });
    axios
      .post(
        url + '/tasks/progress',
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
          type: 'SET_PROGRESS_TASKS',
        });
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
  }, []);
  if (state.allTasksData.length == 0)
    return (
      <h1 style={{ textAlign: 'center', color: 'grey' }}>There is no tasks!</h1>
    );
  return (
    <div>
      {state.allTasksData.length !== 0
        ? state.allTasksData
            .slice(
              state.page * itemsPerPage,
              state.page * itemsPerPage + itemsPerPage
            )
            .map((el) => <Task key={el.idTask} data={el} />)
        : null}
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

export default ProgressTasks;
