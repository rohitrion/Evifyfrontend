import React, { useState } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    // Ensure the value is between 0 and 100
    const newValue = value
    setProgress(newValue);
  };

  return (
    <div>
      <input
        type="number"
        min="0"
        max="100"
        value={progress}
        onChange={handleChange}
      />
      <div
        style={{
          width: '100%',
          backgroundColor: '#ddd',
          height: '20px',
          borderRadius: '10px',
          marginTop: '10px',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: '#007bff',
            height: '100%',
            borderRadius: '10px',
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
