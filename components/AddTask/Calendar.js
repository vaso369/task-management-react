import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers() {
  const classes = useStyles();

  let d = new Date();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  const format = [year, month, day].join('-');

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="tbDate"
        label="DEADLINE"
        type="date"
        defaultValue={format}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
