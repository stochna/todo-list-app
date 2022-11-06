import './_appBody.scss';
import Sidebar from './Sidebar/Sidebar';
import Mainbar from './Mainbar/Mainbar';
import Popup from './Popup/Popup';

const AppBody = props => {
  const {
    actions,
    todos,
    folders,
    refs,
    settings,
    lists,
    hooks,
    funcs,
    modes,
  } = props;

  return (
    <div
      className={`app-body__container`}
    >

      <Sidebar
        folders={folders}
        actions={actions}
        settings={settings}
        refs={refs}
        funcs={funcs}
        hooks={hooks}
        todos={todos}
        modes={modes}
      />

      <Mainbar
        todos={todos}
        actions={actions}
        folders={folders}
        refs={refs}
        settings={settings}
        lists={lists}
        hooks={hooks}
        funcs={funcs}
        modes={modes}
      />

      <Popup
        refs={refs}
        funcs={funcs}
        modes={modes}
      />

    </div>
  )
};

export default AppBody;
