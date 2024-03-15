import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BaseURLState, Dz, Finalresponse, GloablFile, NewNum, Num, Refresh, TextState } from '../Recoil'

const Suratstu = ({setsucess}) => {

  const [show, setshow] = useRecoilState(TextState)
  const [num, setnum] = useRecoilState(Num)

  const baseurl = useRecoilValue(BaseURLState);
  const [final, setfinal] = useRecoilState(Finalresponse)
//  const [newnum,setnewnum]=useRecoilValue(NewNum)
   
const [gfile ,setgfile]=useRecoilState(GloablFile)
const [refresh,setrefresh]=useRecoilValue(Refresh)
  

  function handleclick(val) {
     setnum(val)
  

  }

  
  const handleprev=()=>{
    // setgfile(null +  'file is empty ')
    setnum(0)
    setgfile(0)
    setsucess(false)
    console.log(gfile)
  }
  

  const handleDownload = async () => {
    try {
      const url =
        `${baseurl}/download_salary_file/${final.file_key}`;
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
    <div className="flex items-center justify-center pl-[80px] mb-60 ml-96">
      <main className="bg-white p-8 rounded shadow-lg w-120 lg:w-144">

        <div className="container mx-auto mt-8 ">



          <div className="mb-4  flex flex-col justify-center items-center gap-8 ">
            <h3 className="text-3xl font-bold   ">Salary Structure of Surat </h3>

            <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
              <span className="text-xl font-bold">ZOMATO</span>

              <button onClick={() => handleclick(2)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                Update Structure
              </button>


            </div>

            <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded  ">
              <span className="text-xl font-bold">SWIGGY</span>
              <button onClick={() => handleclick(3)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                Update Structure
              </button>


            </div>



            <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
              <span className="text-xl font-bold" >BB-NOW</span>
              <button onClick={() => handleclick(4)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                Update Structure
              </button>


            </div>



            <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
              <span className="text-xl font-bold" >FLIPKART</span>
              <button onClick={() => handleclick(5)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                Update Structure
              </button>


            </div>




            <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
              <span className="text-xl font-bold" >ECOM</span>
              <button onClick={() => handleclick(6)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                Update Structure
              </button>


            </div>



            <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
              <span className="text-xl font-bold" >BLUEDART</span>
              <button onClick={() => handleclick(7)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                Update Structure
              </button>


            </div>






            <div className='flex gap-16  mt-3  justify-between' >

              <button className="bg-blue-500 text-black px-4 py-2  rounded-lg "   onClick={()=>handleprev(0)}   >previous</button>
              <button className="bg-blue-500 text-black px-4 py-2  rounded-lg  " onClick={handleDownload} >Finish</button>
            </div>
          </div>

        </div>
      </main>
    </div>

  )
}

export default Suratstu
