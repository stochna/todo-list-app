import './_todoListHeader.scss';
import PlusIcon from './../../../../../icons/PlusIcon/PlusIcon';

const TodosHeader = props => {
  const {
    actions,
    lists,
    funcs,
    settings,
    modes,
  } = props;

  const createHeader = date => {
    const now = new Date();

    const dayMs = 86400000;

    const today = now.setHours(0,0,0,0);
    const yesterday = today - dayMs;
    const tomorrow = today + dayMs;

    switch (+date) {
      case today: return 'Today';
      case yesterday: return 'Yesterday';
      case tomorrow: return 'Tomorrow';
      default:
        const [
          thisDate,
          thisDay,
          thisMonth,
          thisYear
        ] = [
          date.getDate(),
          date.getDay(),
          date.getMonth(),
          date.getFullYear()
        ];
        return `${funcs.getName(lists.daysOfWeekList[thisDay], 'long')}, ${funcs.getName(lists.monthsList[thisMonth], 'long')} ${thisDate}${thisYear === now.getFullYear() ? '' : `, ${thisYear}`}`;
    };
  };

  const header = createHeader(settings.currentChosenDate);

  return (
    <div
      className={`todo-list-header__container block__header`}
    >

        <span
          className={`block__title`}
        >
          {
            header
          }
        </span>

        <PlusIcon
          selfStyles={
            {
              size: '20px',
            }
          }
          selfStates={
            {
              isClicked: modes.todoAddMode.isOn,
            }
          }
          selfClassName={`todo-list-header__add-button`}
          eventHandlers={
            {
              onClick: () => actions.setIsModeOn('todoAddMode', !modes.todoAddMode.isOn),
            }
          }
        />

      </div>
  )
};

export default TodosHeader;
