import './_themeSwitcher.scss';

const ThemeSwitcher = props => {
  const {
    actions,
    settings,
    hooks,
  } = props;

  const switcherPosition = settings.theme === 'light' ? 'right' : 'left';

  const clickHandler = () => actions.toggleTheme();

  return (
    <div
      className={`theme-switcher__container`}
    >
      <div
        className={`theme-switcher__body`}
        onClick={clickHandler}
      >
        <div
          className={`theme-switcher__button-container theme-switcher__button-container_position-${switcherPosition}`}
        >
          <div
            className={`theme-switcher__button`}
          >
          </div>
        </div>
      </div>
    </div>
  )
};

export default ThemeSwitcher;
