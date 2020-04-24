import React, { useEffect } from 'react';
import { useDispatchState, useStateGlobal } from '../../src/GlobalState';
// PAGINATION PAGE
import Pagination from '../Pagination/Paginations';
import OneEmployee from './../OneEmployee/OneEmployee';
const YourTeam = () => {
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  useEffect(() => {
    dispatch({
      type: 'SET_YOUR_TEAM',
    });
  }, []);
  console.log(state.team);
  return (
    <div>
      {state.team.slice(state.page * 5, state.page * 5 + 5).map((el) => (
        <OneEmployee key={el.id} props={el} />
      ))}
      <Pagination data={state.team} />
    </div>
  );
};

export default YourTeam;
