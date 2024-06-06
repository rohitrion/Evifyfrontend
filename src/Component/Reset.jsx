// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { auth } from './firebase';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//     MDBBtn,
//     MDBContainer,
//     MDBCard,
//     MDBCardBody,
//     MDBInput,
// }
//     from 'mdb-react-ui-kit';


// function Reset() {
//     const [email, setEmail] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate()
//     const handleResetPassword = async (e) => {
//         e.preventDefault();

//         try {
//             await sendPasswordResetEmail(auth, email);
//             toast.success('Password reset email sent. Please check your inbox for further instructions.', { position: "top-center", });
//             setError('')
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     return (
//         <>

//             <ToastContainer />
//             <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', height: '100vh' }}>
//                 <div className='mask gradient-custom-3'></div>
//                 <MDBCard className='m-5 hhh' style={{ maxWidth: '600px' }}>
//                     <MDBCardBody className='px-5'>
//                         <h2 className="text-uppercase text-center mb-4">Reset Password</h2>

//                         {error && <p style={{ color: 'red' }}>{error}</p>}
//                         <MDBInput wrapperClass='mb-5' label='Your Email' size='lg' id='form2' type='email'
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                         <MDBBtn className='mb-4 w-100 gradient-custom-4' onClick={handleResetPassword} size='lg'>Send Link</MDBBtn>
//                         <Link to='/'> <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'>Go to lOgin</MDBBtn></Link>
//                     </MDBCardBody>
//                 </MDBCard>
//             </MDBContainer>


//         </>)
// }

// export default Reset;