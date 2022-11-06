import './_appHeader.scss';
import SidebarSwitcher from './SidebarSwitcher/SidebarSwitcher';
import StatusFilterSwitcher from './StatusFilterSwitcher/StatusFilterSwitcher';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';

const AppHeader = props => {
  const {
    refs,
    actions,
    hooks,
    settings,
    funcs,
    modes,
  } = props;

  return (
    <div
      className='app-header__container'
    >

      <SidebarSwitcher
        refs={refs}
        actions={actions}
        funcs={funcs}
        settings={settings}
        modes={modes}
      />

      <StatusFilterSwitcher
        refs={refs}
        actions={actions}
        funcs={funcs}
        hooks={hooks}
        settings={settings}
      />

      <ThemeSwitcher
        refs={refs}
        actions={actions}
        settings={settings}
        hooks={hooks}
      />

    </div>
  )
};

export default AppHeader;
