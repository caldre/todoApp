const saveState = (userID, state) => {
  try {
    const newState = JSON.stringify(state);
    localStorage.setItem(userID, newState);
    console.log("State saved succesfully to local storage");
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
};

const loadState = (userID) => {
  try {
    const localState = localStorage.getItem(userID);
    if (localState === null) {
      return [];
    }
    console.log("State loaded succesfully from local storage");
    return JSON.parse(localState);
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
};

const clearState = () => {
  localStorage.clear();
};

export { saveState, loadState, clearState };
