



import React, { useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthState } from './Recoil';
import { useRecoilState } from 'recoil';

const Login = () => {
  const [values, setValues] = useState({ email_id: '', password: '' });
  const [error, setError] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [auth, setAuth] = useRecoilState(AuthState);
 
   const navigate=useNavigate()

  const handleSubmit = async () => {
    try {
      setSubmitDisabled(true); // Disable the button during the request

      // Make a POST request using Axios
      const response = await axios.post(`https://1b05-2405-201-2008-7273-99a4-205-be78-d049.ngrok-free.app/login`, {
        email_id: values.email_id,
        password: values.password,
      });

      // Handle the response as needed
      console.log('Login successful!', response.data);
      setAuth({
        isAuthenticated: true,
        
      });
      // You might want to redirect the user or store the token here
      navigate('/data')
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Login failed:', error.message);
      setError('Invalid credentials'); // Set an appropriate error message
    } finally {
      setSubmitDisabled(false); // Re-enable the button
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol sm='6' className='ml-[300px]'>
            <div className='d-flex flex-row ps-5 pt-5 mb-7'>
              <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#FFB603' }} />
              <span className="h1 fw-bold mb-0 text-warning  "><i><b>EVIFY</b></i> </span>
            </div>

            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
              <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg"
                onChange={(e) => setValues((prev) => ({ ...prev, email_id: e.target.value }))} />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlL' type='password' size="lg"
                onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))} />

              <div className='d-flex flex-row justify-content-center mb-4'>
                <b className='error'>{error}</b>
              </div>

              <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={handleSubmit} disabled={submitDisabled}>
                Login
              </MDBBtn>
              <p className="small mb-5 pb-lg-3 ms-5">
                <Link to='/reset' className="text-muted"><b>Forgot password ?</b></Link>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default Login;
