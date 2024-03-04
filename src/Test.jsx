// import React from 'react';
// import axios from 'axios';
// import { saveAs } from 'file-saver';

// const FileDownloadExample = () => {
//   const downloadExcelFile = async () => {
//     try {
//       // Replace with the JSONPlaceholder API endpoint that returns a binary file
//       const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1', {
//         responseType: 'blob',
//       });

//       // Save the file using file-saver
//       saveAs(response.data, 'example.xlsx');
//     } catch (error) {
//       console.error('Error downloading file:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={downloadExcelFile}>Download Excel File</button>
//     </div>
//   );
// };

// export default FileDownloadExample;


// import React from 'react';
// import axios from 'axios';
// import { saveAs } from 'file-saver';

// const Test = () => {
//   const handleDownload = async () => {
//     try {
//       // Assuming you want to download an Excel file from the provided API endpoint
//       const url = 'https://3662-2405-201-2008-7273-493-2c78-4cbf-fb90.ngrok-free.app/surat/samplefile';

//       const response = await axios.get(url, { responseType: 'blob' });

//       // Log content type and size for debugging
//       console.log(response.data)
//       console.log('Content Type:', response.headers['content-type']);
//       console.log('File Size:', response.data.size);

//       if (response && response.data) {
//         saveAs(response.data, 'downloaded_file.xlsx');
//       } else {
//         console.error('Empty or invalid response from the server');
//       }
//     } catch (error) {
//       console.error('Error downloading file:', error.message);
//     }
//   };

//   return (
//     <div>
//       <div>
//         {/* Place any additional UI elements or information here */}
//       </div>
//       <div>
//         <button onClick={handleDownload} type="button" className="btn btn-primary">
//           Download
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Test;


import React from "react";

const Test = () => {
  const handleDownload = async () => {
    try {
      const url =
        "https://3662-2405-201-2008-7273-493-2c78-4cbf-fb90.ngrok-free.app/surat/samplefile";
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

  return (
    <div>
      <div>
        <button
          onClick={handleDownload}
          type="button"
          className="btn btn-primary"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Test;