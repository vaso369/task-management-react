import React, { useEffect } from "react";
import axios from "axios";

import { url, urlRedirect } from "../../consts/consts";
import { useStateGlobal, useDispatchState } from "../../src/GlobalState";
import Task from "../AllTasks/Task";
import Pagination from "../Pagination/Paginations";
// LOADER SPINNER
import Loading from "./../Loading/Loading";
// NOTIFICATION POPUP
import NotificationPopup from "../NotificationPopup/NotificationPopup";

const DoneTasks = () => {
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  useEffect(() => {
    dispatch({
      type: "SET_FETCH_START",
    });
    axios
      .post(
        url + "/tasks/done",
        {
          idEmployee: Number(state.loggedIn ? state.user.id : 0),
          idRole: Number(state.loggedIn ? state.user.idPart : 0),
        },
        {
          headers: {
            Authorization: "JWT" + " " + localStorage.getItem("token"),
          },
        }
      )
      .then((data) => {
        dispatch({
          type: "SET_TASKS",
          data: data.data,
        });
        dispatch({
          type: "SET_FETCH_RESET",
        });
      })
      .catch((err) => {
        dispatch({
          type: "SET_FETCH_ERROR",
          data: err.response.data.message,
        });
      });
  }, []);

  return (
    <div>
      {state.allTasksData
        .slice(state.page * 5, state.page * 5 + 5)
        .map((el) => (
          <Task key={el.idTask} data={el} />
        ))}
      <Pagination tasks={state.allTasksData} />
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

export default DoneTasks;
