import Tag from './Tag/Tag';
import './_folderTags.scss';

const FolderTags = props => {
  const {
    folders,
    modes,
    actions,
    settings,
    funcs,
    formError,
  } = props;

  return (
    <div
      className={`folder-tags__container`}
    >
      {
        folders.map(folder => {
          const key = funcs.getKey('folder-tag', folder);
          return (
            <Tag
              key={key}
              folder={folder}
              modes={modes}
              actions={actions}
              settings={settings}
              formError={formError}
            />
          );
        })
      }
    </div>
  )
};

export default FolderTags;
