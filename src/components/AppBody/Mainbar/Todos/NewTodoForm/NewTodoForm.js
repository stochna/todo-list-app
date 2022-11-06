import './_newTodoForm.scss';
import { CSSTransition } from 'react-transition-group';
import ArrowDownIcon from './../../../../../icons/ArrowDownIcon/ArrowDownIcon';
import TodoInput from './TodoInput/TodoInput';
import FolderTags from './FolderTags/FolderTags';
import FormError from './FormError/FormError';

const NewTodoForm = props => {
  const {
    actions,
    folders,
    refs,
    settings,
    hooks,
    funcs,
    modes,
  } = props;

  const [formError, setFormError] = hooks.useState(null);

  const newErrorHandler = error => {
    let newError = null;

    switch (error) {
      case 'Input is too long':
        newError = (
          {
            error,
            message: `Keep it simple!`,
          }
        );
        break;
      case 'Input is empty':
        newError = (
          {
            error,
            message: `Please, fill in the field!`,
          }
        );
        break;
      case 'Folder is not choosed':
        newError = (
          {
            error,
            message: `Please, choose a folder!`,
          }
        );
        break;
      default:
        newError = (
          {
            name: `Undefined error`,
            message: `Oops! Some error occured.`,
          }
        );
    };

    setFormError(newError);
  };

  const resetError = (currentError, newTodo) => {
    if (!modes.todoAddMode.isOn) {
      setFormError(null);
      return;
    };

    switch (currentError.error) {
      case 'Input is too long':
        if (newTodo.todo.length < settings._maxTodoInputLength) setFormError(null);
        break;
      case 'Input is empty':
        if (newTodo.todo.length) setFormError(null);
        break;
      case 'Folder is not choosed':
        if (newTodo.folder) setFormError(null);
        break;
      default:
        return false;
    };
  };

  const useFormErrorListener = () => {
    const newTodo = modes.todoAddMode.newTodoData;

    hooks.useDeepEffect(() => {
      if (formError) resetError(formError, newTodo);
    }, [formError, newTodo, modes.todoAddMode.isOn]);
  };

  const submitHandler = e => {
    e.preventDefault();

    const newTodo = modes.todoAddMode.newTodoData;
    const trimmedTodo = newTodo.todo.trim();

    if (trimmedTodo && modes.todoAddMode.newTodoData.folder) {
      actions.addTodo(newTodo);
      actions.setNewTodoData(
        {
          todo: '',
          folder: settings.folderFilter,
        }
      );
    } else {
      if (!trimmedTodo) {
        newErrorHandler('Input is empty');
        actions.setNewTodoData(
          {
              todo: '',
          }
        );
        return;
      };
      if (!newTodo.folder) {
        newErrorHandler('Folder is not choosed');
      };
    };
  };

  useFormErrorListener();

  hooks.useDeepEffect(() => {
    const selectedFolder = folders.find(folder => folder.id === settings.folderFilter);

    actions.setNewTodoData(
      {
        folder: selectedFolder ? selectedFolder.id : null,
      }
    );
  }, [folders, settings.folderFilter]);

  hooks.useEffect(() => {
    actions.setNewTodoData(
      {
        date: settings.currentChosenDate,
      }
    );
  }, [settings.currentChosenDate]);

  return (
    <CSSTransition
      in={modes.todoAddMode.isOn}
      key='new-todo-form'
      timeout={400}
      classNames={`form-transition`}
      unmountOnExit
    >

      <form
        ref={refs.newTodoForm}
        className={`form`}
        onSubmit={e => submitHandler(e)}
      >

        <TodoInput
          modes={modes}
          actions={actions}
          settings={settings}
          newErrorHandler={newErrorHandler}
        />

        <FormError
          error={formError}
        />

        <ArrowDownIcon
          selfClassname={``}
        />

        <FolderTags
          refs={refs}
          folders={folders}
          modes={modes}
          actions={actions}
          settings={settings}
          hooks={hooks}
          funcs={funcs}
          formError={formError}
        />
      </form>

    </CSSTransition>
  )
};

export default NewTodoForm;
