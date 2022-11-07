import './_statusFilterSwitcher.scss';

const StatusFilterSwitcher = props => {
  const {
    refs,
    actions,
    hooks,
    funcs,
    settings,
  } = props;

  const [switcherOptionsList, setSwitcherOptionsList] = hooks.useState([
    {
      id: 0,
      status: 'active',
      name: 'Active',
      isSelected: false,
    },
    {
      id: 1,
      status: null,
      name: 'All',
      isSelected: true,
    },
    {
      id: 2,
      status: 'done',
      name: 'Done',
      isSelected: false,
    },
  ]);

  const switcherButtonWidth = settings.device === 'mob' ? document.documentElement.clientWidth / 3 : settings.device === 'desktop' ? 70 : 110;
  const switcherButtonPadding = settings.device === 'mob' || settings.device === 'desktop' ? 3 : 4;

  const clickHandler = status => {
    const selectOption = () => {
      setSwitcherOptionsList(currentList => {
        const newSwitcherOptionsList = currentList.map(option => (
            {
              ...option,
              isSelected: option.status === status,
            }
          ));
        return newSwitcherOptionsList;
      });
    };

    selectOption();
  };


  hooks.useDeepEffect(() => {
    const newSelectedStatus = switcherOptionsList.find(option => option.isSelected).status;
    actions.setStatusFilter(newSelectedStatus);
  }, [switcherOptionsList]);

  return (
    <div
      ref={refs.statusFilter}
      className={`status-filter__container`}
      style={
        {
          width: `${(switcherButtonWidth * 3) + (switcherButtonPadding * 2)}px`,
        }
      }
    >
      <div
        className={`status-filter__button`}
        style={
          {
            width: `${switcherButtonWidth}px`,
            marginLeft: `${switcherButtonWidth * switcherOptionsList.find(option => option.isSelected).id}px`,
          }
        }
      >
      </div>
      <div
        className={`status-filter__options`}
      >
        {
          switcherOptionsList.map(option => {
            const key = funcs.getKey('switcher-option', option);
            return (
              <div
                key={key}
                className={`status-filter__option status-filter__option_selected_${option.isSelected}`}
                style={
                  {
                    width: switcherButtonWidth,
                  }
                }
                onClick={() => clickHandler(option.status)}
              >
                {
                  option.name
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default StatusFilterSwitcher;
