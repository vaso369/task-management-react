import React from "react";
import { useStateGlobal, useDispatchState } from "../../src/GlobalState";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
} from "@material-ui/core";
import SendMessage from "./../SendMessage/SendMessage";
import AddTask from "../AddTask/AddTask";
import UserActivityTable from "../UserActivityTable/UserActivityTable";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    position: "relative",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: "20%",
    height: "20vh",
  },
  addTask: {
    float: "right",
  },
  divEmp: {
    display: "flex",
  },
  divInfo: {
    marginLeft: "5%",
    paddingTop: "5%",
  },
  styleP: {
    color: "grey",
  },
  btnSend: {
    width: 200,
    position: "absolute",
    bottom: "5%",
    right: "15%",
  },
  userActivityH1: {
    padding: "0% 0% 0% 3%",
    color: "grey",
    fontSize: "1.4em",
  },
});

const AboutEmployee = () => {
  const classes = useStyles();
  const state = useStateGlobal();
  const dispatch = useDispatchState();

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardContent className={classes.divEmp}>
          <Avatar
            alt={
              state.aboutEmployeeData[0].first_name +
              " " +
              state.aboutEmployeeData[0].last_name
            }
            src={
              "https://task-sys-laravel.herokuapp.com/user_pictures/" +
              state.aboutEmployeeData[0].imagePath
            }
            className={classes.large}
          />
          <div className={classes.divInfo}>
            <Typography>
              Name:&nbsp;
              <strong className={classes.styleP}>
                {state.aboutEmployeeData[0].first_name +
                  " " +
                  state.aboutEmployeeData[0].last_name}
              </strong>
            </Typography>
            <Typography>
              Username:&nbsp;
              <strong className={classes.styleP}>
                {state.aboutEmployeeData[0].username}
              </strong>
            </Typography>
            <Typography>
              Email:&nbsp;
              <strong className={classes.styleP}>
                {state.aboutEmployeeData[0].email}
              </strong>
            </Typography>
          </div>
          <div className={classes.btnSend}>
            <SendMessage
              props={state.user}
              employee={state.aboutEmployeeData[0]}
            />
          </div>
        </CardContent>

        <AddTask props={state.user} employee={state.aboutEmployeeData[0]} />
      </Card>
      <div id="user-activity">
        <UserActivityTable id={state.aboutEmployeeData[0].id} />
      </div>
    </React.Fragment>
  );
};

export default AboutEmployee;
