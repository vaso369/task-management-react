import React from 'react';

import axios from 'axios';
import { Button, TextField, Modal } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SendIcon from '@material-ui/icons/Send';
import { url } from '../../consts/consts';
import $ from 'jquery';
import { makeStyles } from '@material-ui/core/styles';
import Calendar from './Calendar';
import Priority from './Priority';
import { useStateGlobal, useDispatchState } from '../../src/GlobalState';
// NOTIFICATION POPUP
import NotificationPopup from '../NotificationPopup/NotificationPopup';

function getModalStyle() {
  const top = 50;
  const left = 40;

  return {
    top: '40%',
    left: '50%',
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  btnMail: {
    float: 'right',
    margin: '20% 1% 0 0',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '3px',
  },
  textBoxTask: {
    width: '100%',
    marginBottom: '3%',
  },
  btnSend: {
    color: 'grey',
    backgroundColor: 'white !important',
    border: '1px solid grey',
    float: 'right',
  },
  btnAddTask: {
    backgroundColor: '#1e3f66',
    '&:hover': {
      background: '#2e5984',
    },
    color: 'white',
    position: 'absolute',
    bottom: '7%',
    right: '1%',
    width: 100,
  },
}));

const AddTask = ({ props, employee }) => {
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const state = useStateGlobal();
  const dispatch = useDispatchState();

  console.log(props, employee);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const taskValidation = (elementValue, ok, error, classIndex) => {
    if (elementValue !== '') {
      document.getElementsByClassName('MuiOutlinedInput-notchedOutline')[
        classIndex + 1
      ].style.border = '2px solid green';

      document.getElementsByClassName('MuiFormHelperText-root')[
        classIndex
      ].style.color = 'green';
      document.getElementsByClassName('MuiFormHelperText-root')[
        classIndex
      ].innerHTML = ok;
      return elementValue;
    } else {
      document.getElementsByClassName('MuiOutlinedInput-notchedOutline')[
        classIndex + 1
      ].style.border = '2px solid red';
      document.getElementsByClassName('MuiFormHelperText-root')[
        classIndex
      ].style.color = 'red';
      document.getElementsByClassName('MuiFormHelperText-root')[
        classIndex
      ].innerHTML = error;
      return false;
    }
  };

  const sendTask = () => {
    let arrOk = [];
    const taskName = document.getElementById('tbTaskName').value;
    const taskNameSend = taskValidation(
      taskName,
      'Task name accepted',
      'You have to enter task name!',
      0
    );
    if (taskNameSend !== '' && taskNameSend !== false) arrOk.push(taskNameSend);
    const description = document.getElementById('tbDescription').value;
    const descSend = taskValidation(
      description,
      'Description accepted',
      'You have to enter description!',
      1
    );
    if (descSend !== '' && descSend !== false) arrOk.push(descSend);
    const uniqueId = document.getElementById('tbUniqueId').value;
    let idSend = taskValidation(
      uniqueId,
      'Unique ID accepted',
      'You have to enter unique ID, just numbers!',
      2
    );
    if (idSend !== '' && idSend !== false) {
      idSend = Number(idSend);
      arrOk.push(idSend);
    }
    const date = document.getElementById('tbDate').value;
    arrOk.push(date);
    let priority = state.priority;
    if (priority === 0) {
      document.getElementById('feedbackTask').innerHTML =
        "<p style='color:red'>You have to choose priority</p>";
    } else {
      priority = Number(state.priority);
      document.getElementById('feedbackTask').innerHTML = '';
      arrOk.push(priority);
    }
    if (arrOk.length === 5) {
      const idEmployee = Number(employee.id);
      const idBoss = Number(props.id);
      const forSend = {
        idEmployee,
        idBoss,
        taskName,
        description,
        idSend,
        date,
        priority,
      };

      axios
        .post(url + '/addTask', forSend, {
          headers: {
            Authorization: 'JWT' + ' ' + localStorage.getItem('token'),
          },
        })
        .then((data) => {
          dispatch({
            type: 'SET_FETCH_SUCCESS',
            data: 'Task successfuly added!',
          });
        })
        .catch((err) => {
          dispatch({
            type: 'SET_FETCH_ERROR',
            data: err.response.data.message,
          });
        });
    }
  };
  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        color="primary"
        className={classes.btnAddTask}
        size="small"
      >
        ADD TASK
      </Button>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Add task</h2>
          <p id="simple-modal-description">
            Send to: {employee.first_name + ' ' + employee.last_name}
          </p>
          <TextField
            id="tbTaskName"
            className={classes.textBoxTask}
            type="text"
            label="TASK NAME"
            defaultValue=""
            helperText=" "
            variant="outlined"
          />
          <TextField
            id="tbDescription"
            className={classes.textBoxTask}
            type="text"
            label="DESCRIPTION"
            defaultValue=""
            helperText=" "
            variant="outlined"
            multiline="true"
            rows="4"
          />
          <TextField
            id="tbUniqueId"
            className={classes.textBoxTask}
            type="text"
            label="PROJECT ID"
            defaultValue=""
            helperText=" "
            variant="outlined"
          />
          <div>
            <Calendar />
          </div>
          <React.Fragment>
            <Priority />
            <div id="feedbackTask" className={classes.feedback}></div>
          </React.Fragment>
          <Button
            id="btnSendMsg"
            onClick={sendTask}
            className={classes.btnSend}
            variant="outlined"
          >
            ADD&nbsp;<SendIcon></SendIcon>
          </Button>
        </div>
      </Modal>
      {(state.hasError && state.errorMessage !== '') ||
      (state.isSuccess && state.successMessage !== '') ? (
        <NotificationPopup
          variant={state.notVariant}
          message={state.hasError ? state.errorMessage : state.successMessage}
        />
      ) : null}
    </React.Fragment>
  );
};

export default AddTask;
