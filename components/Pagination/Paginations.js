import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useStateGlobal, useDispatchState } from '../../src/GlobalState';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MyPagination(props) {
  const classes = useStyles();
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  const [page, setPage] = React.useState(1);
  useEffect(() => {}, [state]);
  const handleChangePage = (e, newPage) => {
    console.log(newPage);
    dispatch({
      type: 'SET_PAGE',
      data: newPage - 1,
    });
  };
  const { data } = props;
  console.log(props);
  return (
    <div
      style={{
        width: '100%',
        marginTop: '3%',
        display: 'flex',
        alignImtems: 'center',
        justifyContent: 'center',
      }}
    >
      <Pagination
        onChange={handleChangePage}
        count={Math.ceil(data.length / 5)}
      />
    </div>
  );
}
