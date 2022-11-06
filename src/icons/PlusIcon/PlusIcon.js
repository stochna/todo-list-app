import './../_icons.scss';
import './_plusIcon.scss';

const PlusIcon = props => {
  const {
    selfStyles = {
      size: '20px',
    },
    selfStates = {
      isClicked: false,
      isShown: true,
    },
    selfClassName = '',
    eventHandlers,
  } = props;

  return (
    <div
      className={`icon plus-icon plus-icon_shown_${selfStates.isShown} plus-icon_clicked_${selfStates.isClicked} ${selfClassName}`}
      style={
        {
          height: selfStyles.size,
          width: selfStyles.size,
        }
      }
      {...eventHandlers}
    >
      <div className={`line line_1`}></div>
      <div className={`line line_2`}></div>
    </div>
  )
};

export default PlusIcon;
