import './_tag.scss';

const Tag = props => {
  const {
    folder,
    actions,
    settings,
    formError,
    modes,
  } = props;

  const getColor = type => {
    const isTagActive = (folder.id === modes.todoAddMode.newTodoData.folder) || (folder.id === settings.folderFilter);

    switch (type) {
      case 'background':
        return isTagActive ? folder.color : 'transparent'
      case 'font':
        return isTagActive ? '#FFFFFF' : folder.color;
      default:
        return folder.color;
    }
  };

  const clickHandler = () => {
    if (modes.todoAddMode.newTodoData.folder !== folder.id) {
      actions.setNewTodoData(
        {
          folder: folder.id,
        }
      );
    } else {
      actions.setNewTodoData(
        {
          folder: null,
        }
      );
    };
    if (formError && (formError.name === 'Folder is not choosed')) {
      actions.setError(null);
    };
    if (settings.folderFilter !== folder.id) {
      actions.setFolderFilter(null);
    };
  };

  return (
    <div
      type='button'
      className={`form__tag button`}
      style={
        {
          background: getColor('background'),
          color: getColor('font'),
          border: (settings.device === 'tablet' || settings.device === 'desktop') ? `1px solid ${folder.color}` : 'transparent',
        }
      }
      onClick={clickHandler}
    >
      <span>
        {
          folder.name
        }
      </span>
    </div>
  )
};

export default Tag;
