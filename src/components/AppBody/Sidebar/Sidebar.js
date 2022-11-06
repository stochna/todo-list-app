import './_sidebar.scss';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import SidebarItem from './SidebarItem/SidebarItem';
import AddItem from './AddItem/AddItem';

const Sidebar = props => {
  const {
    actions,
    settings,
    folders,
    refs,
    funcs,
    hooks,
    todos,
    modes,
  } = props;

  hooks.useLayoutEffect(() => {
    const sidebarEl = refs.sidebar.current;
    if (sidebarEl) {
      if (settings.device === 'mob' || settings.device === 'tablet') {
        sidebarEl.scrollLeft = sidebarEl.offsetWidth;
      } else {
        sidebarEl.scrollLeft = 0;
      };
    }
  }, [modes.folderAddMode.isOn, settings.device]);

  hooks.useEffect(() => {
    if (modes.folderAddMode.isOn) {
      if (settings.folderFilter) {
        actions.setFolderFilter(null);
      };
    };
  }, [modes.folderAddMode.isOn, settings.folderFilter]);

  hooks.useEffect(() => {
    if (modes.folderDeleteMode.isOn) {
      if (!modes.popupShownMode.isOn) {
        actions.setIsModeOn('popupShownMode', true);
      };
    } else {
      if (modes.popupShownMode.isOn) {
        actions.setIsModeOn('popupShownMode', false);
      };
    };
  }, [modes.folderDeleteMode.isOn]);

  hooks.useEffect(() => {
    if (settings.folderFilter !== null) {
      actions.setNewTodoData(
        {
          folder: settings.folderFilter,
        }
      );
    }
  }, [settings.folderFilter]);

  return (
    <div
      ref={refs.sidebar}
      className={`sidebar__container sidebar__container_shown_${modes.sidebarShownMode.isOn}`}
    >

        <TransitionGroup
          component={null}
          children={
            folders.map((folder, i) => {
              const key = funcs.getKey('sidebar-item', folder);

              return (
                <CSSTransition
                  key={key}
                  timeout={200}
                  classNames='default-transition'
                >
                  <SidebarItem
                    item={folder}
                    actions={actions}
                    settings={settings}
                    todos={todos}
                    hooks={hooks}
                  />
                </CSSTransition>
              )

            })
          }
        >
        </TransitionGroup>

        <AddItem
          refs={refs}
          folders={folders}
          actions={actions}
          funcs={funcs}
          modes={modes}
          settings={settings}
        />

    </div>
  )
};

export default Sidebar;
