export const hydrateStateWithLocalStorage = (globalState, dispatch) => {
  // for all items in state
  for (let key in globalState) {
    // if the key exists in localStorage
    if (localStorage.hasOwnProperty(key)) {
      // get the key's value from localStorage
      let value = localStorage.getItem(key);

      // parse the localStorage string and setState
      try {
        value = JSON.parse(value);
        dispatch({
          type: 'SET_STATE_LOCAL_STORAGE',
          payload: {
            [key]: value,
          },
        });
      } catch (e) {
        // handle empty string
        dispatch({
          type: 'SET_STATE_LOCAL_STORAGE',
          payload: {
            [key]: value,
          },
        });
      }
    }
  }
};
