import React from 'react';

const TextInput = props => {
  return(
    <div className="col s12">
      <div className="input-field col s12">
        <input
          name={props.name}
          id={props.name}
          type="text"
          value={props.value}
          onChange={props.onChange}
          className={props.specialClass}
        />
        <label htmlFor={props.name}>{props.label}</label>
      </div>
    </div>
  )
};

export default TextInput