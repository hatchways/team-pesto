import React, { useState } from "react";

const DynamicSelect = ({ updateList }) => {
  const [value, setValue] = useState({ language: "", level: "" });

  const handleLanguageChange = event => {
    setValue({ ...value, language: event.target.value });

    if (value.language && value.level) {
      updateList(value);
    }
  };

  const handleLevelChange = event => {
    setValue({ ...value, level: event.target.value });

    if (value.language && value.level) {
      updateList(value);
    }
  };

  return (
    <li>
      <label>Language: </label>
      <select
        name="language"
        onChange={handleLanguageChange}
        value={value.language}
      >
        <option value="">Slecect a Language</option>
        <option>JavaScript</option>
        <option>Python</option>
        <option>Java</option>
        <option>C++</option>
        <option>Ruby</option>
      </select>

      <label>level: </label>
      <select name="level" onChange={handleLevelChange} value={value.level}>
        <option value="">Slecect a level</option>
        <option>Beginner</option>
        <option>Advanced</option>
        <option>Expert</option>
      </select>
    </li>
  );
};

export default DynamicSelect;
