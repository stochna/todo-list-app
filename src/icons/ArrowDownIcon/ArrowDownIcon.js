import './_arrowDownIcon.scss';

const ArrowDownIcon = props => {
  const {
    selfClassname,
  } = props;

  return (
    <button
      type='submit'
      className={`form__submit-button button`}
    >
      <div className={`icon`}>
        <div className={`form__line form__line_1`}></div>
        <div className={`form__line form__line_2`}></div>
        <div className={`form__line form__line_3`}></div>
      </div>
    </button>
  )
};

export default ArrowDownIcon;
