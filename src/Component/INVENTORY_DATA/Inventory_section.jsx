




import React, { useState } from 'react';

import Container_1 from './Container_1'
const Inventory_section = () => {
  const [input, setInput] = useState('');
  const [tab, setTab] = useState('rawfiles');

  const handleOnClick = (tabName) => {
    setTab(tabName);
  };

  return (
    <div className="">
      <div className="main ">
        <div className="flex flex-col m-4">
          {/* <div className="flex items-center space-x-4">
            <input
              type="text"
              className="border rounded px-4 py-2 w-4/5"
              placeholder="Search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div> */}
          <div className="">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${tab === "rawfiles" ? "active" : ""}`}
                  onClick={() => handleOnClick("rawfiles")}
                >
                  <span className="text-[14px] text-black">USE Inventory Data</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${tab === "salayfiles" ? "active" : ""}`}
                  onClick={() => handleOnClick("salayfiles")}
                >
                  <span className="text-[14px] text-black">Processed Data</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full">
            {tab === 'rawfiles' && <Container_1  />}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory_section;




