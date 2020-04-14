import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  textBox: {
    width: "80%",
    marginBottom: "5%",
    float: "left",
    marginLeft: "10%"
  },

  registerDiv: {
    width: "22%",
    height: "95vh",
    position: "absolute",
    top: "2%",
    right: 0,
    textAlign: "center"
  },
  divs: {
    width: "100%"
  },
  heading2: {
    marginBottom: "7%",
    color: "grey"
  },
  btnRegister: {
    float: "right",
    marginRight: "10%",
    marginTop: "3%",
    fontWeight: "bold",
    fontVariant: "normal",
    width: "40%"
  },
  icon: {
    color: "green",
    fontSize: "1.5em",
    marginTop: "5%",
    display: "none",
    float: "right",
    marginRight: "1.5%"
  },
  iconCancel: {
    color: "red",
    fontSize: "1.5em",
    marginTop: "5%",
    display: "none",
    float: "right",
    marginRight: "1.5%"
  },
  cssFocused: {},
  cssLabel: {
    border: "none"
  },
  cssOutlinedInput: {},
  notchedOutline: {},
  notchedOutlineGood: {
    border: "2px solid green !important"
  },
  loginBtn: {
    color: "grey",
    fontSize: "2em",
    textDecoration: "underline"
  },
  feedback: {
    width: "100%",
    height: "15vh",
    position: "absolute",
    bottom: "0",
    right: "0",
    display: "none"
  },
  iconSuccess: {
    color: "green",
    marginTop: "5%",
    fontSize: "2em"
  }
}));
