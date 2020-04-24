import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';

import { useStateGlobal, useDispatchState } from '../../src/GlobalState';
import Link from 'next/link';
import Router from 'next/router';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Logout from '../Logout/Logout';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Error404 from '../Errors/404';
import BossInfo from '../BossInfo/BossInfo';
import { url } from '../../consts/consts';
import $ from 'jquery';
import axios from 'axios';
import UploadProgress from '../UploadProgress/UploadProgress';
// NOTIFICATION POPUP
import NotificationPopup from '../NotificationPopup/NotificationPopup';
import Loading from '../Loading/Loading';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '39vh',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'lightblue',
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: '0px auto',
  },
  fileUpload: {
    display: 'none',
    cursor: 'pointer',
  },
  iconAdd: {
    cursor: 'pointer',
  },
  cardActions: {
    justifyContent: 'space-between',
  },
  iconEdit: {
    color: 'blue',
  },
  editText: {
    color: 'grey',
    fontSize: '0.9rem',
  },
  btnUpload: {
    display: 'none',
    position: 'absolute',
    top: '1%',
    right: '0.5%',
    maxHeight: '4%',
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const state = useStateGlobal();
  const dispatch = useDispatchState();
  const [uploadProgress, setUploadProgress] = useState({
    loaded: 0,
    total: 0,
    percent: 0,
  });
  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      dispatch({
        type: 'SET_FETCH_START',
      });
    });
    Router.events.on('routeChangeComplete', () => {
      dispatch({
        type: 'SET_FETCH_RESET',
      });
    });
  }, []);
  useEffect(() => {}, [state]);

  const hideIcon = () => {
    $('#iconBtn').hide();
    $('#btnUpload').show();
  };
  const uploadPicture = () => {
    const picturePath = document.getElementById('file-upload').value;
    if (picturePath === '') {
      $('#iconBtn').show();
      $('#btnUpload').hide();
    } else {
      const name = document.getElementById('file-upload').files[0].name;
      const form_data = new FormData();
      const ext = name.split('.').pop().toLowerCase();
      const f = document.getElementById('file-upload').files[0];
      const fsize = f.size || f.fileSize;
      if (fsize > 2000000) {
        dispatch({
          type: 'SET_FETCH_ERROR',
          data: 'Image file size is very big!',
        });
        $('#iconBtn').show();
        $('#btnUpload').hide();
      } else {
        form_data.append(
          'file',
          document.getElementById('file-upload').files[0]
        );
        form_data.append('idEmployee', Number(state.user.id));

        // dispatch({
        //   type: "SET_FETCH_START",
        // });
        const options = {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            console.log(`${loaded}kb of ${total}kb | ${percent}%`);

            if (percent < 100) {
              setUploadProgress({ loaded, total, percent });
            }
          },
        };
        const { onUploadProgress } = options;
        axios
          .post(url + '/uploadPhoto', form_data, {
            headers: {
              Authorization: 'JWT' + ' ' + localStorage.getItem('token'),
              'Content-type': 'multipart/form-data',
            },
            onUploadProgress,
          })
          .then((data) => {
            setUploadProgress({ ...uploadProgress, percent: 100 });
            $('#iconBtn').show();
            $('#btnUpload').hide();
            console.log(data);
            dispatch({
              type: 'SET_SOURCE',
              data:
                'https://task-sys-laravel.herokuapp.com/user_pictures/' +
                data.data,
            });
            dispatch({
              type: 'SET_PICTURE',
              data: data.data,
            });
            setTimeout(() => {
              setUploadProgress({ loaded: 0, total: 0, percent: 0 });
            }, 1000);
          })
          .catch((err) => {
            dispatch({
              type: 'SET_FETCH_ERROR',
              data: err.response.data.message,
            });
          });
      }
    }
  };
  const userProfile =
    state.user !== null ? (
      <>
        <div
          style={{
            height: '100vh',
            maxWidth: '25%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Card className={classes.card} style={{ height: '60vh' }}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {(state.loggedIn && state.user.emp_first_name.charAt(0)) ||
                    'dsfsdfs'}
                </Avatar>
              }
              action={
                <div>
                  <IconButton
                    id="iconBtn"
                    onClick={hideIcon}
                    aria-label="Add photo"
                    className={classes.iconBtn}
                  >
                    <label htmlFor="file-upload">
                      <AddAPhotoIcon className={classes.iconAdd} />
                    </label>

                    <input
                      id="file-upload"
                      className={classes.fileUpload}
                      type="file"
                      name="file"
                    />
                  </IconButton>
                  <Button
                    id="btnUpload"
                    className={classes.btnUpload}
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={uploadPicture}
                  >
                    UPLOAD
                  </Button>
                </div>
              }
              title={
                state.loggedIn &&
                state.user.emp_first_name + ' ' + state.user.emp_last_name
              }
              subheader={state.loggedIn && state.user.name}
            />

            <Avatar
              alt={
                state.loggedIn &&
                state.user.emp_first_name + ' ' + state.user.emp_last_name
              }
              src={
                state.loggedIn && state.user.imagePath !== ''
                  ? 'https://task-sys-laravel.herokuapp.com/user_pictures/' +
                    state.userPicture
                  : state.source
              }
              className={classes.large}
            />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ margin: '3% 0' }}
              >
                <strong>Username:</strong>{' '}
                {state.loggedIn && state.user.username}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>Email:</strong> {state.loggedIn && state.user.emp_email}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button>
                <BorderColorIcon className={classes.iconEdit} />
                &nbsp;
                <Link href="/editProfile">
                  <a className={classes.editText}>Edit your profile</a>
                </Link>
              </Button>
              <Logout />
            </CardActions>
          </Card>

          {state.loggedIn === true && state.user.idPart === 2 ? (
            <Card className={classes.card}>
              <BossInfo />{' '}
            </Card>
          ) : null}
        </div>
        {uploadProgress.percent !== 0 && (
          <UploadProgress uploaded={uploadProgress} />
        )}
        {state.hasError && (
          <NotificationPopup
            variant={state.notVariant}
            message={state.errorMessage}
          />
        )}
      </>
    ) : (
      <Error404 />
    );

  return userProfile;
}
