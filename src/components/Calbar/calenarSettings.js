const messages = {
  allDay: 'Cały dzień',
  previous: '<',
  next: '>',
  today: 'Dzisiaj',
  month: 'Miesiąc',
  week: 'Tydzień',
  day: 'Dzień',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Czas',
  event: 'Wydarzenie',
};

const formats = {
  dayHeaderFormat: 'dddd, DD MMMM YYYY',
  dayRangeHeaderFormat: 'MMMM YYYY',
};

const customStyles = {
  control: (base, state) => ({
    ...base,
    height: '43px',
    'min-height': '43px',
  }),
};

export { messages, formats, customStyles };
