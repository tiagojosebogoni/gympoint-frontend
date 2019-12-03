import React, { useRef, useEffect } from 'react';
import AsyncSelect from 'react-select/async';

import { debounce } from 'lodash';

import { useField } from '@rocketseat/unform';

// import { Container } from './styles';

export default function ReactSelectAsync({
  name,
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
    console.log(selectRef.state.value);

    const selectValue = selectRef.state.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

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

  function getDefaultValue() {
    if (!defaultValue) return null;

    // console.log('DEFAULT:', defaultValue);
    // console.log('OPTIONS:', options);

    if (!multiple) {
      return options.find(option => option.id === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }

  const debouncedLoadOptions = debounce(value => {
    console.log('value', value);
    return asyncFunc(value);
  }, 500);

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
        // loadOptions={value => debouncedLoadOptions(value)}
        isMulti={multiple}
        // options={value => debouncedLoadOptions(value)}
        options={options}
        defaultOptions={defaultOptions}
        defaultValue={getDefaultValue()}
        placeholder="Selecione..."
        noOptionsMessage={() => 'Nenhum registro localizado'}
        loadingMessage={() => 'Carregando...'}
        cacheOptions
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        ref={ref}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}
