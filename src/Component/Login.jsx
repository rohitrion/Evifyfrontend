
// export default Login;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthState, BaseURLState } from './Recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from "react-loader-spinner";

const Login = () => {
  const [values, setValues] = useState({ email_id: '', password: '' });
  const [error, setError] = useState('');
  const [auth, setAuth] = useRecoilState(AuthState);
  const [submitDisable, setSubmitDisable] = useState(false);
  const baseurl = useRecoilValue(BaseURLState);
  const [loading, setloading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async () => {

    if (values.email_id === "" && values.password === "") {
      return;
    }
    setloading(true)
    try {
      setSubmitDisable(true); // Disable the button during the request
      toast.info('Logging in...', {
        position: "top-center",
        autoClose: false, // Do not auto close loading toast
        closeOnClick: false,
        draggable: false,
      });

      // Make a POST request using Axios
      const response = await axios.post(`${baseurl}/login`, {
        email_id: values.email_id,
        password: values.password,
      });

      // Handle the response as needed
      console.log('Login successful!', response.data);
      setAuth({
        isAuthenticated: true,
      });
      // You might want to redirect the user or store the token here
      // toast.dismiss(); /             / Hide the loading toast

      toast.success('Login successful', {
        // position: "top-center"
      });
      navigate('/data');
    } catch (error) {
      // Hide loading toast
      toast.dismiss();

      // Handle errors (e.g., display an error message)
      console.error('Login failed:', error.message);
      setError('Invalid credentials'); // Set an appropriate error message
      toast.error('Invalid credentials', {
        position: "top-center"
      });
    } finally {
      setSubmitDisable(false); // Re-enable the button
      setloading(false)
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && values.email_id !== "" && values.password !== "" ) {
      handleSubmit();
    }
  };

  return (

    // <MDBContainer className="my-5    ">
    //   <ToastContainer /> {/* Render the ToastContainer */}
    //   <MDBContainer fluid className='mt-[100px]'>
    //     <MDBRow className='mt-[100px] '>
    //       <MDBCol sm='6' className='ml-[300px] border-4 bg-white p-8 rounded shadow-lg   '>
    //         <div className='d-flex flex-row ps-5 pt-5 mb-1 justify-content-center'>
    //           <span className="h1 fw-bold  "><i><b> EVIFY</b></i> </span>
    //         </div>

    //         <div className='d-flex flex-column justify-content-center  item-center h-custom-2 w-75 pt-4'>
    //           <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>
    //           <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg"
    //             onChange={(e) => setValues((prev) => ({ ...prev, email_id: e.target.value }))} />
    //           <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlL' type='password' size="lg"
    //             onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))} />

    //           <div className='d-flex flex-row justify-content-center mb-4'>
    //             {/* <b className='error'>{error}</b> */}
    //           </div>

    //           <MDBBtn className="mb-4 px-5 mx-5 w-100 text-center" color='info' size='lg' onClick={handleSubmit} disabled={loading}>

    //             {loading ? (
    //               <div className='pl-[150px]' >
    //             <ThreeDots
    //               height="20"
    //               width="40"
    //               radius="9"
    //               color="black"
    //               ariaLabel="three-dots-loading"
    //               wrapperStyle={{}}
    //               wrapperClassName=""
    //               visible={true}
                    
    //             />
    //            </div>
    //           ) : (
    //              " Login"
    //           )}

    //           </MDBBtn>
    //           <p className="small mb-5 pb-lg-3 ms-5">
    //             <Link to='/reset' className="text-muted"><b>Forgot password ?</b></Link>
    //           </p>
    //         </div>
    //       </MDBCol>
    //     </MDBRow>
    //   </MDBContainer>
    // </MDBContainer>
<MDBContainer className="my-5">
  <ToastContainer /> {/* Render the ToastContainer */}
  <MDBContainer fluid className='mt-[100px]'>
    <MDBRow className='mt-[100px]'>
      <MDBCol sm='6' className='mx-auto border-4 bg-white p-8 rounded shadow-lg'>
        <div className='d-flex flex-row ps-5 pt-5 mb-1 justify-content-center'>
          <span className="h1 fw-bold"><i><b> EVIFY</b></i></span>
        </div>

        <div className='d-flex flex-column justify-content-center item-center h-custom-2 pt-4 md:w-4/5  sm:w-32 ss:w-32  '>
          <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>
          <MDBInput wrapperClass='mb-4 mx-5 input-width' label='Email address' id='formControlLg' type='email' size="lg " className='md:w-12'    onKeyDown={handleKeyPress}
            onChange={(e) => setValues((prev) => ({ ...prev, email_id: e.target.value }))} />
          <MDBInput wrapperClass='mb-4 mx-5 input-width' label='Password' id='formControlL' type='password' size="lg"   onKeyDown={handleKeyPress}
            onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))} />

          <div className='d-flex flex-row justify-content-center mb-4'>
            {/* <b className='error'>{error}</b> */}
          </div>

          <MDBBtn className="mb-4 mx-5 w-100 text-center" color='info' size='lg' onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <div className='flex items-center justify-center'>
                <ThreeDots
                  height="20"
                  width="40"
                  radius="9"
                  color="black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            ) : (
              "Login"
            )}
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
