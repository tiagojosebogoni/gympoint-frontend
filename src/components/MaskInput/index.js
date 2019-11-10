import React, { useRef, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

import { useField } from '@rocketseat/unform';

export default function MaskInput({ name, ...rest }) {
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
    console.tron.log(e);
    // setSelected(e);
  }

  return (
    <>
      <InputMask value={selected} {...rest} />
      {error && <span>{error}</span>}
    </>
  );
}
