import React, { useRef, useEffect, useState } from 'react';

import { useField } from '@rocketseat/unform';

import { CustomInputCurrency } from './styles';

export default function InputCurrency({ name, disabled, setChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      clearValue: el => {
        setSelected(0.0);
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(e) {
    setSelected(e);
    setChange(e);
  }

  return (
    <>
      <CustomInputCurrency
        disabled={disabled}
        name={fieldName}
        value={selected}
        onChange={handleChange}
        ref={ref}
        decimalSeparator=","
        thousandSeparator="."
      />
      {error && <span>{error}</span>}
    </>
  );
}
