import React from 'react'
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify }
  from 'react-icons/bs'
import { FaPowerOff } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Datey from './Datey';
const Header = ({ onClick, selectedContent }) => {

  const y=selectedContent.toUpperCase();
  return (
    <header className='header'>
      {/* <div className='menu-icon'>
       
    </div>
    <div className='header-left'>
        <BsSearch  className='icon'/>
    </div>
    <div className='header-right'>
        <BsFillBellFill className='icon'/>
        <BsFillEnvelopeFill className='icon'/>
        <BsPersonCircle className='icon'/>
     <button style={{borderRadius:'41px'}} onClick={onClick} > Signout🛑</button>  
    </div> */}

      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <i><b>EVIFY</b></i>
        </div>

      </div>

      <div className='header-mid' >  {y}</div>

      <div className='header-right'>
        <div > <Datey /></div>


        <span onClick={onClick} className= ' cursor-pointer text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br z-0 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center ml-8 transition duration-300 ease-in-out transform hover:scale-105' ><FaPowerOff /></span>
        {/* <button style={{ borderRadius: '41px' }} onClick={onClick} > Signout🛑</button> */}
      </div>
    </header>
  )
}

export default Header