import './_summaryBarSection.scss';

const SummaryBarSection = props => {
  const {
    count,
    comment,
    info,
    settings,
  } = props;

  const infoColor = (() => {
    const green = '#12CE69';
    const red = '#FF465F';

    return info > 0 ? green : red;
  })();

  const infoStr = (() => {
    const arrowUpCode = 8593;
    const arrowDownCode = 8595;

    return `${String.fromCharCode(info > 0 ? arrowUpCode : arrowDownCode)}${info}`;
  })();

  return (
    <div
      className={`summary-bar-section__container`}
    >
      <div
        className={`summary-bar-section__count`}
      >
        {
          count
        }
      </div>
      <div
        className={`summary-bar-section__comment`}
      >
        {
          comment
        }
      </div>
      {
        !!info && (
          <div
            className={`summary-bar-section__info`}
            style={
              {
                color: settings.device === 'mob' ? '#fff' : infoColor,
                background: settings.device === 'mob' ? infoColor : 'transparent',
              }
            }
          >
            {
              infoStr
            }
          </div>
        )
      }
    </div>
  )
};

export default SummaryBarSection;
