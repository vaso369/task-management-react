export const SortDESCandASC = (state, dispatch, sortBy, sortFlow) => {
  const filteredTasks = state.allTasksData.sort((a, b) => {
    if (sortFlow == 'desc') {
      if (a[sortBy] > b[sortBy]) {
        return -1;
      }
      if (b[sortBy] > a[sortBy]) {
        return 1;
      }
      return 0;
    } else {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (b[sortBy] < a[sortBy]) {
        return 1;
      }
      return 0;
    }
  });
  dispatch({
    type: 'SET_TASKS',
    data: filteredTasks,
  });
  return null;
};
