


// import React, { useRef, useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { BaseURLState } from '../Recoil';
// import axios from 'axios';

import { version } from "react";

// const MyComponent = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [search, setsearch] = useState();
//     const [image, setImage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const formRef = useRef(null);

//     const [baseurl, setbaseurl] = useRecoilState(BaseURLState) 

//     const [inputFields, setInputFields] = useState({
//         invoice_number: '',
//         invoice_amount: '',
//         invoice_date: '',
//         inventory_paydate: '',
//         vender: "",
//         invoice_image_id: ""
//     });



//     // const handleInputChange = (e) => {
//     //     setInputFields({
//     //         ...inputFields,
//     //         [e.target.name]: e.target.value
//     //     });
//     // };

//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     };





//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setInputFields(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };



//     const openModal = () => {
//         setIsOpen(true);
//     };

//     const closeModal = () => {
//         setIsOpen(false);
//         setInputFields("")
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         try {
//             // First, upload the image and get the image ID
//             const imageData = new FormData();
//             imageData.append('file', image);

//             const responseImage = await axios.post(`${baseurl}/inventories/upload/image`, imageData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });


//             console.log('Response:', responseImage);
//             // Then, submit the form data along with the image ID

//             const formData = new FormData(formRef.current);
//             formData.append('invoice_image_id', responseImage.data.image_url);

//             const responseForm = await axios.post(`${baseurl}/inventories`, formData, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });


//             console.log(responseForm)
//             console.log('Form submitted successfully!');
//             formRef.current.reset();
//             setError(null);
//             setInputFields(inputFields)
//         } catch (error) {
//             console.error('Error:', error);
//             setError('Failed to submit form data. Please try again later.');
//         } finally {
//             setIsLoading(false);
//         }
//         closeModal();

//     };





//     return (
//         <div>
//             <div className="container mx-auto p-4">
//                 <div className="space-y-4">
//                     <input
//                         type="text"
//                         name="search"
//                         value={search}
//                         onChange={(e) => setsearch(e.target.value)}
//                         placeholder="search"
//                         // className="border rounded px-3 py-2"
//                         className="border rounded px-2 py-2 w-4/5   "
//                     />
//                     <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-24 rounded">
//                         Create
//                     </button>
//                 </div>
//             </div>

//             {isOpen &&
//                 // <form ref={formRef} onSubmit={handleSubmit}>
//                 <div className="fixed top-0 left-0 w-full  h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded">
//                         <h2 className="text-lg  font-bold mb-4">INVENTORY DETAILS</h2>
//                         {/* Form for input */}
//                         <form onSubmit={handleSubmit} ref={formRef} >
//                             {/* Input fields */}


//                             <div className="mb-4">

//                                 <label className='p-2' htmlFor="image">Upload Image:</label>
//                                 <input type="file" id="image" name="image" onChange={handleImageChange} />
//                             </div>



//                             <div className="mb-4">


//                                 <label htmlFor="field1" className='p-2' > INVOICE NUMBER </label>
//                                 {/* <input type="text" id="field1" name="field1" value={inputFields.field1} onChange={handleInputChange} /> */}

//                                 <input
//                                     type="text"
//                                     name="invoice_number"
//                                     value={inputFields.invoice_number}
//                                     onChange={handleChange}
//                                     placeholder="invoice_number"
//                                     className="border rounded px-3 py-2 w-full"
//                                 />
//                             </div>
//                             <div className="mb-4">

//                                 <label htmlFor="invoice_amount" className='p-2' > INVOICE AMOUNT </label>
//                                 {/* <input type="text" id="field2" name="field2" value={inputFields.field2} onChange={handleInputChange} /> */}
//                                 <input
//                                     type="number"
//                                     min={0}
//                                     name="invoice_amount"
//                                     value={inputFields.invoice_amount}
//                                     onChange={handleChange}
//                                     placeholder="Amount"
//                                     className="border rounded px-3 py-2 w-full"
//                                 />
//                             </div>
//                             <div className="mb-4">

//                                 <label htmlFor="invoice_date" className='p-2' > INVOICE DATE </label>

//                                 <input
//                                     type="date"
//                                     name="invoice_date"
//                                     // value={inputFields.invoice_date}
//                                     value={inputFields.invoice_date}
//                                     onChange={handleChange}
//                                     placeholder="Date"
//                                     className="border rounded px-3 py-2 w-full"
//                                 />
//                             </div>
//                             <div className="mb-4">

//                                 <label htmlFor="inventory_paydate" className='p-2' > INVOICE PAYDATE </label>

//                                 <input
//                                     type="date"
//                                     name="inventory_paydate"
//                                     // value={inputFields.inventory_paydate}
//                                     value={inputFields.inventory_paydate}
//                                     onChange={handleChange}
//                                     placeholder="Date"
//                                     className="border rounded px-3 py-2 w-full"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="vender" className='p-2' > VENDOR</label>
//                                 <input
//                                     type="text"
//                                     name="vender"
//                                     value={inputFields.vender}
//                                     onChange={handleChange}
//                                     placeholder="Vender"
//                                     className="border rounded px-3 py-2 w-full"
//                                 />
//                             </div>

//                             {/* Submit button */}
//                             <div className='flex justify-between'>
//                                 <button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                                     {isLoading ? 'Submitting...' : 'Submit'}
//                                 </button>
//                                 {/* Close button */}
//                                 <button onClick={closeModal} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
//                                     Close
//                                 </button>
//                             </div>
//                         </form>
//                         {error && <div>{error}</div>}
//                     </div>
//                 </div>
//                 // </form>
//             }
//         </div>
//     );
// };

// export default MyComponent;





















import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { BaseURLState } from '../Recoil';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
    content: {
       top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '30%', // Adjusted width for responsiveness
        width: 'auto', // Set to auto for responsiveness
        maxHeight: '90vh', // Limit height for small screens
        overflow: 'auto', // Enable scrolling if content overflows
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        position: 'relative'

    },
    overlay: {
        background: 'rgba(0,0,0,0.6)'
    }
};

const MyComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [baseurl, setBaseurl] = useRecoilState(BaseURLState);
    const [inputFields, setInputFields] = useState({
        invoice_number: '',
        invoice_amount: '',
        invoice_date: '',
        inventory_paydate: '',
        vendor: '',
        invoice_image_id: ''
    });
    const formRef = useRef(null);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setInputFields({
            invoice_number: '',
            invoice_amount: '',
            invoice_date: '',
            inventory_paydate: '',
            vendor: '',
            invoice_image_id: ''
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const imageData = new FormData();
            imageData.append('file', image);

            const responseImage = await axios.post(`${baseurl}/inventories/upload/image`, imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const formData = new FormData(formRef.current);
            formData.append('invoice_image_id', responseImage.data.image_url);

            const responseForm = await axios.post(`${baseurl}/inventories`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(responseForm);
            console.log('Form submitted successfully!');
            formRef.current.reset();
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to submit form data. Please try again later.');
        } finally {
            setIsLoading(false);
            closeModal();
        }
    };

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="space-y-4">
                    <input
                        type="text"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="search"
                        className="border rounded px-2 py-2 w-4/5"
                    />
                    <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-24 rounded">
                        Create
                    </button>
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"

            >
                <h2 className="text-lg font-bold mb-4">INVENTORY DETAILS</h2>
                <form onSubmit={handleSubmit} ref={formRef}>

                    <div className="mb-4    ">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Upload Image:
                        </label>
                        <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg border border-gray-300">
                            <label htmlFor="image" className="flex flex-col items-center px-2 py-2 bg-white text-blue-500 rounded-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                                <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 12a2 2 0 100-4 2 2 0 000 4zM5 10a5 5 0 1110 0 5 5 0 01-10 0z"
                                        clipRule="evenodd"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M9 2a7 7 0 016.568 4.5h1.932a1 1 0 01.95 1.316l-2.5 7a1 1 0 01-.95.684h-6a1 1 0 01-.95-.684l-2.5-7A1 1 0 012.5 6.5H4.5A7 7 0 019 2zm6.568 4.5A5 5 0 0010 4a5 5 0 00-5 5 5 5 0 005 5 5 5 0 005-5 5 5 0 001.568-3.5h-3.432z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="mt-1 text-xs leading-normal">Select a file</span>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    </div>


                    <div className="mb-4">
                        <label htmlFor="invoice_number" className="block text-gray-700 text-sm font-bold mb-2">Invoice Number:</label>
                        <input
                            type="text"
                            name="invoice_number"
                            value={inputFields.invoice_number}
                            onChange={handleChange}
                            placeholder="Enter invoice number"
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="invoice_amount" className="block text-gray-700 text-sm font-bold mb-2">INVOICE AMOUNT</label>
                        <div className="relative">
                            <input
                                type="number"
                                min={0}
                                name="invoice_amount"
                                value={inputFields.invoice_amount}
                                onChange={handleChange}
                                placeholder="Enter Invoice Amount"
                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            />
                            <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="invoice_date" className="block text-gray-700 text-sm font-bold mb-2">INVOICE DATE</label>
                        <div className="relative">
                            <input
                                type="date"
                                name="invoice_date"
                                value={inputFields.invoice_date}
                                onChange={handleChange}
                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            />
                            <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </span>
                        </div>
                    </div>


                    <div className="mb-4">
                        <label htmlFor="inventory_paydate" className="block text-gray-700 text-sm font-bold mb-2">INVOICE PAYDATE</label>
                        <div className="relative">
                            <input
                                type="date"
                                name="inventory_paydate"
                                value={inputFields.inventory_paydate}
                                onChange={handleChange}
                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            />
                            <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="vendor" className="block text-gray-700 text-sm font-bold mb-2">VENDOR</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="vendor"
                                value={inputFields.vendor}
                                onChange={handleChange}
                                placeholder="Enter Vendor"
                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            />
                            <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button onClick={closeModal} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Close
                        </button>
                    </div>
                </form>
                {error && <div>{error}</div>}
            </Modal>
        </div>
    );
};

export default MyComponent;
