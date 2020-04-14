import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  textBox: {
    width: "80%",
    marginBottom: "3%",
    float: "left",
    marginLeft: "10%"
  },

  editDiv: {
    width: "100%",
    height: "80vh",
    position: "absolute",
    top: "0%",
    right: 0,
    textAlign: "center"
  },
  divs: {
    width: "100%"
  },
  heading2: {
    marginBottom: "3%",
    color: "grey"
  },
  btnEdit: {
    float: "right",
    marginRight: "10%",
    fontWeight: "bold",
    fontVariant: "normal",
    width: "20%"
  },
  icon: {
    color: "green",
    fontSize: "1.5em",
    marginTop: "2%",
    display: "none",
    float: "right",
    marginRight: "4%"
  },
  iconCancel: {
    color: "red",
    fontSize: "1.5em",
    marginTop: "2%",
    display: "none",
    float: "right",
    marginRight: "4%"
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
  feedback: {
    float: "left",
    width: "30%",
    position: "absolute",
    bottom: "-8%",
    left: "10%",
    display: "none"
  },
  iconSuccess: {
    color: "green",
    fontSize: "2em",
    marginRight: "2%"
  }
}));
