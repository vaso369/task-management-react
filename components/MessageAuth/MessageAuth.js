import React, { useRef } from "react";

import { TextField, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useStyles } from "./MessageAuthStyle";
// BASE URL API
import { url } from "../../consts/consts";
// GLOBAL STATE DISPATCH
import { useStateGlobal, useDispatchState } from "../../src/GlobalState";
// LOADER SPINNER
import Loading from "./../Loading/Loading";
// NOTIFICATION POPUP
import NotificationPopup from "../NotificationPopup/NotificationPopup";
import axios from "axios";

const MessageAuth = () => {
  const classes = useStyles();
  const state = useStateGlobal();
  const dispatch = useDispatchState();

  const sendEmail = () => {
    const email = document.getElementById("tbEmail").value;
    const message = document.getElementById("tbMessage").value;
    // $.ajax({
    //   url: url + "/sendMail",
    //   method: "POST",
    //   dataType: "json",
    //   data: {
    //     email: email,
    //     message: message,
    //   },
    //   success: function (data) {
    //     alert("Your email is sent!");
    //   },
    //   error: function (xhr) {
    //     console.log(xhr);
    //     if (xhr.responseJSON) {
    //       alert(xhr.responseJSON.message + " " + xhr.responseJSON.error);
    //     }
    //   },
    // });

    dispatch({
      type: "SET_FETCH_START",
    });
    axios
      .post(url + "/sendMail", {
        email: email,
        message: message,
      })
      .then((data) => {
        dispatch({
          type: "SET_FETCH_SUCCESS",
          data:
            "Your message is sent! We will answer your question as soon as possible.",
        });
      })
      .catch((err) => {
        dispatch({
          type: "SET_FETCH_ERROR",
          data: err.response.data.message,
        });
      });
  };
  return (
    <>
      <div id="divMsg" className={classes.divMsg}>
        <h2 className={classes.h2}>Tech Support</h2>
        <TextField
          id="tbEmail"
          label="EMAIL"
          defaultValue=""
          className={classes.tbFirst}
          helperText=""
          variant="outlined"
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
            inputMode: "numeric",
          }}
        />
        <br></br>
        <TextField
          id="tbMessage"
          color="white"
          label="MESSAGE"
          className={classes.tbMsg}
          defaultValue=""
          helperText=""
          variant="outlined"
          margin="normal"
          rows="4"
          size="large"
          multiline
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
            inputMode: "numeric",
          }}
        />
        <br></br>
        <Button
          onClick={sendEmail}
          id="btnSendMsg"
          className={classes.btnSend}
          variant="outlined"
        >
          Send&nbsp;<SendIcon></SendIcon>
        </Button>
        {(state.hasError && state.errorMessage !== "") ||
        (state.isSuccess && state.successMessage !== "") ? (
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
