import './_summaryBar.scss';
import SummaryBarSection from './SummaryBarSection/SummaryBarSection';

const SummaryBar = props => {
  const {
    hooks,
    todos,
    funcs,
    settings,
  } = props;

  const totalDone = todos.filter(todo => todo.isDone).length;

  const previousTodos = todos.filter(todo => todo.date && (+todo.date === (+settings.currentChosenDate - 86400000)));

  const [summaryData, setSummaryData] = hooks.useState(
    [
      {
        id: 0,
        count: 0,
        comment: 'Left Todos',
        info: null,
      },
      {
        id: 1,
        count: 0,
        comment: 'Done Todos',
        info: null,
      },
      {
        id: 2,
        count: 0,
        comment: 'Total Done',
        info: null,
      },
    ]
  );

  const updateSummaryData = id => {
    switch (id) {
      case 0:
        setSummaryData(currentData => {
          const count = todos
            .filter(o => !o.isCompleted)
            .length;
          return currentData.map(o => o.id === 0 ? {...o, count} : o);
        });
        return;
      case 1:
        setSummaryData(currentData => {
          const count = todos
            .filter(o => o.isCompleted)
            .length;
          return currentData.map(o => o.id === 1 ? {...o, count} : o);
        });
        return;
      case 2:
        setSummaryData(currentData => {
          const count = totalDone || 0;
          return currentData.map(o => o.id === 2 ? {...o, count} : o);
        });
        return;
      default:
        break;
    };
  };

  const updateSummaryInfoData = () => {
    setSummaryData(currentData => {
      const previousCount = previousTodos.filter(todo => todo.isCompleted).length;
      const info = todos.filter(todo => todo.isCompleted).length - previousCount;

      return currentData.map(o => o.id === 1 ? {...o, info} : o);
    });
  };

  hooks.useDeepEffect(() => summaryData.forEach(section => updateSummaryData(section.id)), [todos]);

  hooks.useDeepEffect(() => updateSummaryInfoData(), [todos, settings.currentChosenDate]);

  return (
    <div
      className={`summary-bar__container`}
    >
      {
        summaryData.map(section => {
          const key = funcs.getKey('section', section.id);
          return (
            <SummaryBarSection
              key={key}
              count={section.count}
              comment={section.comment}
              info={section.info}
              settings={settings}
            />
          );
        })
      }
    </div>
  );
};

export default SummaryBar;
