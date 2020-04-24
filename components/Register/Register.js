import React from 'react';

// AJAX LIBRARY
import axios from 'axios';
// MATERIAL UI IMPORTS
import { TextField, Button } from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
// REGISTER STYLE CSS
import { useStyles } from './RegisterStyle';
// REGISTER INPUT FIELD VALIDATION DATA
import {
  fName,
  lName,
  userName,
  email,
  pass,
  emptyValue,
} from './RegisterInputObjects';
import Link from '../../src/Link';
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
// REMOVE BORDER COLOR ON EMPTY FIELD OR SUBMITED
import { removeBorderColorOnEmpty } from '../FormValidation/removeBorderColorOnEmpty';

const Register = () => {
  const classes = useStyles();
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  let okArray = [];
  const btnSubmit = () => {
    const fname = inputsValidation(
      fName.inputId,
      fName.regex,
      fName.errorMsg,
      fName.okMsg,
      fName.emptyValue
    );
    const lname = inputsValidation(
      lName.inputId,
      lName.regex,
      lName.errorMsg,
      lName.okMsg,
      lName.emptyValue
    );
    const username = inputsValidation(
      userName.inputId,
      userName.regex,
      userName.errorMsg,
      userName.okMsg,
      userName.emptyValue
    );
    const emaill = inputsValidation(
      email.inputId,
      email.regex,
      email.errorMsg,
      email.okMsg,
      email.emptyValue
    );
    const password = inputsValidation(
      pass.inputId,
      pass.regex,
      pass.errorMsg,
      pass.okMsg,
      pass.emptyValue
    );
    okArray.push(fname, lname, username, emaill, password);
    let forSend = true;
    for (let i = 0; i < okArray.length; i++) {
      if (okArray[i] === undefined) forSend = false;
    }
    if (forSend && okArray.length === 5) {
      const forInsert = {
        firstName: okArray[0],
        lastName: okArray[1],
        username: okArray[2],
        email: okArray[3],
        pass: okArray[4],
      };

      dispatch({
        type: 'SET_FETCH_START',
      });
      axios
        .post(url + '/register', forInsert)
        .then((data) => {
          dispatch({
            type: 'SET_FETCH_SUCCESS',
            data: 'Succesfully registration! Now you can log in..',
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
      <div className={classes.registerDiv}>
        <h2 className={classes.heading2}>Register</h2>
        <div className={classes.divs}>
          <TextField
            id="tbFirstName"
            label="FIRST NAME"
            className={classes.textBox}
            defaultValue=""
            variant="outlined"
            autoFocus
            onChange={() =>
              inputsValidation(
                fName.inputId,
                fName.regex,
                fName.errorMsg,
                fName.okMsg,
                fName.emptyValue
              )
            }
            onBlur={() => removeBorderColorOnEmpty('tbFirstName')}
          />
        </div>
        <div className={classes.divs}>
          <TextField
            id="tbLastName"
            className={classes.textBox}
            label="LAST NAME"
            defaultValue=""
            variant="outlined"
            onChange={() =>
              inputsValidation(
                lName.inputId,
                lName.regex,
                lName.errorMsg,
                lName.okMsg,
                lName.emptyValue
              )
            }
            onBlur={() => removeBorderColorOnEmpty('tbLastName')}
          />
        </div>
        <div className={classes.divs}>
          <TextField
            id="tbUserName"
            className={classes.textBox}
            label="USERNAME"
            defaultValue=""
            variant="outlined"
            onChange={() =>
              inputsValidation(
                userName.inputId,
                userName.regex,
                userName.errorMsg,
                userName.okMsg,
                userName.emptyValue
              )
            }
            onBlur={() => removeBorderColorOnEmpty('tbUserName')}
          />
        </div>
        <div className={classes.divs}>
          <TextField
            id="tbEmail"
            className={classes.textBox}
            label="EMAIL"
            defaultValue=""
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
          />
        </div>
        <div className={classes.divs}>
          <TextField
            id="tbPass"
            type="password"
            className={classes.textBox}
            label="PASSWORD"
            defaultValue=""
            variant="outlined"
            onChange={() =>
              inputsValidation(
                pass.inputId,
                pass.regex,
                pass.errorMsg,
                pass.okMsg,
                pass.emptyValue
              )
            }
            onBlur={() => removeBorderColorOnEmpty('tbPass')}
          />
        </div>
        <Button
          id="btnRegister"
          name="btnSubmit"
          onClick={btnSubmit}
          className={classes.btnRegister}
          variant="outlined"
          color="primary"
        >
          Register&nbsp;<BorderColorIcon></BorderColorIcon>
        </Button>
        <Button className={classes.btnLoginLink}>
          <Link href="/">
            <div className="loginDivBtn">
              <SwapHorizIcon className={classes.loginBtn}></SwapHorizIcon>
              Login
            </div>
          </Link>
        </Button>

        <style jsx>{`
          a {
            text-decoration: none;
          }
          .loginDivBtn {
            display: flex;
            align-items: center;
            font-size: 1rem;
            margin-top: 4%;
          }
        `}</style>

        {(state.hasError && state.errorMessage !== '') ||
        (state.isSuccess && state.successMessage !== '') ? (
          <NotificationPopup
            variant={state.notVariant}
            message={state.hasError ? state.errorMessage : state.successMessage}
          />
        ) : null}
      </div>

      {state.isLoading && <Loading />}
    </React.Fragment>
  );
};
export default Register;
