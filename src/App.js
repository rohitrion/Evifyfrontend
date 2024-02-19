



import { useEffect, useState } from 'react';
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import Signup from './Component/Signup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { auth } from './Component/firebase';
import Reset from './Component/Reset';
import File from './Component/Dashbord/File';
function App() {
  const [username, setUsername] = useState('');
  const [log, setLog] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setUsername(user.displayName);
        setLog(true);
      } else {
        setUsername('');
        setLog(false);
        navigate('/');
      }

      auth.onAuthStateChanged((user) => {
        if (user) {
          setUsername(user.displayName);
          setLog(true);
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          setUsername('');
          setLog(false);
          localStorage.removeItem('user');
          navigate('/');
        }
        setAuthCheckComplete(true);
      });
    };

    checkAuth();
  }, []);

  if (!authCheckComplete) {
    return  null; 
  }

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/data' element={log ? <Home name={username} log={log} /> : <Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/reset' element={<Reset />} />
          <Route path='/file' element={<File />} />  
     </Routes>
    </div>
  );
}

export default App;
