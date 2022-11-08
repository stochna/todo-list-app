import './_newFolderInput.scss';;

const NewFolderInput = props => {
  const {
    refs,
    actions,
    modes,
    settings,
  } = props;

  const resetFolderInput = () => actions.setNewFolderData(
    {
      name: '',
      id: null,
      color: 'transparent',
    }
  );

  const blurHandler = e => {
    resetFolderInput();
  };

  const inputChangeHandler = e => {
    e.preventDefault();

    if (modes.folderAddMode.isOn) {
      if (e.target.value.length <= settings._maxFolderInputLength) {
        actions.setNewFolderData(
          {
            name: e.target.value,
          }
        );
      };
    };
  };

  const inputKeyUpHandler = e => {
    e.preventDefault();

    const addNewFolder = () => {
      const newFolder = {
        ...modes.folderAddMode.newFolderData,
        id: Date.now(),
      };

      actions.addFolder(newFolder);

      resetFolderInput();
      actions.setIsModeOn('folderAddMode', false);
    };

    if (modes.folderAddMode.isOn) {
      if (e.key === 'Enter') {
        if (e.target.value.trim().length) {
          addNewFolder();
        };
      };
    };
  };

  return (
    <div
      className={`sidebar__item sidebar__item_disabled_false sidebar__item_selected_true`}
    >

      <div
        className={`sidebar__item-color-indicator`}
        style={
          {
            background: modes.folderAddMode.newFolderData.color,
          }
        }
      >
      </div>

      <input
        ref={refs.newFolderTagInput}
        value={modes.folderAddMode.newFolderData.name}
        className={`sidebar__item-name sidebar__input input`}
        style={
          {
            color: modes.folderAddMode.newFolderData.color,
          }
        }
        onBlur={e => blurHandler(e)}
        onChange={e => inputChangeHandler(e)}
        onKeyUp={e => inputKeyUpHandler(e)}
        autoFocus
      >
      </input>

    </div>
  )
};

export default NewFolderInput;
