import React, { useState, useEffect } from 'react';
import { useStateGlobal, useDispatchState } from '../../src/GlobalState';
// ACTIVITY TABLE
import UserActivityTable from '../UserActivityTable/UserActivityTable';
// ONE EMPLOYEE TASKS
import AllTasks from './../AllTasks/AllTasks';
import DoneTasks from './../DoneTasks/DoneTasks';
import ProgressTasks from './../ProgressTasks/ProgressTasks';
// EMPLOYEE INFO
import EmployeeInfo from './EmployeeInfo';
// BUTTONS ACTIVITY
import ButtonsActivity from './ButtonsActivity';
// USER GRAPHS
import UserGraphs from './UserGraphs';

const AboutEmployee = () => {
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  const [componentDisplay, setComponentDisplay] = useState(1);
  const componentToDisplay = (value) => {
    setComponentDisplay(value);
  };
  useEffect(() => {
    dispatch({
      type: 'SET_ACTIVITIES_SEARCH',
    });
  }, []);
  useEffect(() => {
    setComponentDisplay(1);
  }, [state.aboutEmployeeData[0].id]);
  return (
    <React.Fragment>
      <EmployeeInfo />
      <div className="buttons-activity">
        <ButtonsActivity componentToDisplay={componentToDisplay} />
      </div>
      <div className="user-activity" style={{ width: '100%', height: '55vh' }}>
        {componentDisplay == 1 ? (
          <UserActivityTable id={state.aboutEmployeeData[0].id} />
        ) : null}
        {componentDisplay == 2 ? (
          <AllTasks
            id={state.aboutEmployeeData[0].id}
            idRole={state.aboutEmployeeData[0].idPart}
            itemsPerPage={5}
          />
        ) : null}
        {componentDisplay == 3 ? (
          <ProgressTasks
            id={state.aboutEmployeeData[0].id}
            idRole={state.aboutEmployeeData[0].idPart}
            itemsPerPage={5}
          />
        ) : null}
        {componentDisplay == 4 ? (
          <DoneTasks
            id={state.aboutEmployeeData[0].id}
            idRole={state.aboutEmployeeData[0].idPart}
            itemsPerPage={5}
          />
        ) : null}
        {componentDisplay == 5 ? <UserGraphs /> : null}
      </div>
    </React.Fragment>
  );
};

export default AboutEmployee;
