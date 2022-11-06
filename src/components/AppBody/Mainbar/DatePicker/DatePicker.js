import './_datePicker.scss';
import ArrowIcon from './../../../../icons/ArrowIcon/ArrowIcon';

const DatePicker = props => {
  const {
    actions,
    refs,
    lists,
    hooks,
    funcs,
    settings,
  } = props;

  const [currentSheet, setCurrentSheet] = hooks.useState(null);

  const getFirstDateOfMonth = date => {
    const [y, m] = [date.getFullYear(), date.getMonth()];
    return new Date(y, m, 1);
  };
  const getLastDateOfMonth = date => {
    const [y, m] = [date.getFullYear(), date.getMonth()];
    return new Date(y, m+1, 0);
  };

  const detectFirstDateOnSheet = currentDate => {
    const firstDateOfMonth = getFirstDateOfMonth(currentDate);
    const date = firstDateOfMonth;

    let firstDateOnSheet = null;

    const checkPrev = (current : object) => {
      const [y, m, d] = [current.getFullYear(), current.getMonth(), current.getDate()];
      const prev = new Date(y, m, d-1);
      const prevDay = prev.getDay();
      if (prevDay !== 0) {
        checkPrev(prev);
      } else {
        firstDateOnSheet = prev;
      }
      return;
    };

    if (firstDateOfMonth.getDay() === 0) {
      return firstDateOfMonth;
    } else {
      checkPrev(date);
    };

    return firstDateOnSheet;
  };
  const detectLastDateOnSheet = currentDate => {
    const lastDateOfMonth = getLastDateOfMonth(currentDate);
    const date = lastDateOfMonth;

    let lastDateOnSheet = null;

    const checkNext = (current : object) => {
      const [y, m, d] = [current.getFullYear(), current.getMonth(), current.getDate()];
      const next = new Date(y, m, d+1);
      const nextDay = next.getDay();
      if (nextDay !== 6) {
        checkNext(next);
      } else {
        lastDateOnSheet = next;
      }
      return;
    };

    if (lastDateOfMonth.getDay() === 6) {
      return lastDateOfMonth;
    } else {
      checkNext(date);
    };

    return lastDateOnSheet;
  };

  const getCurrentSheet = (chosenDate : object) => {
    const firstDateOnSheet = detectFirstDateOnSheet(chosenDate);
    const lastDateOnSheet = detectLastDateOnSheet(chosenDate);

    const sheet = [firstDateOnSheet];

    let date = firstDateOnSheet;

    while (+sheet[sheet.length-1] !== +lastDateOnSheet) {
      const nextDate = createNextDay(date);
      sheet.push(nextDate);
      date = nextDate;
    };

    return sheet;
  };

  const createNextDay = (current : object) => {
    const [y, m, d] = [current.getFullYear(), current.getMonth(), current.getDate()];
    return new Date(y, m, d+1);
  };

  const [areButtonsDisabled, setAreButtonsDisabled] = hooks.useState(false);

  const openSheet = (sheetType : string) => {
    const [y, m] = [currentSheet.getFullYear(), currentSheet.getMonth()];

    const next = new Date(y, m+1, 1);
    const prev = new Date(y, m, 0);

    const newDate = sheetType === 'next' ? next : prev;

    setCurrentSheet(newDate);

    setAreButtonsDisabled(true);
  };

  const createCell = date => {
    const isDateChosen = thisDate => {
      if (thisDate && settings.currentChosenDate) {
        return +thisDate === +settings.currentChosenDate;
      };
    };

    const isDateDisabled = thisDate => thisDate && (thisDate.getMonth() !== currentSheet.getMonth());

    const [y, m, d, dw] = [date.getFullYear(), date.getMonth(), date.getDate(), date.getDay()];

    const key = funcs.getKey('td', [y, m, d, dw]);

    return (
      <div
        ref={isDateChosen(date) ? refs.chosenDate : null}
        key={key}
        className={`date-picker__td
          ${isDateDisabled(date) ? 'date-picker__td_disabled' : ''}
          ${isDateChosen(date) ? 'date-picker__td_chosen' : ''}`
        }
        onClick={() => actions.setCurrentChosenDate(date)}
      >
        <span>
          {
            d
          }
        </span>
        {
          settings.device === 'mob' && (
            <span>
              {
                funcs.getName(lists.daysOfWeekList[dw], 'short')
              }
            </span>
          )
        }
      </div>
    )
  };

  const createRows = sheet => {
    const rows = [];
    for (let i = 0; i < sheet.length; i += 7) {
      const row = sheet.slice(i, i + 7);
      rows.push(row);
    };
    return rows.map((week, i) => {
      const key = funcs.getKey('tr-week', i);
      return (
        <div
          key={key}
          className={`date-picker__tr`}
        >
          {
            week.map(date => createCell(date))
          }
        </div>
      )
    });
  };

  hooks.useEffect(() => setCurrentSheet(new Date(settings.currentChosenDate.getFullYear(), settings.currentChosenDate.getMonth())), []);

  hooks.useEffect(() => setAreButtonsDisabled(false), [currentSheet]);

  hooks.useEffect(() => {
    if (settings.currentChosenDate && currentSheet) {
      if (settings.currentChosenDate.getMonth() !== currentSheet.getMonth()) {
        setCurrentSheet(settings.currentChosenDate);
      };
    };
  }, [settings.currentChosenDate]);

  hooks.useEffect(() => {
    if (settings.device === 'mob') {
      const datePickerEl = refs.datePicker.current;
      const chosenDateEl = refs.chosenDate.current;

      if (datePickerEl && chosenDateEl) {
        const scrollSpeed = 1;
        const scrollStep = 100;

        const oldScrollPos = datePickerEl.scrollLeft * scrollStep;
        const newScrollPos = (chosenDateEl.offsetLeft - 25 + chosenDateEl.offsetWidth / 2 - window.innerWidth / 2) * scrollStep;

        if (oldScrollPos < newScrollPos) {
          for (let i = oldScrollPos; i <= newScrollPos; i++) {
            setTimeout(() => datePickerEl.scrollLeft = i / scrollStep, scrollSpeed);
          };
        } else {
          for (let i = oldScrollPos; i >= newScrollPos; i--) {
            setTimeout(() => datePickerEl.scrollLeft = i / scrollStep, scrollSpeed);
          };
        }
      };
    };
  }, [currentSheet, refs.datePicker.current, refs.chosenDate.current]);

  return (
    currentSheet ?
      <div
        className={`date-picker block`}
      >
        <div
          className={`date-picker__header block__header`}
        >
          <div
            className={`date-picker__sheet-name`}
          >
            <div
              className={`date-picker__month`}
            >
              {
                funcs.getName(lists.monthsList[currentSheet.getMonth()], 'long')
              }
            </div>
            <div
              className={`date-picker__year`}
            >
              {
                currentSheet.getFullYear()
              }
            </div>
          </div>

          <div
            className={`date-picker__button-group`}
          >
            {
              [
                'prev',
                'next',
              ].map(direction => {
                const key = funcs.getKey('arrow-icon', direction);
                return (
                  <ArrowIcon
                    key={key}
                    eventHandlers={
                      {
                        onClick: () => openSheet(direction),
                      }
                    }
                    selfStates={
                      {
                        isDisabled: areButtonsDisabled,
                      }
                    }
                    selfClassname={`arrow-icon_${direction}`}
                  />
                );
              })
            }
          </div>

        </div>
        <div
          ref={refs.datePicker}
          className={`date-picker__rows-container date-picker__rows-container_scrollable_${settings.device === 'mob'}`}
        >
          {
            createRows(getCurrentSheet(currentSheet))
          }
        </div>
      </div>
      :
      <div>
      </div>
    )
};

export default DatePicker;
