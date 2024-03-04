import React from 'react'

const Form = () => {
  return (
    <div className="container mx-auto mt-8 ">
     
        
   
      <div className="mb-4  flex flex-col justify-center items-center gap-8 ">
      <h3 className="text-3xl font-bold   ">Salary Structure of Surat </h3> 

        <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
          <span className="text-xl font-bold">Zomato</span>
          <button className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Update Structure
          </button>

          
        </div>

        <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded  ">
          <span className="text-xl font-bold">Swiggy</span>
          <button className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Update Structure
          </button>

          
        </div>



        <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
          <span className="text-xl font-bold">Big Basket</span>
          <button className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Update Structure
          </button>

          
        </div>
      </div>

  </div>
  )
}

export default Form
