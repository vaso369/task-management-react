import React, { useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Avatar,
  Button,
} from '@material-ui/core';
import { useStateGlobal, useDispatchState } from '../../src/GlobalState';
import PriorityHighOutlinedIcon from '@material-ui/icons/PriorityHighOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import EmojiFlagsOutlinedIcon from '@material-ui/icons/EmojiFlagsOutlined';
import $ from 'jquery';
import { url } from '../../consts/consts';
// NOTIFICATION POPUP
import NotificationPopup from '../NotificationPopup/NotificationPopup';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
  },
  panel: {
    marginBottom: '0.5%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: '4%',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  projectId: {
    position: 'absolute',
    top: '25%',
    right: '2%',
  },
  expanded: {
    display: 'flex',
    flexDirection: 'column',
  },
  iconDesc: {
    color: 'grey',
    margin: '0% 3% 0 0',
  },
  lineTypo: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 3,
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: '30%',
  },
  bold: {
    color: 'grey',
    marginRight: '1%',
  },
}));

export default function Task(props) {
  const classes = useStyles();
  const state = useStateGlobal();
  const dispatch = useDispatchState();

  useEffect(() => {}, [state]);

  const doneTask = async (idTask) => {
    dispatch({
      type: 'SET_FETCH_START',
    });
    await axios
      .post(
        url + '/tasks/update',
        {
          idEmployee: Number(state.loggedIn ? state.user.id : 0),
          idTask: Number(idTask),
          idRole: Number(state.loggedIn ? state.user.idPart : 0),
        },
        {
          headers: {
            Authorization: 'JWT' + ' ' + localStorage.getItem('token'),
          },
        }
      )
      .then((data) => {
        dispatch({
          type: 'SET_FETCH_SUCCESS',
          data: 'Added to done tasks!',
        });
      })
      .catch((err) => {
        dispatch({
          type: 'SET_FETCH_ERROR',
          data: err.response.data.message,
        });
      });
    await axios
      .post(
        url + '/tasks/progress',
        {
          idEmployee: Number(state.loggedIn ? state.user.id : 0),
          idRole: Number(state.loggedIn ? state.user.idPart : 0),
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
          type: 'SET_FETCH_RESET',
        });
      })
      .catch((err) => {
        dispatch({
          type: 'SET_FETCH_ERROR',
          data: err.response.data.message,
        });
      });
  };

  console.log(state);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <ExpansionPanel className={classes.panel}>
          <ExpansionPanelSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Avatar
              alt={
                state.loggedIn &&
                state.user.emp_first_name + ' ' + state.user.emp_last_name
              }
              src={
                state.loggedIn &&
                state.user.imagePath !== '' &&
                state.user.idPart == 1
                  ? 'https://task-sys-laravel.herokuapp.com/user_pictures/' +
                    props.data.imagePath
                  : state.source
              }
              className={classes.small}
            />
            <Typography className={classes.heading}>
              {state.loggedIn && state.user.idPart === 2
                ? props.data.task_name
                : props.data.emp_first_name +
                  ' ' +
                  props.data.emp_last_name +
                  ' - ' +
                  props.data.task_name}
            </Typography>
            <Typography className={classes.projectId}>
              PR - {props.data.uniqueId}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expanded}>
            <Typography className={classes.lineTypo}>
              <DescriptionOutlinedIcon
                className={classes.iconDesc}
              ></DescriptionOutlinedIcon>
              <strong className={classes.bold}>Task description:</strong>{' '}
              {props.data.description}
            </Typography>
            <Typography className={classes.lineTypo}>
              <PriorityHighOutlinedIcon
                className={classes.iconDesc}
              ></PriorityHighOutlinedIcon>{' '}
              <strong className={classes.bold}>Priority:</strong>{' '}
              {props.data.priority}
            </Typography>
            <Typography className={classes.lineTypo}>
              <TodayOutlinedIcon
                className={classes.iconDesc}
              ></TodayOutlinedIcon>{' '}
              <strong className={classes.bold}>Deadline:</strong>{' '}
              {props.data.date}
            </Typography>
            {state.loggedIn &&
            state.progressTasks &&
            state.user.idPart === 2 ? (
              <Button
                id="doneTaskBtn"
                variant="contained"
                onClick={() => doneTask(props.data.idTask)}
              >
                DONE
              </Button>
            ) : (
              <Typography className={classes.status}>
                <EmojiFlagsOutlinedIcon
                  className={classes.iconDesc}
                ></EmojiFlagsOutlinedIcon>
                Status:&nbsp;
                <strong className={classes.bold}>
                  {Number(props.data.done) ? 'Done' : 'In progress'}
                </strong>
              </Typography>
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      {(state.hasError && state.errorMessage !== '') ||
      (state.isSuccess && state.successMessage !== '') ? (
        <NotificationPopup
          variant={state.notVariant}
          message={state.hasError ? state.errorMessage : state.successMessage}
        />
      ) : null}
    </React.Fragment>
  );
}
