import './_popup.scss';
import { CSSTransition } from 'react-transition-group';

const Popup = props => {
  const {
    refs,
    funcs,
    modes,
  } = props;

  const clickHandler = buttonType => {
    switch (buttonType) {
      case 'Agree':
        modes.popupShownMode.popupData.callback.agree();
        break;
      case 'Decline':
        modes.popupShownMode.popupData.callback.decline();
        break;
      default:
        return false;
    };
  };

  return (
    <CSSTransition
      in={modes.popupShownMode.isOn}
      timeout={200}
      classNames={`default-transition`}
      unmountOnExit
    >

    <div
      ref={refs.popup}
      className={`popup__parent`}
    >

      <div
        className={`popup__container`}
      >

        <div
          className={`popup__message`}
        >
          {
            modes.popupShownMode.popupData.message
          }
        </div>

        <div
          className={`popup__buttons`}
        >
          {
            [
              'Agree',
              'Decline'
            ].map(option => {
              const key = funcs.getKey('popup-button', option);
              return (
                <div
                  key={key}
                  className={`popup__button`}
                  onClick={() => clickHandler(option)}
                >
                  {
                    option
                  }
                </div>
              );
            })
          }
        </div>

      </div>

    </div>

    </CSSTransition>
  )
};

export default Popup;
