import React, { useRef, useState } from 'react';
import Rawdata from './Rawdata';
import { useRecoilState } from 'recoil';
import { Search } from '../Recoil';

const Import = () => {

  const [tab, setTab] = useState("rawfiles");

  const[input,setinput]=useRecoilState(Search)

  const handleOnClick = (e) => {
    setTab(e);
  };

   console.log(input)

  return (

    <div className='' >
      <div className="main  ml-[56px]   ">
    
        <div className="flex flex-col m-4 ">
          <div className="flex items-center     space-x-4">
            <input type="text" className="border rounded px-4 py-2 w-4/5" placeholder="Search"   value={input}  onChange={(e)=>setinput(e.target.value)}  />
          
          </div>
          <div className='' >
            <ul className="nav nav-tabs ">
              <li className="nav-item  ">
                <a
                  className={`nav-link ${tab === "rawfiles" ? "active" : ""}`}
                  onClick={() => handleOnClick("rawfiles")}

                >
                  <span className='text-[14px] text-black '>Raw Data</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${tab === "salayfiles" ? "active" : ""}`}
                  onClick={() => handleOnClick("salayfiles")}
                        
                > 
                  <span className='text-[14px] text-black '> Processed Data</span>
                </a>
              </li>


            </ul>
          </div>
        <div className='w-4/5'>
          <Rawdata activetab={tab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Import;
