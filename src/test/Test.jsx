import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Perform API call
      const response = await axios.get('https://api.example.com/data');
      // Check if the response is successful
      if (response.status === 200) {
        // Display success message using react-hot-toast
        toast.success('Data fetched successfully');
      } else {
        // Display error message if the response is not successful
        toast.error('Failed to fetch data');
      }
    } catch (error) {
      // Display error message if there's an error during the API call
      toast.error('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Data'}
      </button>
      <Toaster />
    </div>
  );
};

export default App;
