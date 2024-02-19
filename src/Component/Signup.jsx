import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from 'react';
import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,

} from 'mdb-react-ui-kit';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {

    const navigate = useNavigate();
    const [values, setvalues] = useState({
        name: "",
        email: "",
        pass: ""
    })

    const [error, seterror] = useState('')  //for error state 
    const [submitdisabel, setsubmitdisable] = useState(false)  // for disbale button for api 

    const handleSubmit = () => {
        if (!values.name || !values.email || !values.pass) {
            seterror("Please Fill  All Feilds");
            return;
        }
        seterror('');
        setsubmitdisable(true);
        createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then((res) => {
                setsubmitdisable(false);
                const user = res.user;
                 updateProfile(user, {
                    displayName: values.name
                });
                console.log(res)
                navigate('/')
            }).catch((err) => {
                setsubmitdisable(false)
                seterror(err.message)
            })
    }

    return (
        <>
            <div >
                <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', height: '100vh' }}>
                    <div className='mask gradient-custom-3'></div>
                    <MDBCard className='m-5 hhh' style={{ maxWidth: '800px' }}>
                        <MDBCardBody className='px-5'>
                            <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                            <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text'
                                onChange={(e) => {
                                    setvalues((prev) => ({ ...prev, name: e.target.value }))
                                }}
                            />
                            <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email'
                                onChange={(e) => {
                                    setvalues((prev) => ({ ...prev, email: e.target.value }))
                                }} />
                            <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'
                                onChange={(e) => {
                                    setvalues((prev) => ({ ...prev, pass: e.target.value }))
                                }}
                            />
                            <div className='d-flex flex-row justify-content-center mb-4'>
                                <b className='error'>{error}</b>
                            </div>
                            <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' disabled={submitdisabel} onClick={handleSubmit} >Register</MDBBtn>
                            <div className="mt-3">
                                <p className="mb-0  text-center">
                                    Already have an account ?{' '}
                                    <Link to='/'><a className="text-primary fw-bold">Sign In </a></Link>
                                </p>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </div>
        </>
    );
}

export default Signup;