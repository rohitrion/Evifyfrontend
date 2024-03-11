import React from 'react';
import { useState } from 'react';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
} from 'mdb-react-ui-kit';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {


    const navigate = useNavigate();
    const [values, setvalues] = useState({
        email: "",
        pass: ""
    })

    const [error, seterror] = useState('')  //for error state 
    const [submitdisabel, setsubmitdisable] = useState(false)  // for disbale button for api 

    const handleSubmit = () => {
        if (!values.email || !values.pass) {
            seterror("Please Fill  All Feilds");
            return;
        }
        seterror('');
        setsubmitdisable(true);
        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then((res) => {
                setsubmitdisable(false);
                navigate('/data')
                console.log(res)
            }).catch((err) => {
                setsubmitdisable(false)
                seterror(err.message)
            })
    }

    return (

        // <MDBContainer className="my-5 ">
        // <MDBContainer fluid>
        //     <MDBRow>

        //         <MDBCol sm='6'> 

        //             <div className='d-flex flex-row ps-5 pt-5 mb-7'>
        //                 <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#FFB603' }} />
        //                 <span className="h1 fw-bold mb-0 text-warning  "><i><b>EVIFY</b> </i> </span>
        //                 {/* <img   src={logo2} /> */}
        //             </div>

        //             <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

        //                 <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

        //                 <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg"

        //                     onChange={(e) => {
        //                         setvalues((prev) => ({ ...prev, email: e.target.value }))
        //                     }} />
        //                 <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlL' type='password' size="lg"
        //                     onChange={(e) => {
        //                         setvalues((prev) => ({ ...prev, pass: e.target.value }))
        //                     }} />

        //                 <div className='d-flex flex-row justify-content-center mb-4'>
        //                     <b className='error'>{error}</b>
        //                 </div>

        //                 <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={handleSubmit} disabled={submitdisabel} >Login</MDBBtn>
        //                 <p className="small mb-5 pb-lg-3 ms-5"> <Link to='/reset' class="text-muted" ><b>Forgot password ?</b></Link></p>
        //                 <p className='ms-5'>Don't have an account?{' '}<Link to="/register" class="link-info" >Register here</Link></p>

        //             </div>

        //         </MDBCol>

        //         <MDBCol sm='6' className='d-none d-sm-block px-0'>
        //             <img src={logo}
        //                 alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left', height: "70vh" }} />
        //         </MDBCol>

        //     </MDBRow>

        // </MDBContainer> </MDBContainer>
        <MDBContainer fluid style={{ backgroundImage:`url(${logo})`,  backgroundSize: 'cover',  height: '100vh'}} >

        <MDBRow className='d-flex justify-content-center align-items-center h-100  w-[400px]    '>
          <MDBCol col='12' className='ml-[1200px]   ' >
{/*   
            <MDBCard className='text-white  mx-auto' style={{borderRadius: '1rem', maxWidth: '400px',backgroundColor: 'rgba(0, 128, 0, 0.5)'}}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
  
                <h2 className="fw-bold mb-2 text-uppercase" style={{color:'yellow'}} >EVIFY</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p> */}
  
                <MDBInput  style={{border:'1 px solid green'}} wrapperClass='mb-4 mx-5 w-10' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg    " 
                
                onChange={(e) => {
                                            setvalues((prev) => ({ ...prev, email: e.target.value }))
                                      }} />
                
                <MDBInput wrapperClass='mb-4 mx-5 w-10' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"
                
                onChange={(e) => {
                                            setvalues((prev) => ({ ...prev, pass: e.target.value }))
                                     }} />
                
                
  
                <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
                <MDBBtn outline className='mx-2 px-5 mt-3' color='white' size='lg' onClick={handleSubmit} disabled={submitdisabel}   >
                  Login
                </MDBBtn>
  
                {/* <div className='d-flex flex-row mt-3 mb-5'>
                  <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='facebook-f' size="lg"/>
                  </MDBBtn>
  
                  <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='twitter' size="lg"/>
                  </MDBBtn>
  
                  <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='google' size="lg"/>
                  </MDBBtn>
                </div> */}
  
                <div>
                  {/* <p className="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p> */}
  
                </div>
              {/* </MDBCardBody>
            </MDBCard> */}
  
          </MDBCol>
        </MDBRow>
  
      </MDBContainer>

    );
}

export default Login;
