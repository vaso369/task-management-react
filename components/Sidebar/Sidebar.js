import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CardMedia,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LogoImg from '../../assets/TMSLogo.svg';
import { useStateGlobal, useDispatchState } from '../../src/GlobalState';
import DonutLargeOutlinedIcon from '@material-ui/icons/DonutLargeOutlined';
import Router from 'next/router';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '20%',
    backgroundColor: theme.palette.background.paper,
  },
  large: {
    width: '100%',
    height: theme.spacing(20),
    margin: '3% auto',
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();
  const dispatch = useDispatchState();
  const state = useStateGlobal();
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

  const sideBar = state.loggedIn ? (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <CardMedia
          title="logo task management"
          image={LogoImg}
          className={classes.large}
        />
        <Link href="/allTasks">
          <ListItem button>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="All tasks" />
          </ListItem>
        </Link>
        <Link href="/progressTasks">
          <ListItem button>
            <ListItemIcon>
              <DonutLargeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="In progress" />
          </ListItem>
        </Link>
        <Link href="/doneTasks">
          <ListItem button>
            <ListItemIcon>
              <DoneAllIcon />
            </ListItemIcon>
            <ListItemText primary="Done tasks" />
          </ListItem>
        </Link>
        {state.loggedIn === true && state.user.idPart === 2 ? null : (
          <Link href="/yourTeam">
            <ListItem button>
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Your team" />
            </ListItem>
          </Link>
        )}
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <NotificationsNoneIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <QuestionAnswerIcon />
          </ListItemIcon>
          <ListItemText primary="Support" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="FAQ" />
        </ListItem>
      </List>
    </div>
  ) : null;
  return sideBar;
}
