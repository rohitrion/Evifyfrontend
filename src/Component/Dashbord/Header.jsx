import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
const Header = ({ onClick }) => {
  return (
    <header className='header'>
    <div className='menu-icon'>
       
    </div>
    <div className='header-left'>
        <BsSearch  className='icon'/>
    </div>
    <div className='header-right'>
        <BsFillBellFill className='icon'/>
        <BsFillEnvelopeFill className='icon'/>
        <BsPersonCircle className='icon'/>
     <button style={{borderRadius:'41px'}} onClick={onClick} > Signout🛑</button>  
    </div>
</header>
  )
}

export default Header