import './_todos.scss';
import NewTodoForm from './NewTodoForm/NewTodoForm';
import TodoList from './TodoList/TodoList';
import TodoListHeader from './TodoListHeader/TodoListHeader';

const Todos = props => {
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
      ref={refs.todos}
      className={`todos block`}
    >
      <div
        className={`todos_scrollable_true`}
      >

        <TodoListHeader
          actions={actions}
          lists={lists}
          funcs={funcs}
          settings={settings}
          modes={modes}
        />

        <NewTodoForm
          folders={folders}
          actions={actions}
          refs={refs}
          settings={settings}
          hooks={hooks}
          funcs={funcs}
          modes={modes}
        />

        <TodoList
          todos={todos}
          actions={actions}
          folders={folders}
          settings={settings}
          funcs={funcs}
        />

      </div>
    </div>
  )
};

export default Todos;
