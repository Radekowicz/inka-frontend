import React, { useState, useEffect } from 'react';

export default function Input(props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    props.setPatient(value);
  }, [props, value]);

  const setPatient = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={setPatient}
      />
    </div>
  );
}
