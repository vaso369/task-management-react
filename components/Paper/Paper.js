import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useStateGlobal } from '../../src/GlobalState';
import Header from './../Header/Header';


export default function SimplePaper({ children }) {
  const state = useStateGlobal();
  const height =
    state.loggedIn === true && state.user.idPart === 2 ? '100vh' : '90vh';
  const margin =
    state.loggedIn === true && state.user.idPart === 2 ? '0' : '8.5%';
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '57.5%',
      '& > *': {
        margin: `${margin} 0% 0 0`,
        width: '100%',
        height: height,
      },
    },
  }));
  const classes = useStyles();

  console.log(state);
  const content = state.loggedIn ? (
    <React.Fragment>
      {state.loggedIn === true && state.user.idBoss === 0 ? <Header /> : null}

      <div className={classes.root}>
        <Paper
          elevation={0}
          style={{
            backgroundColor: '#fafafa',
            position: 'relative',
          }}
        >
          {children}
        </Paper>
      </div>
    </React.Fragment>
  ) : null;
  return content;
}
