import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from 'file-saver';
import { useRecoilState } from "recoil";
import { BaseURLState, Search } from "../Recoil";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rawtabs = ({ activetab, item, val, data, setData, filteredData, setFilteredData }) => {

  const [globalurl, setglobalurl] = useRecoilState(BaseURLState)
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useRecoilState(Search);


  const [loading, setloading] = useState(false)


  const handleDownload = async (file_key, file_name) => {

    try {

      let url;

      if (activetab === "rawfiles") {
        url = `${globalurl}/download_raw_file/${encodeURIComponent(file_key)}`;
      } else if (activetab === "salayfiles") {
        url = `${globalurl}/download_salary_file_format/${encodeURIComponent(file_key)}`;
      }

      //   const response = await axios.get(url, { responseType: "blob" });

      //   if (response && response.data) {
      //     saveAs(new Blob([response.data]), file_name);
      //   } else {
      //     console.error("Empty or invalid response from the server");
      //   }
      // } catch (error) {
      //   console.error("Error downloading file:", error.message);
      // }





      const urls = url
      // `${baseurl}/surat/samplefile/${selectedCity1}`;
      const link = document.createElement("a");
      link.href = urls;
      link.setAttribute("download", "download.xlsx");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error.message);
    }

  }







  const handleDeletefile = async (file_key) => {
    setloading(true);
    try {
      let url;
      if (activetab === "rawfiles") {
        url = `${globalurl}/delete_raw_file/${file_key}`;
      } else if (activetab === "salayfiles") {
        url = `${globalurl}/delete_processed_file/${file_key}`;
      }


      const response = await axios.delete(url, {
        headers: {

          'Content-Type': 'application/json'
        }
      });




      const filterData = filteredData.filter(item => item.filekey !== file_key);
      setData(filterData);
      setFilteredData(filterData)



      toast.error("Item deleted", {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      console.log(response.data); // Assuming the response contains meaningful data


    } catch (error) {
      console.error('Error deleting file:', error);

      // Handle error
    } finally {
      setloading(false)
    }

    setShowModal(false);
  };



  function handleDelete() {

    setShowModal(true);
  }

  const cancelLogout = () => {
    setShowModal(false);
  };





  return (
    <>
        <ToastContainer />
      <div className=" border rounded p-4 m-4 relative flex items-center shadow-lg  hover:bg-gray-200 justify-between   h-[30px]  scrollbar ">

        <div className="flex items-center  hover:grey   ">
          <p><b>{item.file_name}</b></p>

        </div>
        <div className="flex gap-10" >

          <button onClick={() => handleDownload(item.filekey)} type="button" className="btn btn-primary hover:bg-blue-950 ">Download</button>
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
                onClick={() => handleDeletefile(item.filekey)} disabled={loading}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >


                {loading ? (
                  <ThreeDots
                    height="20"
                    width="40"
                    radius="9"
                    color="#4fa94d"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                ) : (
                  "Ok"
                )}


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

    </>
  );
};

export default Rawtabs;


