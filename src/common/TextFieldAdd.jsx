import React from 'react';
import Select from './Select';
import TextField from './TextField';
import TextAreaAdd from './TextAreaAdd';
import TextFieldMain from './TextFieldMain';
import SelectMain from './SelectMain';
import TextAreaAddMain from './TextAreaAddMain';

function TextFieldAdd({ item, obj, handleChange, requestPage = false }) {
  if (item.hasTextArea)
    return (
      <>
        {requestPage && (
          <TextAreaAddMain handleChange={handleChange} item={item} />
        )}
        {!requestPage && (
          <TextAreaAdd handleChange={handleChange} item={item} />
        )}
      </>
    );
  if (item.hasSelect)
    return (
      <>
        {requestPage && (
          <SelectMain
            defaultValue={item.defaultValue}
            isTruthy={item.isTruthy}
            label={item.label}
            name={item.name}
            options={obj[`${item.name}`]}
            onChange={handleChange}
          />
        )}
        {!requestPage && (
          <Select
            defaultValue={item.defaultValue}
            isTruthy={item.isTruthy}
            label={item.label}
            name={item.name}
            options={obj[`${item.name}`]}
            onChange={handleChange}
          />
        )}
      </>
    );
  return (
    <>
      {requestPage && (
        <TextFieldMain
          label={item.label}
          name={item.name}
          value={item.value || ''}
          onChange={handleChange}
        />
      )}
      {!requestPage && (
        <TextField
          label={item.label}
          name={item.name}
          value={item.value || ''}
          onChange={handleChange}
        />
      )}
    </>
  );
}

export default TextFieldAdd;
