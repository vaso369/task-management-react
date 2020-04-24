import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    border: 'none',
  },
  inputRoot: {
    width: '100%',
    border: '1px solid white !important',
    borderRadius: '3px',
  },
  cssLabel: {
    color: 'white',
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': { display: 'none' },
  },
  cssFocused: {
    color: 'white',
    display: 'none',
  },
  option: {
    backgroundColor: 'black',
    margin: 0,
    padding: 0,
  },
  small: {
    marginRight: '8px',
  },
  divItem: {
    display: 'flex',
    alignItems: 'center',
  },
  divSearch: {
    display: 'flex',
    alignItems: 'center',
  },
  iconSearch: {
    fontSize: '3em',
    marginRight: '1%',
    marginLeft: '-2%',
    cursor: 'pointer',
  },
}));
