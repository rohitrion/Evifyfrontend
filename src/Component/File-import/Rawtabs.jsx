import React, { useEffect, useState } from "react";
import axios from "axios";
// import styles from "./rowDataComponent.module.css"
import { saveAs } from 'file-saver';
import { useRecoilState } from "recoil";
import { BaseURLState } from "../Recoil";
import Modal from "react-modal";
const Rawtabs = ({ activetab, item ,val,data,setdata}) => {

  const [globalurl, setglobalurl] = useRecoilState(BaseURLState)
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const handleDownload = async (file_key, file_name) => {
  
    try {

      let url;

      if (activetab === "rawfiles") {
        url = `${globalurl}/download_raw_file/${encodeURIComponent(file_key)}`;
      } else if (activetab === "salayfiles") {
        url = `${globalurl}/download_salary_file/${encodeURIComponent(file_key)}`;
      }

      const response = await axios.get(url, { responseType: "blob" });

      if (response && response.data) {
        saveAs(new Blob([response.data]), file_name);
      } else {
        console.error("Empty or invalid response from the server");
      }
    } catch (error) {
      console.error("Error downloading file:", error.message);
    }
  };


//  console.log(val+'the sleected '+ data)






  const handleDelete = () => {
    setShowModal(true);
  };
  const cancelLogout = () => {
    setShowModal(false);
  };

  const confirmLogout = (val) => {

    const filter= data.filter((item,key)=>key!=val)
    
    setdata(filter)

    setShowModal(false);

  };
  return (

    <div className=" border rounded p-4 m-4 relative flex items-center shadow-lg   hover:bg-gray-200 justify-between w-[1200px]  h-[30px]  scrollbar ">
      <div className="flex items-center w-full  hover:grey   ">
        <p><b>{item.file_name}</b></p>
      </div>
      <div className="flex gap-10" >
        <button onClick={() => handleDownload(item.filekey, item.file_name)} type="button" className="btn btn-primary hover:bg-blue-950 ">Download</button>
        <Modal
          isOpen={showModal}
          onRequestClose={cancelLogout}
          contentLabel="Logout Confirmation"
          className="bg-[#121212] text-white rounded-lg p-4 w-72 mx-auto mt-20"
          overlayClassName="fixed inset-0 flex items-center justify-center z-50"
        >
          <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
          <p className="text-lg mb-6">Are you sure you want to Delete?</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={()=>confirmLogout(val)}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              OK
            </button>
            <button
              onClick={cancelLogout}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </Modal>
        <button onClick={() => handleDelete()} type="button" className="btn btn-primary hover:bg-blue-950 ">Delete</button>
      </div>
    </div>


  );
};

export default Rawtabs;




// import React, { useState } from "react";
// import axios from "axios";
// import { saveAs } from 'file-saver';
// import { useRecoilState } from "recoil";
// import { BaseURLState } from "../Recoil";
// import Modal from "react-modal";

// const Rawtabs = ({ activetab, item, val, data, setdata }) => {
//   const [globalurl, setglobalurl] = useRecoilState(BaseURLState);
//   const [showModal, setShowModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleDownload = async (file_key, file_name) => {
//     try {
//       let url;

//       if (activetab === "rawfiles") {
//         url = `${globalurl}/download_raw_file/${encodeURIComponent(file_key)}`;
//       } else if (activetab === "salayfiles") {
//         url = `${globalurl}/download_salary_file/${encodeURIComponent(file_key)}`;
//       }

//       const response = await axios.get(url, { responseType: "blob" });

//       if (response && response.data) {
//         saveAs(new Blob([response.data]), file_name);
//       } else {
//         console.error("Empty or invalid response from the server");
//       }
//     } catch (error) {
//       console.error("Error downloading file:", error.message);
//     }
//   };

//   const handleDelete = () => {
//     setShowModal(true);
//   };

//   const cancelLogout = () => {
//     setShowModal(false);
//   };

//   const confirmLogout = () => {
//     const filter = data.filter((item, key) => key !== val);
//     setdata(filter);
//     setShowModal(false);
//   };

//   const filteredData = data.filter((item) =>
//     item.file_name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="border rounded p-4 m-4 relative flex items-center shadow-lg hover:bg-gray-200 justify-between w-[1200px] h-[30px] scrollbar">
//       <input
//         type="text"
//         placeholder="Search files"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:border-blue-500"
//       />
//       {filteredData.map((file, index) => (
//         <div key={index} className="flex items-center w-full hover:grey">
//           <p><b>{file.file_name}</b></p>
//           <div className="flex gap-10">
//             <button onClick={() => handleDownload(file.filekey, file.file_name)} type="button" className="btn btn-primary hover:bg-blue-950">Download</button>
//             <Modal
//               isOpen={showModal}
//               onRequestClose={cancelLogout}
//               contentLabel="Logout Confirmation"
//               className="bg-[#121212] text-white rounded-lg p-4 w-72 mx-auto mt-20"
//               overlayClassName="fixed inset-0 flex items-center justify-center z-50"
//             >
//               <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
//               <p className="text-lg mb-6">Are you sure you want to Delete?</p>
//               <div className="flex justify-center space-x-4">
//                 <button
//                   onClick={confirmLogout}
//                   className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
//                 >
//                   OK
//                 </button>
//                 <button
//                   onClick={cancelLogout}
//                   className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </Modal>
//             <button onClick={handleDelete} type="button" className="btn btn-primary hover:bg-blue-950">Delete</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Rawtabs;
