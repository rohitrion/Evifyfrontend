import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BaseURLState, Dz, Finalresponse, GloablFile, NewNum, Num, Refresh, TextState } from '../Recoil'

const Form = ({ setsucess ,setfileName}) => {

  const [show, setshow] = useRecoilState(TextState)
  const [num, setnum] = useRecoilState(Num)

  const baseurl = useRecoilValue(BaseURLState);
  const [final, setfinal] = useRecoilState(Finalresponse)
  //  const [newnum,setnewnum]=useRecoilValue(NewNum)

  const [gfile, setgfile] = useRecoilState(GloablFile)
  const [refresh, setrefresh] = useRecoilValue(Refresh)

  const navigate = useNavigate()
  function handleclick(val) {
    setnum(val)


  }


  const handleprev = () => {
    // setgfile(null +  'file is empty ')
    // setnum(0)
    setgfile(null)
    setsucess(false)
    setfileName(null)
    console.log(gfile)
  }


  const handleDownload = async () => {

    try {
      const url =

    

        `${baseurl}/download_salary_file_format/${final.file_key}`;
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





    <div className="flex items-center justify-center h-full overflow-y-auto  overflow-x-auto  ">
      <main className="bg-white p-4 sm:p-8 rounded shadow-lg w-full sm:w-11/12 md:w-6/12 lg:w-6/12 xl:w-8/12 ">
        <div className="container mx-auto mt-4 sm:mt-8 h-full">
          <div className="mb-4 flex flex-col justify-center items-center gap-4 sm:gap-8 h-full">
            <h3 className="text-xl sm:text-3xl font-bold">Salary Structure of Surat </h3>

            {/* Cards */}
            <div className="flex flex-col gap-4 sm:gap-8 w-full    overflow-y-auto  overflow-x-auto " style={{ maxHeight: '500px', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }} >
              {/* ZOMATO Card */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3  justify-between rounded">
                <span className="text-xl font-bold">ZOMATO </span>
                <button onClick={() => handleclick(2)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                  Update Structure
                </button>
              </div>

              {/* SWIGGY Card */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3 justify-between rounded">
                <span className="text-xl font-bold">SWIGGY</span>
                <button onClick={() => handleclick(3)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                  Update Structure
                </button>
              </div>

              {/* BB-NOW Card */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3 justify-between rounded">
                <span className="text-xl font-bold">BB-NOW</span>
                <button onClick={() => handleclick(4)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                  Update Structure
                </button>
              </div>

              {/* FLIPKART Card */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3 justify-between rounded">
                <span className="text-xl font-bold">FLIPKART</span>
                <button onClick={() => handleclick(5)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                  Update Structure
                </button>
              </div>

              {/* ECOM Card */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3  justify-between rounded">
                <span className="text-xl font-bold">ECOM</span>
                <button onClick={() => handleclick(6)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                  Update Structure
                </button>
              </div>

              {/* BLUEDART Card */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3 justify-between  rounded">
                <span className="text-xl font-bold">BLUEDART </span>
                <button onClick={() => handleclick(7)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                  Update Structure
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3 justify-between  rounded">
                <span className="text-xl font-bold">BLUEDART-VAN</span>
                <button onClick={() => handleclick(17)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                  Update Structure
                </button>
              </div>




              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3 justify-between  rounded">
                <span className="text-xl font-bold">UPTOWN-FRESH</span>
                <button onClick={() => handleclick(18)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                  Update Structure
                </button>
              </div>



              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3 justify-between  rounded">
                <span className="text-xl font-bold">Bonus</span>
                <button onClick={() => handleclick(20)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                  Update Structure
                </button>
              </div>


            </div>

            {/* Buttons */}
            <div className="flex gap-4 sm:gap-16 mt-1 w-full justify-between">
              <button className="bg-blue-500 text-black px-2 sm:px-4 py-1 sm:py-2 rounded-lg" onClick={() => handleprev(0)}>Previous</button>
              <button className="bg-blue-500 text-black px-2 sm:px-4 py-1 sm:py-2 rounded-lg" onClick={handleDownload}>Finish</button>
            </div>
          </div>
        </div>
      </main>
    </div>



  )
}

export default Form
