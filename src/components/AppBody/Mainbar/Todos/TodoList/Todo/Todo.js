import './_todo.scss';

const Todo = props => {
  const {
    todo,
    actions,
    folders,
  } = props;

  const markCompleted = () => !(Date.now() < +todo.date) && actions.markCompleted(todo.id);
  const markActive = () => actions.markActive(todo.id);
  const deleteTodo = () => actions.deleteTodo(todo.id);

  const isTodoActive = !todo.isCompleted;

  return (
    <div
      className={`todo todo_status_${isTodoActive ? 'active' : 'done'}`}
    >

      <div
        className='todo__body'
      >

        <div
          className='button todo__done-button'
          onClick={isTodoActive ? markCompleted : markActive}
        >
          {
            todo.isCompleted && (
              <div
                className={`done-icon`}
              >
                <div className={`done-icon__line done-icon__line_1`}></div>
                <div className={`done-icon__line done-icon__line_2`}></div>
              </div>
            )
          }
        </div>

        <div
          className='todo__text'
        >
          <span
            onClick={deleteTodo}
          >
            {
              todo.todo
            }
          </span>
        </div>

        {
          todo.folder && (
            <div
              className='todo__folder-indicator'
              style={
                {
                  background: folders.find(folder => folder.id === todo.folder) && folders.find(folder => folder.id === todo.folder).color,
                  opacity: todo.isCompleted ? .5 : 1,
                }
              }
            >
            </div>
          )
        }

      </div>

    </div>
  )
};

export default Todo;
