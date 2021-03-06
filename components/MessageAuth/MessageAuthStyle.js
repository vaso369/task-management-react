import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tbFirst: {
    width: '60%',
    borderRadius: '5px',
    backgroundColor: 'white !important',
    marginBottom: '3%',
  },
  cssLabel: {
    color: 'grey',
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {},
  },
  cssFocused: {
    backgroundColor: 'white !important',
    color: 'black',
  },
  notchedOutline: {
    color: 'grey',
  },
  tbMsg: {
    borderRadius: '5px',
    width: '75%',
    backgroundColor: 'white !important',
  },
  divMsg: {
    width: '22%',
    height: '20vh',
    position: 'absolute',
    top: '60%',
    right: 0,
    textAlign: 'center',
    marginBottom: '3%',
  },
  h2: {
    color: 'grey',
    marginBottom: '3%',
  },
  btnSend: {
    color: 'grey',
    backgroundColor: 'white !important',
    border: '1px solid grey',
  },
  divs: {
    width: '100%',
  },
}));
