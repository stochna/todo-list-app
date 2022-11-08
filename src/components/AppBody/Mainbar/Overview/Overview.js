import './_overview.scss';
import ProgressBar from './ProgressBar/ProgressBar';
import SummaryBar from './SummaryBar/SummaryBar';

const Overview = props => {
  const {
    folders,
    todos,
    hooks,
    refs,
    funcs,
    settings,
  } = props;

  return (
    <div
      className={`overview__block block`}
    >
      <div
        className={`overview__header block__header`}
      >
        <span
          className={`block__title`}
        >
          {
            'Overview'
          }
        </span>
      </div>

      <SummaryBar
        refs={refs}
        hooks={hooks}
        todos={todos}
        settings={settings}
        funcs={funcs}
      />

      <ProgressBar
        folders={folders}
        todos={todos}
        hooks={hooks}
        settings={settings}
        funcs={funcs}
      />

    </div>
  )
};

export default Overview;
