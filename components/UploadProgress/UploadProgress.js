import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#556cd6', 0.5),
    width: '50%',
    margin: '0px auto',
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#556cd6',
  },
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: '0px auto',
  },
}));

export default function CustomizedProgressBars(props) {
  const classes = useStyles();

  return (
    <div
      id="upload-progress"
      style={{
        backgroundColor: 'white',
        opacity: 0.7,
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className={classes.root}>
        {/* <h2>
          Loaded: {props.uploaded.loaded}kb of {props.uploaded.total}kb |{" "}
          {props.uploaded.percent}%
        </h2> */}
        <BorderLinearProgress
          className={classes.margin}
          variant="determinate"
          color="primary"
          value={props.uploaded.percent}
        />
      </div>
    </div>
  );
}
