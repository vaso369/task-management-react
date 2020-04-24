import React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useDispatchState } from '../../src/GlobalState';

function NotificationPopup(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatchState();
  // variant could be success, error, warning, info, or default
  enqueueSnackbar(props.message, { variant: props.variant });
  setTimeout(() => {
    dispatch({
      type: 'SET_FETCH_RESET',
    });
  }, 4000);

  return null;
}

export default function IntegrationNotistack(props) {
  return (
    <SnackbarProvider maxSnack={1}>
      <NotificationPopup
        variant={props.variant}
        message={props.message}
        errorReset={props.errorReset}
      />
    </SnackbarProvider>
  );
}
