
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Circles } from 'react-loader-spinner'
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { AuthState, BaseURLState, Dz, Error, FileUploadresponse, Filename, GloablFile, Num, TextState, Fatakfileresponse } from '../Recoil';
// import { ToastContainer, toast } from 'react-toastify';
// import Modal from "react-modal";
// import { ThreeDots } from "react-loader-spinner";
// const FatakFileUpload = () => {


//   const [file, setfile] = useState(null)

//   const [loading, setloding] = useState(false)
//   const [filerespose, setfileresponse] = useRecoilState(Fatakfileresponse)
//   const baseurl = useRecoilValue(BaseURLState)
//   const [error, seterror] = useRecoilState(Error);
//   const [authState, setauthstate] = useRecoilState(AuthState)
//   const [uploadresponse, setfileuploadresponse] = useState('')
//   const [fileName, setFileName] = useRecoilState(Filename)
//   const [searchTerm, setSearchTerm] = useState('');

//   const [showModalForProduct, setShowModalForProduct] = useState(null);

//   const [showModal, setShowModal] = useState(false);


//   const [filteredData, setFilteredData] = useState([]);

//   const [filefiltreData, setFilefiltreData] = useState([]);


//   const handleFileChange = (e) => {
//     const selectedfile = e.target.files[0];

//     setFileName(selectedfile.name);
//     setfile(selectedfile)

//   };




//   const handleUpload = async () => {
//     if (!file) {
//       return;
//     }
//     try {
//       const headers = {
//         'Authorization': `Bearer ${authState.token}`,
//       };


//       setloding(true)

//       const formData = new FormData();
//       formData.append('file', file);

//       // Replace 'your-api-endpoint' with the actual endpoint of your API
//       const response = await axios.post(`${baseurl}/upload/weekly/raw_file`, formData, {
//         headers: {
//           ...headers,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('File uploaded successfully', response.data);


//       setfileuploadresponse(response.data.file.file_key)

//       const fileKey = response.data.file.file_key;

//       const calcutekey = new FormData();
//       calcutekey.append('file_key', fileKey);

//       const Calculate = await axios.post(`${baseurl}/calculate/weekly/salary/${fileKey}`, calcutekey, {
//         headers: {
//           ...headers,
//           'Content-Type': 'application/json',
//         },
//       });


//       setFilefiltreData(prevData => [...prevData, response.data.file]);

//       console.log(Calculate.data, "caluclate hogaya ")


//       toast.success("File Submitted and calculated", {
//         position: 'top-center',
//         autoClose: 1300,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       })


//     } catch (error) {
//       handleError(error.response.data.detail);

//       console.error('Error uploading file', error);
//       console.log('Response data:', error.response.data);

//     } finally {
//       setloding(false); // Set loading to false regardless of success or error
//       setFileName('')

//     }


//   };







//   const handleDeleteClick = (filekey) => {
//     setShowModalForProduct(filekey); // Set the product id for which modal should be opened
//   };

//   const handleDeletefile = async (file_key) => {
//     setloding(true);
//     try {
//       let url = `${baseurl}/weekly/rawfile/${file_key}`;
//       const response = await axios.delete(url, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });


//       let updatedata = filefiltreData.filter((item) => item.filekey !== file_key)
//       setFilefiltreData(updatedata)

//       toast.success('🦄 Deleted!', {
//         position: "top-center",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });


//       // console.log(response.data); // Assuming the response contains meaningful data

//     } catch (error) {
//       console.error('Error deleting file:', error);
//       // Handle error
//     } finally {
//       setloding(false);
//       setShowModal(false);
//       setShowModalForProduct(false)
//     }



//   };




//   const cancelLogout = () => {
//     setShowModal(false);
//     setShowModalForProduct(false)
//   };



//   const handleError = (errorMessage) => {
//     seterror(errorMessage);

//     // Clear the error after 1 minute
//     setTimeout(() => {
//       seterror('');
//     }, 3000);
//   };


//   useEffect(() => {
//     const filtered = filteredData.filter(item => {
//       if (item.file_name && searchTerm) {
//         return item.file_name.toLowerCase().includes(searchTerm.toLowerCase());
//       }
//       return true; // Include the item if file_name or searchTerm is falsy
//     });
//     setFilefiltreData(filtered);
//   }, [filteredData, searchTerm]);



//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setloding(true);
//         const response = await axios.get(`${baseurl}/get/weekly/rawfiles`)
//         // setData(response.data.data);
//         setFilteredData(response.data.files);
//         console.log(response.data.files)
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setloding(false);
//       }
//     };

//     fetchData();
//   }, []);






//   console.log(filerespose + "ye upload hui hai ")

//   return (
//     <>



//       {loading && (
//         <div className="flex items-center z-90 justify-center fixed top-0 left-0 w-full h-full bg-opacity-30 bg-gray-300">
//           <div className="ml-40">
//             <Circles
//               height="80"
//               width="80"
//               color="#4fa94d"
//               ariaLabel="circles-loading"
//               wrapperStyle={{}}
//               wrapperClass=""
//               visible={true}
//             />
//           </div>
//         </div>
//       )}



//       <>


//         <div className="flex flex-col">
//           <ToastContainer />
//           <div className="p-8 rounded shadow-lg">
//             <div className="mb-6">
//               <label className="flex flex-col items-center px-4 py-6 bg-[#dbbdff] text-indigo-600 rounded-lg shadow-md tracking-wide uppercase cursor-pointer border border-indigo-600 hover:bg-indigo-400">
//                 <svg
//                   className="text-indigo-500 w-20 mx-auto mb-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                   />
//                 </svg>
//                 {fileName ? (
//                   <span className="mt-2 text-base leading-normal">{fileName}</span>
//                 ) : (
//                   <span className="text mt-2 bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
//                     Select a file
//                   </span>
//                 )}
//                 <input type="file" className="hidden" onChange={handleFileChange} />
//               </label>
//             </div>
//             <div className="flex justify-between mb-6">
//               <button
//                 className="bg-[#EFEFEF] text-black px-8 py-2 rounded-lg shadow-lg hover:bg-blue-500 font-bold transition duration-300 ease-in-out transform hover:scale-105"
//                 onClick={handleUpload}
//               >
//                 Upload & Calculate
//               </button>
//               <input
//                 type="text"
//                 placeholder="🔍️   Search by File name"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-96 py-2 px-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               />
//             </div>
//             {error ? (
//               <div
//                 className="p-4 mb-4 text-lg text-center text-red-800 mb-6 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                 role="alert"
//               >
//                 <b>
//                   <span className="font-medium">{error}</span>
//                 </b>
//               </div>
//             ) : (
//               ""
//             )}
//             <div className="border rounded p-4 m-4 relative flex flex-col items-center shadow-lg hover:bg-gray-200 justify-between max-h-[30rem] overflow-auto scrollbar">
//               {filefiltreData.map((item, index) => (
//                 <div
//                   key={index}
//                   className="w-full border rounded p-4 mb-2 flex justify-between items-center bg-white hover:bg-gray-100"
//                 >
//                   <p>
//                     <b>{item.file_name}</b>
//                   </p>
//                   <div>
//                     <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600">
//                       Download
//                     </button>




//                     <Modal
//                       isOpen={showModalForProduct === item.filekey} // Open modal only for the selected product
//                       onRequestClose={() => setShowModalForProduct(null)}

//                       contentLabel="Logout Confirmation"
//                       className="bg-[#121212] text-white rounded-lg p-4 w-72 mx-auto mt-20"
//                       overlayClassName="fixed inset-0 flex items-center justify-center z-50"
//                     >
//                       <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
//                       <p className="text-lg mb-6">Are you sure you want to delete?</p>
//                       <div className="flex justify-center space-x-4">
//                         <button onClick={() => handleDeletefile(item.filekey)} disabled={loading} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
//                           {loading ? (
//                             <ThreeDots height={20} width={40} radius={9} color="#4fa94d" ariaLabel="three-dots-loading" visible={true} />
//                           ) : (
//                             "Ok"
//                           )}
//                         </button>
//                         <button onClick={cancelLogout} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
//                           Cancel
//                         </button>
//                       </div>
//                     </Modal>

//                     <button onClick={() => handleDeleteClick(item.filekey)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </>




//     </>
//   );
// };


// export default FatakFileUpload;




























import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner'
import { useRecoilState, useRecoilValue } from 'recoil';
import { AuthState, BaseURLState, Dz, Error, FileUploadresponse, Filename, GloablFile, Num, TextState, Fatakfileresponse } from '../Recoil';
import { ToastContainer, toast } from 'react-toastify';
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";
const FatakFileUpload = () => {


  const [file, setfile] = useState(null)

  const [loading, setloding] = useState(false)
  const [filerespose, setfileresponse] = useRecoilState(Fatakfileresponse)
  const baseurl = useRecoilValue(BaseURLState)
  const [error, seterror] = useRecoilState(Error);
  const [authState, setauthstate] = useRecoilState(AuthState)
  const [uploadresponse, setfileuploadresponse] = useState('')
  const [fileName, setFileName] = useRecoilState(Filename)
  const [searchTerm, setSearchTerm] = useState('');

  const [showModalForProduct, setShowModalForProduct] = useState(null);

  const [showModal, setShowModal] = useState(false);


  const [filteredData, setFilteredData] = useState([]);

  const [filefiltreData, setFilefiltreData] = useState([]);


  const [active, setactive] = useState("rawfiles")



  const handleFileChange = (e) => {
    const selectedfile = e.target.files[0];

    setFileName(selectedfile.name);
    setfile(selectedfile)

  };




  const handleUpload = async () => {
    if (!file) {
      return;
    }
    try {
      const headers = {
        'Authorization': `Bearer ${authState.token}`,
      };


      setloding(true)

      const formData = new FormData();
      formData.append('file', file);

      // Replace 'your-api-endpoint' with the actual endpoint of your API
      const response = await axios.post(`${baseurl}/upload/weekly/raw_file`, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully', response.data);


      setfileuploadresponse(response.data.file.file_key)

      const fileKey = response.data.file.file_key;

      const calcutekey = new FormData();
      calcutekey.append('file_key', fileKey);

      const Calculate = await axios.post(`${baseurl}/calculate/weekly/salary/${fileKey}`, calcutekey, {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      });


      setFilefiltreData(prevData => [...prevData, response.data.file]);

      console.log(Calculate.data, "caluclate hogaya ")


      toast.success("File Submitted and calculated", {
        position: 'top-center',
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })


    } catch (error) {
      handleError(error.response.data.detail);

      console.error('Error uploading file', error);
      console.log('Response data:', error.response.data);

    } finally {
      setloding(false); // Set loading to false regardless of success or error
      setFileName('')

    }


  };


  




  const handleDeleteClick = (filekey) => {
    setShowModalForProduct(filekey); // Set the product id for which modal should be opened
  };

  const handleDeletefile = async (file_key) => {
    setloding(true);





    try {
      let url;
      if (active === "rawfiles") {
        url = `${baseurl}/weekly/rawfile/${file_key}`;
      } else if (active === "salaryfiles") {
        url = `${baseurl}/weekly/salaryfile/${file_key}`;
      }
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data)
      let updatedata = filefiltreData.filter((item) => item.filekey !== file_key)
      setFilefiltreData(updatedata)

      toast.success('🦄 Deleted!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });




    } catch (error) {
      console.error('Error deleting file:', error);
      // Handle error
    } finally {
      setloding(false);
      setShowModal(false);
      setShowModalForProduct(false)
    }



  };




  const cancelLogout = () => {
    setShowModal(false);
    setShowModalForProduct(false)
  };



  const handleError = (errorMessage) => {
    seterror(errorMessage);

    // Clear the error after 1 minute
    setTimeout(() => {
      seterror('');
    }, 3000);
  };


  useEffect(() => {
    const filtered = filteredData.filter(item => {
      if (item.file_name && searchTerm) {
        return item.file_name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true; // Include the item if file_name or searchTerm is falsy
    });
    setFilefiltreData(filtered);
  }, [filteredData, searchTerm]);



  useEffect(() => {


    const fetchData = async () => {



      let url;
      if (active === "rawfiles") {
        url = `${baseurl}/get/weekly/rawfiles`;
      } else if (active === "salaryfiles") {
        url = `${baseurl}/get/weekly/salaryfiles`;
      }

         

      try {
        setloding(true);
        const response = await axios.get(url)
        // setData(response.data.data);
        setFilteredData(response.data.files);
        console.log(response.data.files)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setloding(false);
      }
    };

    fetchData();
  }, [active]);






  console.log(filerespose + "ye upload hui hai ")

  return (
    <>


      <div className="flex flex-col">
        <ToastContainer />
        <div className="p-8 rounded h-screen shadow-lg">
          <div className="mb-6">
            <label className="flex flex-col items-center px-4 py-6 bg-[#dbbdff] text-indigo-600 rounded-lg shadow-md tracking-wide uppercase cursor-pointer border border-indigo-600 hover:bg-indigo-400">
              <svg
                className="text-indigo-500 w-20 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {fileName ? (
                <span className="mt-2 text-base leading-normal">{fileName}</span>
              ) : (
                <span className="text mt-2 bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                  Select a file
                </span>
              )}
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
          <div className="flex justify-between mb-6">



            <button
              className={`px-8 py-2 rounded-lg shadow-lg font-bold transition duration-300 ease-in-out transform hover:scale-105 ${active === "rawfiles"
                ? "bg-blue-500 text-white"
                : "bg-[#EFEFEF] text-black hover:bg-blue-500"
                }`}
              onClick={() => setactive("rawfiles")}
            >
              Raw Data
            </button>
            <button
              className={`px-8 py-2 rounded-lg shadow-lg font-bold transition duration-300 ease-in-out transform hover:scale-105 ${active === "salaryfiles"
                ? "bg-blue-500 text-white"
                : "bg-[#EFEFEF] text-black hover:bg-blue-500"
                }`}
              onClick={() => setactive("salaryfiles")}
            >
              Salary Data
            </button>


            <button
              className="bg-[#DBBDFF] text-black px-8 py-2 rounded-lg shadow-lg hover:bg-blue-500 font-bold transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleUpload}
            >
              Upload & Calculate
            </button>

            <input
              type="text"
              placeholder="🔍️   Search by File name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-96 py-2 px-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {error ? (
            <div
              className="p-4 mb-4 text-lg text-center text-red-800 mb-6 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <b>
                <span className="font-medium">{error}</span>
              </b>
            </div>
          ) : (
            ""
          )}
          <div className="border rounded p-4  relative flex flex-col  items-center shadow-lg hover:bg-gray-200 justify-between max-h-[30rem] overflow-auto scrollbar">
            {filefiltreData.map((item, index) => (
              <div
                key={index}
                className="w-full border  rounded p-4 mb-2 flex justify-between items-center bg-white hover:bg-gray-100"
              >
                <p>
                  <b>{item.file_name}</b>
                </p>
                <div className='flex gap-8'>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600">
                    Download
                  </button>




                  <Modal
                    isOpen={showModalForProduct === item.filekey} // Open modal only for the selected product
                    onRequestClose={() => setShowModalForProduct(null)}

                    contentLabel="Logout Confirmation"
                    className="bg-[#121212] text-white rounded-lg p-4 w-72 mx-auto mt-20"
                    overlayClassName="fixed inset-0 flex items-center justify-center z-50"
                  >
                    <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
                    <p className="text-lg mb-6">Are you sure you want to delete?</p>
                    <div className="flex justify-center  space-x-4">
                      <button onClick={() => handleDeletefile(item.filekey)} disabled={loading} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                        {loading ? (
                          <ThreeDots height={20} width={40} radius={9} color="#4fa94d" ariaLabel="three-dots-loading" visible={true} />
                        ) : (
                          "Ok"
                        )}
                      </button>
                      <button onClick={cancelLogout} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                        Cancel
                      </button>
                    </div>
                  </Modal>

                  <button onClick={() => handleDeleteClick(item.filekey)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center z-90 justify-center fixed top-0 left-0 w-full h-full bg-opacity-30 bg-gray-300">
                <div className="ml-40">
                  <Circles
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              </div>
            )}


          </div>
        </div>
      </div>


    </>
  );
};


export default FatakFileUpload;









