import './_todoInput.scss';

const TodoInput = props => {
  const {
    actions,
    modes,
    settings,
    newErrorHandler,
  } = props;

  const inputChangeHandler = e => {
    if (e.target.value.length <= settings._maxTodoInputLength) {
      actions.setNewTodoData(
        {
          todo: e.target.value,
        }
      );
    } else {
      newErrorHandler('Input is too long');
    };
  };

  return (
    <input
      className={`form__input`}
      placeholder={`type in new todo...`}
      value={modes.todoAddMode.newTodoData.todo}
      onChange={e => inputChangeHandler(e)}
    >
    </input>
  )
};

export default TodoInput;
