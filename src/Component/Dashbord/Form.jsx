import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Num, TextState } from '../Recoil'

const Form = () => {

   const [show ,setshow]=useRecoilState(TextState)  
   const  [num,setnum] =useRecoilState(Num) 
  
    function  handleclick(val){
          setnum(val)
    }
    


  return (
    <div className="flex items-center justify-center pl-[80px] mb-60 ml-96">
              <main className="bg-white p-8 rounded shadow-lg w-120 lg:w-144">

    <div className="container mx-auto mt-8 ">
     
        
   
      <div className="mb-4  flex flex-col justify-center items-center gap-8 ">
      <h3 className="text-3xl font-bold   ">Salary Structure of Surat </h3> 

        <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
          <span className="text-xl font-bold">Zomato</span>
     
          <button  onClick={()=>handleclick(2)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Update Structure
          </button>

          
        </div>

        <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded  ">
          <span className="text-xl font-bold">Swiggy</span>
          <button   onClick={()=>handleclick(3)}  className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Update Structure
          </button>

          
        </div>



        <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
          <span className="text-xl font-bold">Big Basket</span>
          <button className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Update Structure
          </button>

          
        </div>

        <div className='flex gap-16  mt-3  justify-between' > 
            
            <button className="bg-blue-500 text-black px-4 py-2  rounded-lg " >previous</button>
            <button className="bg-blue-500 text-black px-4 py-2  rounded-lg  "  >Finish</button> 
             </div>
      </div>

  </div>
  </main>
  </div>
 
  )
}

export default Form
