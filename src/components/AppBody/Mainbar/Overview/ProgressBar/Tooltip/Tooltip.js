import './_tooltip.scss';

const Tooltip = props => {
  const {
    info: {
      name: folderName,
    },
  } = props;

  return (
    <div
      className={`tooltip__container`}
    >
      <div
        className={`tooltip__triangle`}
      >
      </div>
      <div
        className={`tooltip__cloud`}
      >
        {
          folderName
        }
      </div>
    </div>
  )
};

export default Tooltip;
