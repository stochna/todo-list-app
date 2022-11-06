import { createStore, combineReducers } from 'redux';

const defaultTodo = {
  id: 0,
  todo: 'sleep well',
  isCompleted: false,
  date: new Date().setHours(0,0,0,0),
  folder: 1,
};

const initTodo = [defaultTodo];

const createTodo = data => (
  {
    ...defaultTodo,
    ...data,
    id: Date.now(),
  }
);

const todosReducer = (state = initTodo, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo = createTodo(
        {
          ...action.todo,
        }
      );
      return [...state, newTodo];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    case 'MARK_ACTIVE':
      return state.map(todo => todo.id === action.id ? {...todo, isCompleted: false} : todo);
    case 'MARK_COMPLETED':
      return state.map(todo => todo.id === action.id ? {...todo, isCompleted: Date.now()} : todo);
    default:
      return state;
  };
};

const initFolders = [
  {
    name: 'work',
    id: 1,
    color: '#FF546B',
  },
  {
    name: 'sport',
    id: 2,
    color: '#0099CC',
  },
  {
    name: 'home',
    id: 3,
    color: '#E162A5',
  },
];

const foldersReducer = (state = initFolders, action) => {
  switch (action.type) {
    case 'ADD_FOLDER':
      return [...state, action.folder];
    case 'DELETE_FOLDER':
      return state.filter(folder => folder.id !== action.id);
    default:
      return state;
  }
};

const initSettings = {
  device: null,
  theme: null,
  folderFilter: null,
  statusFilter: null,
  currentChosenDate: new Date(new Date().setHours(0,0,0,0)),

  _maxFoldersCount: 10,
  _maxTodoInputLength: 50,
  _maxFolderInputLength: 25,
};

const settingsReducer = (state = initSettings, action) => {
  switch (action.type) {
    case 'SET_DEVICE':
      return {
        ...state,
        device: action.device,
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.theme,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_FOLDER_FILTER':
      return {
        ...state,
        folderFilter: action.folderFilter,
      };
    case 'SET_STATUS_FILTER':
      return {
        ...state,
        statusFilter: action.statusFilter,
      };
    case 'SET_CURRENT_CHOSEN_DATE':
      return {
        ...state,
        currentChosenDate: action.date,
        };
    default:
      return state;
  };
};

const initModes = {
  todoAddMode: {
    isOn: false,
    newTodoData: {
      todo: '',
      date: null,
      folder: null,
    },
  },
  folderAddMode: {
    isOn: false,
    newFolderData: {
      name: '',
      id: null,
      color: 'transparent',
    },
  },
  folderDeleteMode: {
    isOn: false,
  },
  popupShownMode: {
    isOn: false,
    popupData: {
      message: '',
      callback: {
        agree: null,
        decline: null,
      },
    },
  },
  sidebarShownMode: {
    isOn: true,
  },
};

const modesReducer = (state = initModes, action) => {
  switch (action.type) {
    case 'SET_IS_MODE_ON':
      return {
        ...state,
        [action.mode]: {
          ...state[action.mode],
          isOn: action.isOn,
        }
      };
    case 'SET_NEW_TODO_DATA':
      return {
        ...state,
        todoAddMode: {
          ...state.todoAddMode,
          newTodoData: {
            ...state.todoAddMode.newTodoData,
            ...action.data,
          },
        }
      };
    case 'SET_NEW_FOLDER_DATA':
      return {
        ...state,
        folderAddMode: {
          ...state.folderAddMode,
          newFolderData: {
            ...state.folderAddMode.newFolderData,
            ...action.data,
          },
        }
      };
    case 'SET_POPUP_DATA':
      return {
        ...state,
        popupShownMode: {
          ...state.popupShownMode,
          popupData: {
            ...state.popupShownMode.popupData,
            ...action.data,
          },
        },
      };
    default:
      return state;
  };
};

const reducer = combineReducers({
  todos: todosReducer,
  folders: foldersReducer,
  settings: settingsReducer,
  modes: modesReducer,
});

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
