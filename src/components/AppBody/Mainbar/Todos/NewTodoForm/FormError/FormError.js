import './_formError.scss';

const FormError = props => {
  const {
    error,
  } = props;

  const errorMessage = error ? error.message : '';

  return (
    <div
      className={`form__error form__error_shown_${!!error}`}
    >
      {
        errorMessage
      }
    </div>
  )
};

export default FormError;
