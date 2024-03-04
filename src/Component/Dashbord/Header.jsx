import React from 'react'
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify }
  from 'react-icons/bs'
import { FaPowerOff } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Datey from './Datey';
const Header = ({ onClick, selectedContent }) => {
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

      <div className='header-mid' >  {selectedContent}</div>

      <div className='header-right'>
        <div > <Datey /></div>


        <span onClick={onClick} style={{ cursor: 'pointer' , marginBottom:4}} ><FaPowerOff /></span>
        {/* <button style={{ borderRadius: '41px' }} onClick={onClick} > Signout🛑</button> */}
      </div>
    </header>
  )
}

export default Header