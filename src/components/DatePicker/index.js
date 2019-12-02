import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@rocketseat/unform';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt';

import { CustomDatePicker } from './styles';

export default function DatePicker({ name, onChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]);

  function handleChange(date) {
    console.log(date);
    setSelected(date);
    onChange(date);
  }

  return (
    <>
      <CustomDatePicker
        name={fieldName}
        selected={selected}
        onChange={date => handleChange(date)}
        locale={pt}
        dateFormat="P"
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}
