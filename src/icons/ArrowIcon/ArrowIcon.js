import './_arrowIcon.scss';

const ArrowIcon = props => {
  const {
    selfStates = {
      isDisabled: false,
    },
    selfClassname,
    eventHandlers,
  } = props;

  return (
    <div
      className={`arrow-icon__container ${selfClassname}`}
      disabled={selfStates.isDisabled}
      {...eventHandlers}
    >
      <div className={`line line_1`}></div>
      <div className={`line line_2`}></div>
    </div>
  )
};

export default ArrowIcon;
