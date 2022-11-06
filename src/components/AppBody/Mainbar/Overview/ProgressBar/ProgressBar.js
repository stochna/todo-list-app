import './_progressBar.scss';
import ProgressBarSection from './ProgressBarSection/ProgressBarSection';

const ProgressBar = props => {
  const {
    folders,
    todos,
    hooks,
    settings,
    funcs,
  } = props;

  const usePercCounter = (folderID, perc, setPerc) => {
    hooks.useDeepEffect(() => {
      const totalTodaysTodosCount = todos.length;

      const todosInFolder = todos.filter(todo => todo.folder === folderID);
      const doneTodosInFolderCount = todosInFolder.filter(todo => todo.isCompleted).length;

      const getPerc = (doneCount, wholeCount) => (100 * doneCount) / wholeCount;

      const newPerc = getPerc(doneTodosInFolderCount, totalTodaysTodosCount);

      if (newPerc !== perc) {
        const step = 10;

        if (newPerc > perc) {
          for (let p = perc * step; p <= newPerc * step; p++) {
            setTimeout(() => setPerc(p / step), 100);
          };
          return;
        };

        if (newPerc < perc) {
          for (let p = perc * step; p >= newPerc * step; p--) {
            setTimeout(() => setPerc(p / step), 100);
          };
        };
      };
    }, [todos]);
  };

  return (
    <div
      className='progress-bar__container'
    >
      {
        folders
          .filter(folder => todos.find(todo => todo.folder === folder.id))
          .map(folder => {
            const key = funcs.getKey('progress-bar-section', folder.id);
            return (
              <ProgressBarSection
                key={key}
                folder={folder}
                hooks={
                  {
                    ...hooks,
                    usePercCounter,
                  }
                }
                settings={settings}
              />
            );
          }
        )
      }
    </div>
  )
};

export default ProgressBar;
