import React, { useState } from 'react';

const Test = () => {
  const [formData, setFormData] = useState([
    { id: 1, label: 'Input 1', value: '' },
    { id: 2, label: 'Input 2', value: '' },
    // Add more items as needed
  ]);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [file, setFile] = useState(null);

  const handleCheckboxChange = (itemId) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      if (prevSelectedCheckboxes.includes(itemId)) {
        return prevSelectedCheckboxes.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedCheckboxes, itemId];
      }
    });
  };

  const handleInputChange = (itemId, value) => {
    setFormData((prevFormData) =>
      prevFormData.map((item) => (item.id === itemId ? { ...item, value } : item))
    );
  };

  const handleFileChange = (e) => {
    // Handle file input change
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handlePostApi = async () => {
    // Create an array with data from selected checkboxes
    const selectedData = formData
      .filter((item) => selectedCheckboxes.includes(item.id))
      .map(({ id, value }) => ({ id, value }));

    try {
      // Make your POST API request using the selected data
      const response = await axios.post('your-api-endpoint', {
        selectedData,
        file,
      });

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle API request error
      console.error('Error submitting data:', error);
    }
  };

  return (
    <form>
      {formData.map((item) => (
        <div key={item.id}>
          <input
            type="text"
            value={item.value}
            onChange={(e) => handleInputChange(item.id, e.target.value)}
            placeholder={item.label}
          />
          <input
            type="checkbox"
            checked={selectedCheckboxes.includes(item.id)}
            onChange={() => handleCheckboxChange(item.id)}
          />
        </div>
      ))}
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handlePostApi}>
        Submit
      </button>
    </form>
  );
};

export default Test;
