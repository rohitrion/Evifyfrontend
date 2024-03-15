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
import Inventory from './Sidebar/Inventory'
import { useRecoilState } from 'recoil'
import { Num } from './Recoil'

function Home({ name, log }) {




  const [selectedContent, setSelectedContent] = useState('Dashboard');

  const [currentFileUploadStep, setCurrentFileUploadStep] = useState(1);

  const [num,setnum] =useRecoilState(Num)

  const handleSidebarItemClick = (content) => {
    setSelectedContent(content);
    // setCurrentFileUploadStep(1);
     setnum(1)
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
    Inventory:<Inventory/>

  };




  // const [show,setshow]=useState(true)
   
  // const handleButtonClick = () => {
 
  //   setshow(false);
  // };

  const navigate = useNavigate()

  const handleLogout = () => {
    signOut(auth).then(() => {          // Sign-out successful.
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
    });

  }

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

