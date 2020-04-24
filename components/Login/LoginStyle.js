import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tbLogin: {
    width: '80%',
    marginBottom: '3%',
    // backgroundColor: "##E8F0FE"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'block',
  },
  login: {
    width: '22%',
    height: '50vh',
    position: 'absolute',
    top: '1%',
    right: 0,
    textAlign: 'center',
  },
  divLogin: {
    marginBottom: '3%',
  },
  loginH2: {
    color: 'grey',
  },
  btnLogin: {
    marginBottom: '2%',
  },
}));
