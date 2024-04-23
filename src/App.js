



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
import Test2 from './test/Test2';
import Testtwo from './test/Test2';

function App() {
  const [username, setUsername] = useState('');
  const [log, setLog] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const navigate = useNavigate();
  const [auth, setauth] = useRecoilState(AuthState)

  // console.log(auth.isAuthenticated + "the login state")
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (authData && authData.isAuthenticated && authData.token) {
      // If authentication data exists, set the authentication state
      setauth({
        isAuthenticated: true,
        token: authData.token
      });
    }

  }, []);



  return (

    <div className='app'>



      <Routes>
        <Route path="/" index element={<Loginn />} />
        <Route path='/data' element={auth.isAuthenticated ? <Home name={username} log={log} /> : <Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/file" element={auth.isAuthenticated ? <File name={username} log={log} /> : <Login />} />
        <Route path="/new" element={<Import />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Testtwo/>} />
        <Route path="/file-upload" />
        <Route />
      </Routes>

    </div>
  );
}

export default App;
