import './_todoList.scss';
import Todo from './Todo/Todo';
import { TransitionGroup, CSSTransition, SwitchTransition } from 'react-transition-group';

const TodoList = props => {
  const {
    todos,
    actions,
    folders,
    settings,
    funcs,
  } = props;

  const filterList = todos => {
    let list = [...todos].sort((a, b) => a.date - b.date);
    if (settings.statusFilter) {
      const filterByStatus = status => {
        switch (status) {
          case 'active':
            return list.filter(todo => !todo.isCompleted);
          case 'done':
            return list.filter(todo => todo.isCompleted);
          default:
            return list;
        };
      };
      list = filterByStatus(settings.statusFilter);
    };
    if (settings.folderFilter) {
      list = list.filter(todo => todo.folder === settings.folderFilter);
    }
    return list;
  };

  const list = filterList(todos);

  const key = funcs.getKey('todo-list', `${+settings.currentChosenDate}-${settings.folderFilter}-${settings.statusFilter}`);

  return (
    <div className={`todo-list__container`}>

      <SwitchTransition>
      <CSSTransition
        key={key}
        timeout={200}
        classNames='default-transition'
      >

      <div
        className={`todo-list__body todo-list__body_blank_${!list.length}`}
      >
      <TransitionGroup
        component={null}
        children={
          list
            .sort((todoA, todoB) => (todoA.isCompleted || 0) - (todoB.isCompleted || 1))
            .map((todo, i) => <CSSTransition
                key={`todo-${todo.id}`}
                timeout={200}
                classNames='default-transition'
              >
                <Todo
                  todo={todo}
                  actions={actions}
                  folders={folders}
                />
            </CSSTransition>)
        }>
      </TransitionGroup>
      </div>

      </CSSTransition>

      </SwitchTransition>

    </div>
  );
};

export default TodoList;
