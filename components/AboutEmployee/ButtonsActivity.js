import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatchState } from '../../src/GlobalState';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function BasicButtonGroup(props) {
  const classes = useStyles();
  const dispatch = useDispatchState();
  const handleClickActivity = (e) => {
    switch (e.currentTarget.value) {
      case '1':
        dispatch({
          type: 'SET_ACTIVITIES_SEARCH',
        });
        break;
      case '2':
        dispatch({
          type: 'SET_ALL_TASKS',
        });
        break;
      case '3':
        dispatch({
          type: 'SET_PROGRESS_TASKS',
        });
        break;
      case '4':
        dispatch({
          type: 'SET_DONE_TASKS',
        });
        break;
      case '5':
        dispatch({
          type: 'SET_WORK_STATISTICS',
        });
        break;
    }
    props.componentToDisplay(Number(e.currentTarget.value));
  };
  return (
    <div className={classes.root}>
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        <Button value="1" onClick={handleClickActivity}>
          USER ACTIVITY
        </Button>
        <Button value="2" onClick={handleClickActivity}>
          ALL TASKS
        </Button>
        <Button value="3" onClick={handleClickActivity}>
          PROGRESS TASKS
        </Button>
        <Button value="4" onClick={handleClickActivity}>
          DONE TASKS
        </Button>
        <Button value="5" onClick={handleClickActivity}>
          WORK STATISTICS
        </Button>
      </ButtonGroup>
    </div>
  );
}
