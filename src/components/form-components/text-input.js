import React from 'react';

export const TextInput = ({ label, value, onChange }) => {
  return (
    <div className="input-group">
      <div className="label">{label}</div>
      <input type="text" value={value}
        onChange={(e) => onChange(e.target.value)} />
    </div>
  );

}

export default TextInput;