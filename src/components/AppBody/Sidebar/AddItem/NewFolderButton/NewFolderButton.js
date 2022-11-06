import './_newFolderButton.scss';
import PlusIcon from './../../../../../icons/PlusIcon/PlusIcon';

const NewFolderButton = props => {
  const {
    refs,
    folders,
    actions,
    modes,
    settings,
  } = props;

  const mouseEnterHandler = () => {
    const setRandomFolderColor = () => {
      const getRandomColor = () => `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;

      actions.setNewFolderData(
        {
          color: getRandomColor(),
        }
      );
    };

    if (!modes.folderAddMode.isOn) {
      setRandomFolderColor();
    };
  };

  const clickHandler = (e) => {
    if (!modes.folderAddMode.isOn) {
      if (folders.length < settings._maxFoldersCount) {
        actions.setIsModeOn('folderAddMode', true);
      };
    };
  };

  return (
    <div
      ref={refs.newFolderTagButton}
      className={`sidebar__item sidebar__item_disabled_${folders.length >= settings._maxFoldersCount} sidebar__item_selected_false new-folder-button`}
      onMouseEnter={mouseEnterHandler}
      onClick={clickHandler}
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

      <div
        className={`sidebar__item-name`}
      >
        {
          'Add tag'
        }
      </div>

      <PlusIcon
        selfStyles={
          {
            size: '16px',
          }
        }
        selfClassName={`sidebar__add-item-button`}
      />

    </div>
  )
};

export default NewFolderButton;
