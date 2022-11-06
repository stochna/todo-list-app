import './_sidebarItem.scss';

const SidebarItem = props => {
  const {
    item : {
      id : folderID,
      name: folderName,
      color: folderColor,
    },
    actions,
    settings,
    todos,
    hooks,
  } = props;

  const [leftTodosCount, setLeftTodosCount] = hooks.useState(0);

  const isItemSelected = folderID === settings.folderFilter;

  const clickHandler = () => {
    const isFolderAFilter = settings.folderFilter === folderID;

    if (isFolderAFilter) {
      const resetFolderFilter = () => {
        actions.setFolderFilter(null);
        actions.setNewTodoData(
          {
            folder: null,
          }
        );
      }
      resetFolderFilter();
    } else {
      const newFolderFilter = folderID;
      actions.setFolderFilter(newFolderFilter);
    }
  };

  const deleteHanler = e => {
    e.stopPropagation();

    actions.setIsModeOn('folderDeleteMode', true);

    const disableDeleteMode = () => actions.setIsModeOn('folderDeleteMode', false);

    const deleteFolder = () => {
      actions.deleteFolder(folderID);
      todos.forEach(todo => {
        if (todo.folder === folderID) {
          actions.deleteTodo(todo.id);
        };
      });
      if (settings.folderFilter === folderID) {
        actions.setFolderFilter(null);
      };
      disableDeleteMode();
    };

    actions.setPopupData(
      {
        message: `Are you sure you want to delete this folder? It will also delete all todos inside it.`,
        callback: {
          agree: deleteFolder,
          decline: disableDeleteMode,
        },
      }
    );
  };

  hooks.useDeepEffect(() => {
    const leftTodos = todos.filter(todo => !todo.isCompleted && (todo.folder === folderID));

    setLeftTodosCount(leftTodos.length);
  }, [todos]);

  return (
    <div
      className={`sidebar__item sidebar__item_disabled_false sidebar__item_selected_${isItemSelected}`}
      style={
        {
          color: (settings.device === 'mob' || settings.device === 'tablet') ? folderColor : 'auto',
        }
      }
      onClick={clickHandler}
    >

      <div
        className={`sidebar__item-color-indicator`}
        style={
          {
            background: folderColor,
          }
        }
      >
      </div>

      <div
        className={`sidebar__item-name`}
      >
        <span
          onClick={e => deleteHanler(e)}
        >
          {
            folderName
          }
        </span>
      </div>

      {
        settings.device === 'desktop' && (leftTodosCount > 0) && (
          <div
            className={`sidebar__left-count`}
          >
            {
              leftTodosCount
            }
          </div>
        )
      }

    </div>
  )
};

export default SidebarItem;
