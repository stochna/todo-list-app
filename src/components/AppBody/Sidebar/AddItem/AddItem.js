import './_addItem.scss';
import './../SidebarItem/_sidebarItem.scss';
import NewFolderButton from './NewFolderButton/NewFolderButton';
import NewFolderInput from './NewFolderInput/NewFolderInput';

const AddItem = props => {
  const {
    refs,
    folders,
    actions,
    funcs,
    modes,
    settings,
  } = props;

  return (
    !modes.folderAddMode.isOn?
    <NewFolderButton
      folders={folders}
      refs={refs}
      actions={actions}
      modes={modes}
      settings={settings}
    />
    :
    <NewFolderInput
      refs={refs}
      actions={actions}
      funcs={funcs}
      modes={modes}
      settings={settings}
    />
  )
};

export default AddItem;
