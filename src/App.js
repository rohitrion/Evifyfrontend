



import { useEffect, useState } from 'react';
import './App.css';
import Home from './Component/Home';
import Signup from './Component/Signup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { auth } from './Component/firebase';
import Reset from './Component/Reset';
import File from './Component/Dashbord/File';
import Import from './Component/File-import/Import';
import Login from './Component/Login';
import ProtectedRoute from './Component/login/Auth';
import { useRecoilState } from 'recoil';
import { AuthState } from './Component/Recoil';
import Loginn from './Component/Login';
import Test from './test/Test';

function App() {
  const [username, setUsername] = useState('');
  const [log, setLog] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const navigate = useNavigate();
  const [auth, setauth] = useRecoilState(AuthState)

  console.log(auth.isAuthenticated + "the login state")
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const user = JSON.parse(localStorage.getItem('user'));
  //     if (user) {
  //       setUsername(user.displayName);
  //       setLog(true);
  //     } else {
  //       setUsername('');
  //       setLog(false);
  //       navigate('/');
  //     }

  //     auth.onAuthStateChanged((user) => {
  //       if (user) {
  //         setUsername(user.displayName);
  //         setLog(true);
  //         localStorage.setItem('user', JSON.stringify(user));
  //       } else {
  //         setUsername('');
  //         setLog(false);
  //         localStorage.removeItem('user');
  //         navigate('/'); 
  //       }
  //       setAuthCheckComplete(true);
  //     });
  //   };

  //   checkAuth();
  // }, []);

  // if (!authCheckComplete) {
  //   return  null; 
  // }

  return (

    <div className='app'>

      {/* <Routes>
        <Route path='/' element={<CustomLoginPage/>} /> */}
      {/* <Route path='/data' element={log ? <Home name={username} log={log} /> : ""} /> */}
      {/* <Route path='/register' element={<Signup />} />
        <Route path='/reset' element={<Reset />} />
          <Route path='/file' element={<File />} />  
          <Route path='/new' element={<Import />}  />
          <Route path='/test' element={<Test />}  />
     </Routes> */}






      <Routes>
        <Route path="/" index element={<Loginn/>} />
        <Route path='/data' element={auth.isAuthenticated ? <Home name={username} log={log} /> : <Login/>} />
        <Route path="/register" element={<Signup />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/file" element={auth.isAuthenticated ? <File name={username} log={log} /> :  <Login/>} />
        <Route path="/new" element={<Import />} />
        <Route path="/test" element={<Test/>} />
        <Route path="/file-upload"  />
         <Route />
      </Routes>

    </div>
  );
}

export default App;
