import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from './firebase'
import Header from './Dashbord/Header'
import Sidebar from './Dashbord/Sidebar'
import Main from './Dashbord/Main'
import '../App.css'
import { useState } from 'react';
import File from './Dashbord/File';

function Home({ name, log }) {

  const [show,setshow]=useState(true)
   
  const handleButtonClick = () => {
 
    setshow(false);
  };

  const navigate = useNavigate()

  const handleLogout = () => {
    signOut(auth).then(() => {          // Sign-out successful.
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
    });

  }

  if (!log) {
    navigate('/');
    return null;
  }

  return (
    <>
      <div className='grid-container'>


        <Header  onClick={handleLogout} />
        <Sidebar   onButtonClick={handleButtonClick}  />

        { show && log ?  <Main   /> :  <File/>

        }
 


      </div>
    </>
  );
}

export default Home

