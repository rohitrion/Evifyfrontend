import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from './firebase'
import Header from './Dashbord/Header'
import Sidebar from './Dashbord/Sidebar'
import Main from './Dashbord/Main'
import '../App.css'
import { useState } from 'react';
import File from './Dashbord/File';
import Import from './File-import/Import'
import Inventory from './INVENTORY/Inventory'
import { useRecoilState } from 'recoil'
import { AuthState, Filename, GloablFile, Num } from './Recoil'

import Category from './INVENTORY-OUT/Category'
import Inventory_Form from './Sub_inventory/Inventory_Form'




function Home({ name, log }) {




  const [selectedContent, setSelectedContent] = useState('Dashboard');

  const [currentFileUploadStep, setCurrentFileUploadStep] = useState(1);

  const [num,setnum] =useRecoilState(Num)

 const[auth,setAuth]=useRecoilState(AuthState)
 const [gfile,setgfile]=useRecoilState(GloablFile)
 const [fileName, setFileName] = useRecoilState(Filename)

  const handleSidebarItemClick = (content) => {
    setSelectedContent(content);
    // setCurrentFileUploadStep(1);
     setnum(0)
     setgfile(null)
     setFileName(null)
  };
 

  const handleFileUploadNext = () => {
    // setCurrentFileUploadStep(currentFileUploadStep + 1);
  
  };

 
  const contentComponents = {
    Dashboard: <Main />,
    "File-upload": <File   
    currentStep={num}
    // onNext={handleFileUploadNext}
    />,
    "File-Import": <Import />,
    "Inventory-in":<Inventory/>,
    "Inventory-out": <Category/>, 
    "form": <Inventory_Form/>


  }

  // const [show,setshow]=useState(true)
   
  // const handleButtonClick = () => {
 
  //   setshow(false);
  // };

  const navigate = useNavigate()

  // const handleLogout = () => {
  //   signOut(auth).then(() => {          // Sign-out successful.
  //     navigate("/");
  //     console.log("Signed out successfully")
  //   }).catch((error) => {
  //   });

  // }


  const handleLogout = () => {
    // Clear authentication data from local storage and reset auth state
    localStorage.removeItem('authData');
    setAuth({ isAuthenticated: false, token: null });
    // Redirect to login page after logout
    navigate('/');
  };

  // if (!log) {
  //   navigate('/');
  //   return null;
  // }

  return (
    <>
      <div className='grid-container'>


        <Header  onClick={handleLogout}   selectedContent={selectedContent} />
        <Sidebar  onClick={handleLogout}  onSidebarItemClick={handleSidebarItemClick} />
        {/* { show && log ?  <Main   /> :  <File/>

        }
  */}
                {contentComponents[selectedContent]}

      </div>
    </>
  );
}

export default Home

