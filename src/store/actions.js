import * as constants from './constants';


const addTodo = todo => ({
  type: constants.ADD_TODO,
  todo,
});

const deleteTodo = id => ({
  type: constants.DELETE_TODO,
  id,
});

const markCompleted = id => ({
  type: constants.MARK_COMPLETED,
  id,
});

const markActive = id => ({
  type: constants.MARK_ACTIVE,
  id,
});


const addFolder = folder => ({
  type: constants.ADD_FOLDER,
  folder,
});

const deleteFolder = id => ({
  type: constants.DELETE_FOLDER,
  id,
});



const setDevice = device => ({
  type: constants.SET_DEVICE,
  device,
});

const setTheme = theme => ({
  type: constants.SET_THEME,
  theme,
});

const toggleTheme = () => ({
  type: constants.TOGGLE_THEME,
});

const setFolderFilter = folderFilter => ({
  type: constants.SET_FOLDER_FILTER,
  folderFilter,
});

const setStatusFilter = statusFilter => ({
  type: constants.SET_STATUS_FILTER,
  statusFilter,
});

const setCurrentChosenDate = date => ({
  type: constants.SET_CURRENT_CHOSEN_DATE,
  date,
});


const setIsModeOn = (mode, isOn) => ({
  type: constants.SET_IS_MODE_ON,
  mode,
  isOn,
});

const setNewTodoData = data => ({
  type: constants.SET_NEW_TODO_DATA,
  data,
});

const setNewFolderData = data => ({
  type: constants.SET_NEW_FOLDER_DATA,
  data,
});

const setPopupData = data => ({
  type: constants.SET_POPUP_DATA,
  data,
});


export {
  addTodo,
  deleteTodo,
  markCompleted,
  markActive,

  addFolder,
  deleteFolder,

  setDevice,
  setTheme,
  toggleTheme,
  setFolderFilter,
  setStatusFilter,
  setCurrentChosenDate,
  setPopupData,

  setIsModeOn,
  setNewTodoData,
  setNewFolderData,
};
