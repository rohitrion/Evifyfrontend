

import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';


const File = () => {
  // const [selectedClient, setSelectedClient] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [selectedCity1, setSelectedCity1] = useState(null);

  // const handleClientChange = (event) => {
  //   setSelectedClient(event.target.value);
  // };

  const handleDownload = async () => {
    try {
      const url =
        "https://2e55-2405-201-2008-7273-501d-e21a-d46b-565f.ngrok-free.app/surat/samplefile";
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "download.xlsx");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error.message);
    }
  };





  const handleCityChange1 = (event) => {
    setSelectedCity1(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

 

 
  const handleNextButtonClick = () => {

    console.log('Next button clicked');
  };

  return (
    
    
<div className="flex items-center justify-center pl-[80px] mb-60 ml-96"> 
  <main className="bg-white p-8 rounded shadow-lg w-120 lg:w-144"> {/* Increase the width */}
    <div className="text-center mb-6"> {/* Increase the margin bottom */}
      <h3 className="text-3xl font-bold">File Upload</h3> {/* Increase the font size */}
    </div>

    <div className="mb-6"> 
      <label className="block mb-2">CITY:</label>
      <select
        className="w-full border p-3" 
        value={selectedCity}
        onChange={handleCityChange}
      > 
         <option value="select">select </option>
        <option value="ahmedabad">Ahmedabad</option>
        <option value="surat">Surat</option>
        <option value="otherCity">Other City</option>
      </select>
    </div>

    <div className="mb-6"> 
      <label className="block mb-2">FILE UPLOAD SECTION:</label>
      <div className="border p-4">
        <input type="file" className="w-full" />
      </div>
    </div>

    <div className="flex justify-end">
      {/* <button
        className="bg-blue-500 text-black px-5 py-0.5 mr-2"  
      >
        City
      </button> */}
         <select
        className=" px-4 py-0.5 mr-2 bg-[#EFEFEF] shadow-lg rounded-lg  text-black "  
        value={selectedCity1}
        onChange={handleCityChange1}
      >
         <option value="select">select </option>
        <option value="ahmedabad">Ahmedabad</option>
        <option value="surat">Surat</option>
        <option value="otherCity">Other City</option>
      </select>
      <button
        className="bg-[#EFEFEF]  text-black px-5 py-0.5 mr-2 shadow-lg  rounded-lg"  
        onClick={handleDownload}
      >
        Sample File
      </button>
      <button
        className="bg-[#EFEFEF]  text-black px-5 py-0.5 rounded-lg"  
        onClick={handleNextButtonClick}
      >
        Next
      </button>
    </div>
  </main>
</div>

  );
};


export default File;
