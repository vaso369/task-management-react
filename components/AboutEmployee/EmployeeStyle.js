import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    minWidth: 275,
    position: 'relative',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: '20%',
    height: '20vh',
  },
  addTask: {
    float: 'right',
  },
  divEmp: {
    display: 'flex',
  },
  divInfo: {
    marginLeft: '5%',
    paddingTop: '5%',
  },
  styleP: {
    color: 'grey',
  },
  btnSend: {
    width: 200,
    position: 'absolute',
    bottom: '5%',
    right: '15%',
  },
  userActivityH1: {
    padding: '0% 0% 0% 3%',
    color: 'grey',
    fontSize: '1.4em',
  },
});
