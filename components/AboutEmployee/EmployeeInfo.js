import { Avatar, Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { useStateGlobal } from '../../src/GlobalState';
import AddTask from '../AddTask/AddTask';
import SendMessage from './../SendMessage/SendMessage';
import { useStyles } from './EmployeeStyle';


const EmployeeInfo = () => {
  const state = useStateGlobal();
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.divEmp}>
        <Avatar
          alt={
            state.aboutEmployeeData[0].first_name +
            ' ' +
            state.aboutEmployeeData[0].last_name
          }
          src={
            'https://task-sys-laravel.herokuapp.com/user_pictures/' +
            state.aboutEmployeeData[0].imagePath
          }
          className={classes.large}
        />
        <div className={classes.divInfo}>
          <Typography>
            Name:&nbsp;
            <strong className={classes.styleP}>
              {state.aboutEmployeeData[0].first_name +
                ' ' +
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
  );
};

export default EmployeeInfo;
