import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CardMedia
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import LogoImg from "../../assets/TMSLogo.svg";
import { useStateGlobal, useDispatchState } from "../../src/GlobalState";
import DonutLargeOutlinedIcon from "@material-ui/icons/DonutLargeOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "20%",
    backgroundColor: theme.palette.background.paper
  },
  large: {
    width: "100%",
    height: theme.spacing(20),
    margin: "3% auto"
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();
  const dispatch = useDispatchState();
  const state = useStateGlobal();

  const handleClickAll = () => {
    state.progressTasks = false;
    state.doneTasks = false;
    state.yourTeam = false;

    dispatch({
      type: "ALL_TASKS"
    });
  };
  const handleClickProgress = () => {
    state.allTasks = false;
    state.doneTasks = false;
    state.yourTeam = false;

    dispatch({
      type: "PROGRESS_TASKS"
    });
  };
  const handleClickDone = () => {
    state.progressTasks = false;
    state.allTasks = false;
    state.yourTeam = false;

    dispatch({
      type: "DONE_TASKS"
    });
  };
  const handleClickTeam = () => {
    state.progressTasks = false;
    state.allTasks = false;
    state.doneTasks = false;

    dispatch({
      type: "YOUR_TEAM"
    });
  };
  const sideBar = state.loggedIn ? (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <CardMedia
          title="logo task management"
          image={LogoImg}
          className={classes.large}
        />
        <ListItem button onClick={handleClickAll}>
          <ListItemIcon>
            <FormatListNumberedIcon />
          </ListItemIcon>
          <ListItemText primary="All tasks" />
        </ListItem>
        <ListItem button onClick={handleClickProgress}>
          <ListItemIcon>
            <DonutLargeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="In progress" />
        </ListItem>
        <ListItem button onClick={handleClickDone}>
          <ListItemIcon>
            <DoneAllIcon />
          </ListItemIcon>
          <ListItemText primary="Done tasks" />
        </ListItem>
        {state.loggedIn === true && state.user.idPart === 2 ? null : (
          <ListItem button onClick={handleClickTeam}>
            <ListItemIcon>
              <PeopleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Your team" />
          </ListItem>
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
