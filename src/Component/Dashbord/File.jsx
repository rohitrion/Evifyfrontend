
import React, {  useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Form from './Form';
import { Circles } from 'react-loader-spinner'
import Salary from './Salary';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, Dz, Error, GloablFile, Num, Refresh, TextState } from '../Recoil';
import Swiggy from './Swiggy';
import BBnow from '../Slabs/BBnow';
import Flipkart from '../Slabs/Flipkart';
import ECOM from '../Slabs/ECOM';
import Bluedart from '../Slabs/Bluedart';
import Ahemdabad from '../Slabs/Ahemdabad';
import Ahzomato from '../Slabs/Ahzomato';
import Ahblinkit from '../Slabs/Ahblinkit';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Ahbbnow from '../Slabs/Ahbbnow';
import Ahflipkart from '../Slabs/Ahflipkart';
import Ahecom from '../Slabs/Ahecom';
import Ahbigbasket from '../Slabs/Ahbigbasket';
const File = ({ currentStep, onNext }) => {

  const [selectedCity, setSelectedCity] = useState(null);


  const [selectedCity1, setSelectedCity1] = useState(null);

  const [file, setfile] = useState(null)

  const [sucess, setsucess] = useState(false);

  const [loading, setloding] = useState(false)

  const [sal, setsal] = useRecoilState(TextState)

  const [Gfile, GsetFile] = useRecoilState(GloablFile)


  const baseurl = useRecoilValue(BaseURLState)


  const [error, seterror] = useRecoilState(Error);


  const [num, setnum] = useRecoilState(Num)


  const [refresh, setrefresh] = useRecoilState(Refresh)
  // console.log(num)

  console.log(Gfile + "data")


  const handleFileChange = (event) => {
    const selectedfile = event.target.files[0]
    console.log(selectedfile)
    setfile(selectedfile)
    GsetFile(selectedfile)
  }

  const navigate = useNavigate

  const handleUpload = async () => {
    if (!Gfile) {
      return
    }
    try {

      setloding(true)

      const formData = new FormData();
      formData.append('file', Gfile);

      // Replace 'your-api-endpoint' with the actual endpoint of your API
      const response = await axios.post(`${baseurl}/uploadfile/${selectedCity}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',

        },
      });

      console.log('File uploaded successfully', response.data);
      setsucess(true)

      // toast.success('File uploaded successfully!');
      // renderCityComponent();
    } catch (error) {
      handleError(error.response.data.detail);
     
      console.error('Error uploading file', error);
      console.log('Response data:', error.response.data);
      console.log('Response status:', error.response.status);
      console.log('Response headers:', error.response.headers);
    } finally {
      setloding(false); // Set loading to false regardless of success or error

      if (selectedCity === "surat") {
        setnum(1)
      }

      if (selectedCity === "ahmedabad") {
        setnum(15)
      }

    }



  };


  const handleError = (errorMessage) => {
    seterror(errorMessage);

    // Clear the error after 1 minute
    setTimeout(() => {
      seterror('');
    }, 3000);
  };


  const handleDownload = async () => {
    try {
      const url =
        `${baseurl}/surat/samplefile/${selectedCity1}`;
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






  console.log(num, "the number ")

  console.log(selectedCity, "city")

  return (
    <>



      {loading && (
        <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-opacity-30 bg-gray-300">
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


        

      {/* { num === 8 && <Ahzomato />} */}


      {
        Gfile && selectedCity === "ahmedabad" && num === 15 && sucess ? (
          <Ahemdabad setsucess={setsucess} sucess={sucess} />
        ) :


          sucess && num === 8 ? (
            <Ahzomato />

          ) : sucess && num === 9 ? (
            <Ahblinkit />


          ) : sucess && num == 1 && selectedCity === "surat" ? (
            <Form setsucess={setsucess} />
          ) : sucess && num === 2 ? (
            <Salary />
          ) : sucess && num === 3 ? (
            <Swiggy />
          ) : sucess && num === 4 ? (
            <BBnow />
          ) : sucess && num === 5 ? (
            <Flipkart />
          ) : sucess && num === 6 ? (
            <ECOM />
          ) : sucess && num === 7 ? (
            <Bluedart />
          ) :
            sucess && num === 10 ? (
              <Ahbbnow />
            ) :
              sucess && num === 11 ? (
                <Ahflipkart />
              ) :
                sucess && num === 12 ? (
                  <Ahecom />
                )
                  :
                  sucess && num === 13 ? (
                    <Ahbigbasket />
                  )
                    :
                    (
                      <>


                        <div className="flex items-center justify-center  file  w-auto   ">
                          <main className="bg-white p-8 rounded shadow-lg w-120  ">

                            <div className="text-center mb-6">
                              <h3 className="text-3xl font-bold">File Upload</h3>
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
                                <input type="file" className="w-full" onChange={handleFileChange} />
                              </div>
                            </div>



                            {
                              error ? <div class="p-4 mb-4 text-lg text-center text-red-800 mb-6 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <b><span class="font-medium">{error}</span></b>
                              </div> : ""


                            }
                         



                       


                            <div className="flex justify-end">
                              <select
                                className="px-4 py-0.5 mr-2 bg-[#EFEFEF] shadow-lg rounded-lg  text-black "
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
                                onClick={handleUpload}
                              >
                                Next
                              </button>
                            </div>

                          </main>

                        </div>
                      </>)}




    </>
  );
};


export default File;
