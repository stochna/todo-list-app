import './_sidebarSwitcher.scss';

const SidebarSwitcher = props => {
  const {
    refs,
    actions,
    funcs,
    settings,
    modes,
  } = props;

  const clickHandler = () => !modes.sidebarShownMode.isOn ? actions.setIsModeOn('sidebarShownMode', true) : actions.setIsModeOn('sidebarShownMode', false);

  return (
    <div
      ref={refs.sidebarSwitcher}
      className={`sidebar-switcher__container sidebar-switcher__container_opened_${modes.sidebarShownMode.isOn}`}
      onClick={clickHandler}
    >
      <div
        className='sidebar-switcher__icon'
      >
        {
          [1, 2, 3].map(line => {
            const key = funcs.getKey('line', line);
            return (
              <div
                key={key}
                className={`sidebar-switcher__line sidebar-switcher__line_${line}`}
              >
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default SidebarSwitcher;
