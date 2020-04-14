import React, { useEffect } from "react";
import $ from "jquery";
import { url, urlRedirect } from "../../consts/consts";
import { useStateGlobal, useDispatchState } from "../../src/GlobalState";
import OneEmployee from "./../OneEmployee/OneEmployee";
const YourTeam = () => {
  const state = useStateGlobal();
  const dispatch = useDispatchState();

  console.log(state.team);
  return (
    <div>
      {state.team.map((el) => (
        <OneEmployee key={el.id} props={el} />
      ))}
    </div>
  );
};

export default YourTeam;
