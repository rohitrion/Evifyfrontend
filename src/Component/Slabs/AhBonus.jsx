



import React, { useState } from 'react';

const AhBonus = () => {
  // State for storing bonus entries
  const [bonuses, setBonuses] = useState([]);

  // State for storing form input
  const [formData, setFormData] = useState({
    bonusName: '',
    client: '',
    dateFrom: '',
    dateTo: '',
    dayName: '',
    orderFrom: '',
    orderTo: '',
    absentPreset: '',
    incentiveAmount: '',
    penaltyAmount: ''
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the new bonus entry to the bonuses array
    setBonuses([...bonuses, formData]);
    // Reset the form data
    setFormData({
      bonusName: '',
      client: '',
      dateFrom: '',
      dateTo: '',
      dayName: '',
      orderFrom: '',
      orderTo: '',
      absentPreset: '',
      incentiveAmount: '',
      penaltyAmount: ''
    });
  };

  return (
    <div>
      {/* Form for adding new bonus entries */}
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        {/* You can style these inputs using Tailwind CSS */}
        <input type="text" placeholder="Bonus Name" value={formData.bonusName} onChange={(e) => setFormData({ ...formData, bonusName: e.target.value })} />
        {/* Other form inputs go here */}
        {/* Submit button */}
        <button type="submit">Add</button>
      </form>

      {/* Table to display bonus entries */}
      <table>
        <thead>
          <tr>
            {/* Table headers */}
            <th>Bonus Name</th>
            {/* Other table headers go here */}
          </tr>
        </thead>
        <tbody>
          {/* Table rows */}
          {bonuses.map((bonus, index) => (
            <tr key={index}>
              {/* Table data */}
              <td>{bonus.bonusName}</td>
              {/* Other table data go here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AhBonus;
