import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Register from "../Register/Register";
import { useStateGlobal, useDispatchState } from "../../src/GlobalState";
import AllTasks from "./../AllTasks/AllTasks";
import Header from "./../Header/Header";

export default function SimplePaper() {
  const state = useStateGlobal();
  const height =
    state.loggedIn === true && state.user.idPart === 2 ? "100vh" : "90vh";
  const margin =
    state.loggedIn === true && state.user.idPart === 2 ? "0" : "8.5%";
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      width: "57.5%",
      "& > *": {
        margin: `${margin} 0% 0 0`,
        width: "100%",
        height: height
      }
    }
  }));
  const classes = useStyles();

  let component = "";
  for (let i = 0; i < state.showComponents.length; i++) {
    if (state.showComponents[i].toShow) {
      component = state.showComponents[i].component;
      break;
    }
  }
  console.log(state);
  const content = state.loggedIn ? (
    <React.Fragment>
      {state.loggedIn === true && state.user.idBoss === 0 ? <Header /> : null}

      <div className={classes.root}>
        <Paper
          elevation={0}
          style={{
            backgroundColor: "#fafafa",
            position: "relative"
          }}
        >
          {component}
        </Paper>
      </div>
    </React.Fragment>
  ) : null;
  return content;
}
