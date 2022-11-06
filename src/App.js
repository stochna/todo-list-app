import './_app.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppHeader from './components/AppHeader/AppHeader';
import AppBody from './components/AppBody/AppBody';
import * as actions from './store/actions';
import * as lists from './addons/lists';
import * as hooks from './addons/hooks';
import * as funcs from './addons/funcs';

const App = props => {
  const {
    todos,
    folders,
    settings,
    modes,
    actions,
  } = props;

  const refs = {
    todos: hooks.useRef(null),
    newTodoForm: hooks.useRef(null),
    datePicker: hooks.useRef(null),
    newFolderTagButton: hooks.useRef(null),
    newFolderTagInput: hooks.useRef(null),
    sidebarSwitcher: hooks.useRef(null),
    sidebar: hooks.useRef(null),
    themeSwitcher: hooks.useRef(null),
    chosenDate: hooks.useRef(null),
    popup: hooks.useRef(null),
  };

  const clickTracker = e => {
    const isClickInTarget = (target, e) => target.current && (target.current === e.target || target.current.contains(e.target));

    if (modes.folderAddMode.isOn || modes.todoAddMode.isOn || modes.folderDeleteMode.isOn) {
      if (modes.folderDeleteMode.isOn) {
        const popupEl = refs.popup.current;
        if (popupEl && !isClickInTarget(popupEl, e)) {
          actions.setIsModeOn('folderDeleteMode', false);
        };
      };
      if (modes.folderAddMode.isOn) {
        const newFolderTagInputEl = refs.newFolderTagInput.current;
        if (newFolderTagInputEl && !isClickInTarget(newFolderTagInputEl, e)) {
          actions.setIsModeOn('folderAddMode', false);
        }
      };
      if (modes.todoAddMode.isOn) {
        const areSomeElsClicked = [
          refs.newTodoForm,
          refs.datePicker,
          refs.sidebar,
          refs.sidebarSwitcher,
          refs.themeSwitcher,
        ].filter(ref => ref.current)
          .map(el => isClickInTarget(el, e))
          .find(isClicked => isClicked);

        if (!areSomeElsClicked) {
          actions.setIsModeOn('todoAddMode', false);
        };
      };
    };
  };

  hooks.useDeviceSize(actions.setDevice);
  hooks.useSystemTheme(actions.setTheme);

  return (
    <div
      className={`app app_theme_${settings.theme}`}
      styles={
        {
          width: window.clientWidth,
        }
      }
      onClick={e => clickTracker(e)}
    >
      <AppHeader
        actions={actions}
        settings={settings}
        refs={refs}
        modes={modes}
        hooks={hooks}
        funcs={funcs}
      />

      <AppBody
        actions={actions}
        settings={settings}
        folders={folders}
        refs={refs}
        todos={todos.filter(todo => todo.date && (+todo.date === + settings.currentChosenDate))}
        modes={modes}
        lists={lists}
        hooks={hooks}
        funcs={funcs}
      />
    </div>
  );
};

const mapStateToProps = state => (
  {
    todos: state.todos,
    folders: state.folders,
    settings: state.settings,
    modes: state.modes,
  }
);

const mapDispatchToProps = dispatch => {
  return (
    {
      actions: bindActionCreators(actions, dispatch),
    }
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
