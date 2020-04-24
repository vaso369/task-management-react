import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { useDispatchState, useStateGlobal } from '../../src/GlobalState';
import { SortDESCandASC } from '../SortFunctions/SortDESCandASC';

const options = [
  'Close',
  'Sort by deadline',
  'Sort by project ID',
  'Sort by task name',
];

const ITEM_HEIGHT = 48;

const DotMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const state = useStateGlobal();
  const dispatch = useDispatchState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    const sortBy = e.currentTarget.dataset.id;
    if (sortBy == 'Close') setAnchorEl(null);
    if (sortBy == 'Sort by deadline')
      SortDESCandASC(state, dispatch, 'date', 'desc');
    if (sortBy == 'Sort by project ID')
      SortDESCandASC(state, dispatch, 'uniqueId', 'desc');
    if (sortBy == 'Sort by task name')
      SortDESCandASC(state, dispatch, 'task_name', 'desc');
    setAnchorEl(null);
  };

  return state.allTasks ||
    state.progressTasks ||
    state.doneTasks ||
    state.yourTeam ? (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            data-id={option}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  ) : null;
};
export default DotMenu;
