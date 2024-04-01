import React, { useState } from 'react';
import axios from 'axios';
import { BaseURLState } from '../Component/Recoil';
import { useRecoilState } from 'recoil';

const ImageUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [baseurl, setbaseurl] = useRecoilState(BaseURLState)
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${baseurl}/inventories/upload/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus('Upload successful!');
      console.log('Response:', response);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
    
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file"  onChange={handleFileChange} />
      <button className='text-black' onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default ImageUploadComponent;
