import React from 'react';

// AJAX LIBRARY
import axios from 'axios';
// MATERIAL UI
import { TextField, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
// CSS STYLE FORM
import { useStyles } from './MessageAuthStyle';
// BASE URL API
import { url } from '../../consts/consts';
// GLOBAL STATE DISPATCH
import { useStateGlobal, useDispatchState } from '../../src/GlobalState';
// LOADER SPINNER
import Loading from './../Loading/Loading';
// NOTIFICATION POPUP
import NotificationPopup from '../NotificationPopup/NotificationPopup';
// FROM VALIDATION FUNCTION
import { inputsValidation } from './../FormValidation/FormValidation';
// INPUT VALIDATION OBJECTS
import { email, message } from './MessageInputObjects';
// REMOVE BORDER COLOR ON EMPTY FIELD OR SUBMITED
import { removeBorderColorOnEmpty } from '../FormValidation/removeBorderColorOnEmpty';

const MessageAuth = () => {
  const classes = useStyles();
  const state = useStateGlobal();
  const dispatch = useDispatchState();

  const sendEmail = () => {
    let arrayOk = [];

    const emailValidate = inputsValidation(
      email.inputId,
      email.regex,
      email.errorMsg,
      email.okMsg,
      email.emptyValue
    );
    const messageValidate = inputsValidation(
      message.inputId,
      message.regex,
      message.errorMsg,
      message.okMsg,
      message.emptyValue
    );
    if (emailValidate !== false) arrayOk.push(emailValidate);
    if (messageValidate !== false) arrayOk.push(messageValidate);
    if (arrayOk.length == 2) {
      dispatch({
        type: 'SET_FETCH_START',
      });
      axios
        .post(url + '/sendMail', {
          email: arrayOk[0],
          message: arrayOk[1],
        })
        .then((data) => {
          dispatch({
            type: 'SET_FETCH_SUCCESS',
            data:
              'Your message is sent! We will answer your question as soon as possible.',
          });
          removeBorderColorOnEmpty('tbEmail', 'tbMessage');
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
    <>
      <div id="divMsg" className={classes.divMsg}>
        <h2 className={classes.h2}>Tech Support</h2>

        <div className={classes.divs}>
          <TextField
            id="tbEmail"
            label="EMAIL"
            defaultValue=""
            className={classes.tbFirst}
            variant="outlined"
            onChange={() =>
              inputsValidation(
                email.inputId,
                email.regex,
                email.errorMsg,
                email.okMsg,
                email.emptyValue
              )
            }
            onBlur={() => removeBorderColorOnEmpty('tbEmail')}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              inputMode: 'numeric',
            }}
          />
        </div>
        <div>
          <TextField
            id="tbMessage"
            color="white"
            label="MESSAGE"
            className={classes.tbMsg}
            defaultValue=""
            variant="outlined"
            margin="normal"
            rows="4"
            size="large"
            multiline
            onChange={() =>
              inputsValidation(
                'tbMessage',
                '^.{0,250}$',
                'Maximum characters',
                'Message accepted!'
              )
            }
            onBlur={() => removeBorderColorOnEmpty('tbMessage')}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              inputMode: 'numeric',
            }}
          />
        </div>
        <br></br>
        <Button
          onClick={sendEmail}
          id="btnSendMsg"
          className={classes.btnSend}
          variant="outlined"
        >
          Send&nbsp;<SendIcon></SendIcon>
        </Button>
        {(state.hasError && state.errorMessage !== '') ||
        (state.isSuccess && state.successMessage !== '') ? (
          <NotificationPopup
            variant={state.notVariant}
            message={state.hasError ? state.errorMessage : state.successMessage}
          />
        ) : null}
      </div>
      {state.isLoading && <Loading />}
    </>
  );
};
export default MessageAuth;
