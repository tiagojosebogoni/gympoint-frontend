import React, { useRef, useEffect } from 'react';
import AsyncSelect from 'react-select/async';

import { debounce } from 'lodash';

import { useField } from '@rocketseat/unform';

// import { Container } from './styles';

export default function ReactSelectAsync({
  name,
  label,
  options,
  multiple,
  asyncFunc,
  defaultOptions,
  setDefaultValue,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }
    console.log('SelectValue', selectValue);
    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  const loadOptions = value => asyncFunc(value);

  const debouncedLoadOptions = debounce(loadOptions, 500, {
    leading: true,
  });

  function getDefaultValue() {
    if (!defaultValue) return null;

    if (!multiple) {
      return options.find(option => option.id === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }

  return (
    <>
      {/* <AsyncSelect
        name={fieldName}
        aria-label={fieldName}
        ref={ref}
        loadOptions={inputValue => debouncedLoadOptions(inputValue)}
        isMulti={multiple}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        placeholder=""
        cacheOptions
        defaultOptions={defaultOptions}
        {...rest}
      /> */}
      <AsyncSelect
        name={fieldName}
        aria-label={fieldName}
        loadOptions={inputValue => debouncedLoadOptions(inputValue)}
        isMulti={multiple}
        defaultValue={getDefaultValue()}
        // defaultOptions={defaultOptions}
        placeholder="Selecione..."
        noOptionsMessage={() => 'Nenhum registro localizado'}
        cacheOptions
        name="student_id"
        loadOptions={options}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        // onChange={e => setStudentSelected(e)}
        ref={ref}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}
