

import React, { useState } from 'react';

const File = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleCityButtonClick = () => {
 
    console.log('City button clicked');
  };

  const handleSampleFileButtonClick = () => {

    console.log('Sample File button clicked');
  };

  const handleNextButtonClick = () => {

    console.log('Next button clicked');
  };

  return (
    <div className="center">
      <main className="main-containers">
        <div className="main-title">
          <h3 style={{ color: 'black' , marginTop:'20px' ,marginLeft:"10px" }}> File-Upload</h3>
        </div>

        <div>
  
          <div className='drops'>
            <div>
              <label>Client Data:</label>
              <select value={selectedClient} onChange={handleClientChange}>
                <option value="client1">Client 1</option>
                <option value="client2">Client 2</option>
                <option value="client3">Client 3</option>
             
              </select>
            </div>
            <div>
              <label>  City :</label>
              <select value={selectedCity} onChange={handleCityChange}>
                <option value="ahmedabad">Ahmedabad</option>
                <option value="surat">Surat</option>
                <option value="otherCity">Other City</option>
           
              </select>
            </div>
          </div>

          <div className="fileupload">
            <div className='inside'>
            <label>File Upload Section:</label>
            <div className="file-upload-box">
              <input type="file" />
            </div>
            </div>
          </div>

    
          <div className='btnss'>
            <button onClick={handleCityButtonClick}>City</button>
            <button onClick={handleSampleFileButtonClick}>Sample File</button>
            <button onClick={handleNextButtonClick}>Next</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default File;
