import React from "react";

import axios from "axios";
// MATERIAL UI IMPORTS
import { TextField, Button } from "@material-ui/core";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
// REGISTER STYLE CSS
import { useStyles } from "./RegisterStyle";
// REGISTER INPUT FIELD VALIDATION DATA
import { fName, lName, userName, email, pass } from "./RegisterInputObjects";
import Link from "../../src/Link";
// BASE URL API
import { url } from "../../consts/consts";
// GLOBAL STATE DISPATCH
import { useStateGlobal, useDispatchState } from "../../src/GlobalState";
// LOADER SPINNER
import Loading from "./../Loading/Loading";
// NOTIFICATION POPUP
import NotificationPopup from "../NotificationPopup/NotificationPopup";

const Register = () => {
  const classes = useStyles();
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  let okArray = [];

  const inputsValidation = (element, regex, error, ok, classIndex) => {
    const elementValue = document.getElementById(element).value;
    const reElement = new RegExp(regex);
    if (reElement.test(elementValue)) {
      document.getElementsByClassName(classes.icon)[classIndex].style.display =
        "block";
      document.getElementsByClassName(classes.iconCancel)[
        classIndex
      ].style.display = "none";
      document.getElementsByClassName("MuiOutlinedInput-notchedOutline")[
        classIndex
      ].style.border = "2px solid green";
      okArray = [];

      document.getElementsByClassName("MuiFormHelperText-root")[
        classIndex
      ].style.color = "green";
      document.getElementsByClassName("MuiFormHelperText-root")[
        classIndex
      ].innerHTML = ok;
      return elementValue;
    } else {
      document.getElementsByClassName("MuiOutlinedInput-notchedOutline")[
        classIndex
      ].style.border = "2px solid red";
      document.getElementsByClassName(classes.icon)[classIndex].style.display =
        "none";
      document.getElementsByClassName(classes.iconCancel)[
        classIndex
      ].style.display = "block";
      document.getElementsByClassName("MuiFormHelperText-root")[
        classIndex
      ].style.color = "red";
      document.getElementsByClassName("MuiFormHelperText-root")[
        classIndex
      ].innerHTML = error;
    }
  };
  const btnSubmit = () => {
    const fname = inputsValidation(
      fName.inputId,
      fName.regex,
      fName.errorMsg,
      fName.okMsg,
      fName.classIndex
    );
    const lname = inputsValidation(
      lName.inputId,
      lName.regex,
      lName.errorMsg,
      lName.okMsg,
      lName.classIndex
    );
    const username = inputsValidation(
      userName.inputId,
      userName.regex,
      userName.errorMsg,
      userName.okMsg,
      userName.classIndex
    );
    const emaill = inputsValidation(
      email.inputId,
      email.regex,
      email.errorMsg,
      email.okMsg,
      email.classIndex
    );
    const password = inputsValidation(
      pass.inputId,
      pass.regex,
      pass.errorMsg,
      pass.okMsg,
      pass.classIndex
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
        type: "SET_FETCH_START",
      });
      axios
        .post(url + "/register", forInsert)
        .then((data) => {
          dispatch({
            type: "SET_FETCH_SUCCESS",
            data: "Succesfully registration! Now you can log in..",
          });
        })
        .catch((err) => {
          dispatch({
            type: "SET_FETCH_ERROR",
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
            helperText=" "
            variant="outlined"
            autoFocus
            onChange={() =>
              inputsValidation(
                fName.inputId,
                fName.regex,
                fName.errorMsg,
                fName.okMsg,
                fName.classIndex
              )
            }
          />
          <CheckCircleIcon className={classes.icon}></CheckCircleIcon>
          <CancelIcon className={classes.iconCancel}></CancelIcon>
        </div>
        <div className={classes.divs}>
          <TextField
            id="tbLastName"
            className={classes.textBox}
            label="LAST NAME"
            defaultValue=""
            helperText=" "
            variant="outlined"
            onChange={() =>
              inputsValidation(
                lName.inputId,
                lName.regex,
                lName.errorMsg,
                lName.okMsg,
                lName.classIndex
              )
            }
          />
          <CheckCircleIcon className={classes.icon}></CheckCircleIcon>
          <CancelIcon className={classes.iconCancel}></CancelIcon>
        </div>
        <div className={classes.divs}>
          <TextField
            id="tbUserName"
            className={classes.textBox}
            label="USERNAME"
            defaultValue=""
            helperText=" "
            variant="outlined"
            onChange={() =>
              inputsValidation(
                userName.inputId,
                userName.regex,
                userName.errorMsg,
                userName.okMsg,
                userName.classIndex
              )
            }
          />
          <CheckCircleIcon className={classes.icon}></CheckCircleIcon>
          <CancelIcon className={classes.iconCancel}></CancelIcon>
        </div>
        <div className={classes.divs}>
          <TextField
            id="tbEmail"
            className={classes.textBox}
            label="EMAIL"
            defaultValue=""
            helperText=" "
            variant="outlined"
            onChange={() =>
              inputsValidation(
                email.inputId,
                email.regex,
                email.errorMsg,
                email.okMsg,
                email.classIndex
              )
            }
          />
          <CheckCircleIcon className={classes.icon}></CheckCircleIcon>
          <CancelIcon className={classes.iconCancel}></CancelIcon>
        </div>
        <div className={classes.divs}>
          <TextField
            id="tbPass"
            type="password"
            className={classes.textBox}
            label="PASSWORD"
            defaultValue=""
            helperText=" "
            variant="outlined"
            onChange={() =>
              inputsValidation(
                pass.inputId,
                pass.regex,
                pass.errorMsg,
                pass.okMsg,
                pass.classIndex
              )
            }
          />
          <CheckCircleIcon className={classes.icon}></CheckCircleIcon>
          <CancelIcon className={classes.iconCancel}></CancelIcon>

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
        </div>
        <div id="feedback" className={classes.feedback}>
          <CheckCircleIcon className={classes.iconSuccess}></CheckCircleIcon>
          <br></br>
          Successful registration! Now you can log in...
        </div>
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

        {(state.hasError && state.errorMessage !== "") ||
        (state.isSuccess && state.successMessage !== "") ? (
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
