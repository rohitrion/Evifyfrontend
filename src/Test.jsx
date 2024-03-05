import React, { useState } from 'react';

const Test = () => {
  // Step 2: Set up state for input values
  const [inputValues, setInputValues] = useState({
    input1: 0,
    input2: 0,
    // ... input3 to input13
    input14: 0,
  });

  // Step 3: Define event handler to update state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert the input value to a number
    // const numericValue = parseInt(value, 10) || 0;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Step 4: Display values in the console
  const logValues = () => {
    console.log(inputValues);
  };

  return (
    <div>
      {/* Step 1: Create 14 number input fields with onChange event */}
      <input type="number" name="input1" value={inputValues.input1} onChange={handleInputChange} />
      <input type="number" name="input2" value={inputValues.input2} onChange={handleInputChange} />
      {/* ... input3 to input13 */}
      <input type="number" name="input14" value={inputValues.input14} onChange={handleInputChange} />

      {/* Button to log values */}
      <button onClick={logValues}>Log Values</button>
    </div>
  );
};

export default Test;
