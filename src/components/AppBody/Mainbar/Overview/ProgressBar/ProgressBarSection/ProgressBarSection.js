import './_progressBarSection.scss';
import Tooltip from './../Tooltip/Tooltip';

const ProgressBarSection = props => {
  const {
    folder,
    hooks,
    settings,
  } = props;

  const [isSectionHovered, setIsSectionHovered] = hooks.useState(false);

  const [perc, setPerc] = hooks.useState(0);

  hooks.usePercCounter(folder.id, perc, setPerc);

  return (
    <div
      className={`progress-bar-section__container`}
      style={
        {
          background: folder.color,
          opacity: settings.theme === 'light' ? 1 : .8,
          width: perc + '%',
          minWidth: (settings.device === 'tablet' || settings.device === 'desktop') ? '14px' : '20px',
        }
      }
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
    >
      {
        isSectionHovered && (
          <Tooltip
            info={folder}
          />
        )
      }
    </div>
  )
};

export default ProgressBarSection;
