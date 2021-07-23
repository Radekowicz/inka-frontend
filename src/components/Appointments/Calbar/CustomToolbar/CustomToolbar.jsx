import React from 'react';
import moment from 'moment';

export default function CustomToolbar(toolbar) {
  const goToBack = () => toolbar.onNavigate('PREV');
  const goToNext = () => toolbar.onNavigate('NEXT');
  const goToCurrent = () => toolbar.onNavigate('TODAY');

  const label = () => {
    const date = moment(toolbar.date);
    return <span>{date.format('dddd, DD MMMM YYYY')}</span>;
  };

  const goToMonthView = () => toolbar.onView('month');
  const goToWeekView = () => toolbar.onView('week');
  const goToDayView = () => toolbar.onView('day');

  return (
    <div className="toolbar-container">
      <div className="label-date-container">
        <label className="label-date">{label()}</label>
      </div>
      <div className="navigate-btn-container">
        <button className="navigate-btn" onClick={goToBack}>
          &#8249;
        </button>
        <button className="navigate-btn" onClick={goToCurrent}>
          Dziś
        </button>
        <button className="navigate-btn" onClick={goToNext}>
          &#8250;
        </button>
      </div>
      <div className="day-week-month-container">
        <button className="navigate-btn day-week-month" onClick={goToMonthView}>
          Miesiąc
        </button>
        <button className="navigate-btn day-week-month" onClick={goToWeekView}>
          Tydzień
        </button>
        <button className="navigate-btn day-week-month" onClick={goToDayView}>
          Dzień
        </button>
      </div>
    </div>
  );
}
