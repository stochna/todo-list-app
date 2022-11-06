import './_mainbar.scss';
import Todos from './Todos/Todos';
import DatePicker from './DatePicker/DatePicker';
import Overview from './Overview/Overview';

const Mainbar = props => {
  const {
    todos,
    actions,
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
      className='mainbar__container'
    >

      <Todos
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

      <DatePicker
        actions={actions}
        refs={refs}
        lists={lists}
        hooks={hooks}
        funcs={funcs}
        settings={settings}
      />

      <Overview
        folders={folders}
        todos={todos}
        hooks={hooks}
        refs={refs}
        funcs={funcs}
        settings={settings}
      />

    </div>
  )
};

export default Mainbar;
