
// import React, { useEffect, useRef, useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { BaseURLState } from '../Recoil';
// import axios from 'axios';
// import Modal from 'react-modal';
// import DataInventory from './DataInventory';
// import { Circles } from 'react-loader-spinner';
// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//         maxWidth: '30%', // Adjusted width for responsiveness
//         width: 'auto', // Set to auto for responsiveness
//         maxHeight: '90vh', // Limit height for small screens
//         overflow: 'auto', // Enable scrolling if content overflows
//         background: '#fff',
//         borderRadius: '8px',
//         boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
//         padding: '20px',
//         position: 'relative'

//     },
//     overlay: {
//         background: 'rgba(0,0,0,0.6)'
//     }
// };

// const MyComponent = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [search, setSearch] = useState('');
//     const [image, setImage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [baseurl, setBaseurl] = useRecoilState(BaseURLState);
//     const [getapidata, setgetapi] = useState([])
//     const [loading, setLoading] = useState(false);
//     const [filteredData, setFilteredData] = useState([]);
//     const [selectedInventory, setSelectedInventory] = useState(null);
//     const [newimag, setnewimage] = useState()
//     const [inputFields, setInputFields] = useState({
//         invoice_number: '',
//         invoice_amount: '',
//         invoice_date: '',
//         inventory_paydate: '',
//         vendor: '',
//         invoice_image_id: ''
//     });
//     const formRef = useRef(null);

//     // const openModal = () => {
//     //     setIsOpen(true);
//     // };


//     const openModal = () => {
//         setIsOpen(true);
//         setInputFields({
//             invoice_number: '',
//             invoice_amount: '',
//             invoice_date: '',
//             inventory_paydate: '',
//             vendor: '',
//             invoice_image_id: ''
//         });
//         setSelectedInventory(null);
//     };



//     const closeModal = () => {
//         setIsOpen(false);
//         setInputFields({
//             invoice_number: '',
//             invoice_amount: '',
//             invoice_date: '',
//             inventory_paydate: '',
//             vendor: '',
//             invoice_image_id: ''
//         });
//     };

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

//     const handleEdit = (inventory) => {
//         setSelectedInventory(inventory);
//         setIsOpen(true);
//         setInputFields({
//             invoice_number: inventory.invoice_number,
//             invoice_amount: inventory.invoice_amount,
//             invoice_date: inventory.invoice_date,
//             inventory_paydate: inventory.inventory_paydate,
//             vendor: inventory.vendor,
//             invoice_image_id: inventory.invoice_image_id

//         });
//         console.log(inventory)
//     };



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         try {
//             const formData = new FormData(formRef.current);

//             // If an image is uploaded, use the response image URL as the invoice_image_id
//             if (image) {
//                 const imageData = new FormData();
//                 imageData.append('file', image);

//                 const responseImage = await axios.post(`${baseurl}/inventories/upload/image`, imageData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });

//                 // Set the uploaded image URL as the invoice_image_id
//                 formData.append('invoice_image_id', responseImage.data.image_url);
//             } else {
//                 // If no new image is uploaded, use the existing invoice_image_id
//                 formData.append('invoice_image_id', inputFields.invoice_image_id);
//             }

//             if (selectedInventory) {
//                 const response = await axios.patch(`${baseurl}/inventories/${selectedInventory.invoice_id}`, formData, {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 console.log('Inventory updated successfully!');
//                 console.log(response.data);

//                 setgetapi(prevData => prevData.map(item => (
//                     item.invoice_id === selectedInventory.invoice_id ? inputFields : item
//                 )));
//             } else {
//                 const response = await axios.post(`${baseurl}/inventories`, formData, {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 console.log(response.data)
//                 setgetapi(prevData => [...prevData, response.data.invoice]);
//                 console.log('Inventory created successfully!');
//             }


//             formRef.current.reset();
//             setError(null);
//         } catch (error) {
//             console.error('Error:', error);
//             setError('Failed to submit form data. Please try again later.');
//         } finally {
//             setIsLoading(false);
//             closeModal();
//         }
//     };


//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     setIsLoading(true);

//     //     try {

//     //         const imageData = new FormData();
//     //         imageData.append('file', image);

//     //         const responseImage = await axios.post(`${baseurl}/inventories/upload/image`, imageData, {
//     //             headers: {
//     //                 'Content-Type': 'multipart/form-data'
//     //             }
//     //         });




//     //         const formData = new FormData(formRef.current);
//     //         formData.append('invoice_image_id', responseImage.data.image_url);

//     //         if (selectedInventory) {


//     //             const response = await axios.patch(`${baseurl}/inventories/${selectedInventory.invoice_id}`, formData, {
//     //                 headers: {
//     //                     'Content-Type': 'application/json'
//     //                 }
//     //             });
//     //             console.log('Inventory updated successfully!');
//     //             console.log(response.data)

//     //             setgetapi(prevData => prevData.map(item => (
//     //                 item.invoice_id === selectedInventory.invoice_id ? inputFields: item
//     //             )));


//     //         } else {
//     //             const response = await axios.post(`${baseurl}/inventories`, formData, {
//     //                 headers: {
//     //                     'Content-Type': 'application/json'
//     //                 }
//     //             });
//     //             console.log(response.data)
//     //             setgetapi(prevData => [...prevData, response.data.invoice]);
//     //             console.log('Inventory created successfully!');
//     //         }


//     //         formRef.current.reset();
//     //         setError(null);
//     //     } catch (error) {
//     //         console.error('Error:', error);
//     //         setError('Failed to submit form data. Please try again later.');
//     //     } finally {
//     //         setIsLoading(false);
//     //         closeModal();
//     //     }
//     // };

//     useEffect(() => {
//         // const filteredResults = getapidata.filter(item =>
//         //     item?.vendor.toLowerCase().includes(search.toLowerCase())
//         // );
//         const filteredResults = getapidata.filter(item =>
//             item?.vendor && item.vendor.toLowerCase().includes(search.toLowerCase())
//         );

//         setFilteredData(filteredResults);
//     }, [search, getapidata]);



//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(`${baseurl}/inventories`);

//                 setgetapi(response.data);
//                 console.log(response.data)
//                 setFilteredData(response.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setError('Failed to fetch data from the API.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [baseurl,]);




//     return (
//         <div>


//             {loading && (
//                 <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-opacity-60 z-2 bg-gray-300">
//                     <div className="ml-40">
//                         <Circles
//                             height="80"
//                             width="80"
//                             color="#4fa94d"
//                             ariaLabel="circles-loading"
//                             wrapperStyle={{}}
//                             wrapperClass=""
//                             visible={true}
//                         />

//                     </div>
//                 </div>
//             )}

//             <div className="w-4/5 mx-auto py-4">
//                 <div className="flex items-center justify-between">
//                     <div className="relative w-full mr-4">
//                         <input
//                             type="text"
//                             name="search"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             placeholder="Search"
//                             className="border rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//                         />
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-3">
//                             <svg
//                                 className="w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-500"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M15 15l5-5m0 0l-5-5m5 5H4"
//                                 />
//                             </svg>
//                         </span>
//                     </div>
//                     <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
//                         Create
//                     </button>
//                 </div>
//             </div>

//             <Modal
//                 isOpen={isOpen}
//                 onRequestClose={closeModal}
//                 style={customStyles}
//                 contentLabel="Example Modal"

//             >
//                 <h2 className="text-lg font-bold mb-4">INVENTORY DETAILS</h2>
//                 <form onSubmit={handleSubmit} ref={formRef}>

//                     <div className="mb-4    ">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//                             Upload Image:
//                         </label>
//                         <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg border border-gray-300">
//                             <label htmlFor="image" className="flex flex-col items-center px-2 py-2 bg-white text-blue-500 rounded-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
//                                 <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M10 12a2 2 0 100-4 2 2 0 000 4zM5 10a5 5 0 1110 0 5 5 0 01-10 0z"
//                                         clipRule="evenodd"
//                                     />
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M9 2a7 7 0 016.568 4.5h1.932a1 1 0 01.95 1.316l-2.5 7a1 1 0 01-.95.684h-6a1 1 0 01-.95-.684l-2.5-7A1 1 0 012.5 6.5H4.5A7 7 0 019 2zm6.568 4.5A5 5 0 0010 4a5 5 0 00-5 5 5 5 0 005 5 5 5 0 005-5 5 5 0 001.568-3.5h-3.432z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 <span className="mt-1 text-xs leading-normal">Select a file</span>
//                                 <input
//                                     type="file"
//                                     id="image"
//                                     name="image"
//                                     className="hidden"
//                                     onChange={handleImageChange}
//                                 />
//                             </label>
//                         </div>
//                     </div>


//                     <div className="mb-4">
//                         <label htmlFor="invoice_number" className="block text-gray-700 text-sm font-bold mb-2">Invoice Number:</label>
//                         <input
//                             type="text"
//                             name="invoice_number"
//                             value={inputFields.invoice_number}
//                             onChange={handleChange}
//                             placeholder="Enter invoice number"
//                             className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
//                         />
//                     </div>


//                     <div className="mb-4">
//                         <label htmlFor="invoice_amount" className="block text-gray-700 text-sm font-bold mb-2">INVOICE AMOUNT</label>
//                         <div className="relative">
//                             <input
//                                 type="number"
//                                 min={0}
//                                 name="invoice_amount"
//                                 value={inputFields.invoice_amount}
//                                 onChange={handleChange}
//                                 placeholder="Enter Invoice Amount"
//                                 className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
//                             />
//                             <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none text-gray-500">
//                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//                                 </svg>
//                             </span>
//                         </div>
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="invoice_date" className="block text-gray-700 text-sm font-bold mb-2">INVOICE DATE</label>
//                         <div className="relative">
//                             <input
//                                 type="date"
//                                 name="invoice_date"
//                                 value={inputFields.invoice_date}
//                                 onChange={handleChange}
//                                 className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
//                             />
//                             <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none text-gray-500">
//                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//                                 </svg>
//                             </span>
//                         </div>
//                     </div>


//                     <div className="mb-4">
//                         <label htmlFor="inventory_paydate" className="block text-gray-700 text-sm font-bold mb-2">INVOICE PAYDATE</label>
//                         <div className="relative">
//                             <input
//                                 type="date"
//                                 name="inventory_paydate"
//                                 value={inputFields.inventory_paydate}
//                                 onChange={handleChange}
//                                 className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
//                                 placeholder='ENTER DATE'
//                             />
//                             <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none">
//                                 <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//                                 </svg>
//                             </span>
//                         </div>
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="vendor" className="block text-gray-700 text-sm font-bold mb-2">VENDOR</label>
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 name="vendor"
//                                 value={inputFields.vendor}
//                                 onChange={handleChange}
//                                 placeholder="Enter Vendor"
//                                 className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
//                             />
//                             <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none text-gray-500">
//                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//                                 </svg>
//                             </span>
//                         </div>
//                     </div>

//                     <div className='flex justify-between'>
//                         <button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                             {isLoading ? 'Submitting...' : 'Submit'}
//                         </button>
//                         <button onClick={closeModal} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
//                             Close
//                         </button>
//                     </div>
//                 </form>
//                 {error && <div>{error}</div>}
//             </Modal>



//             <div style={{ maxHeight: '800px', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }} >
//                 {
//                     filteredData.map((item) => {

//                         return <DataInventory item={item} data={getapidata} setdata={setgetapi} modal={openModal} onEdit={handleEdit} closemodal={closeModal} />

//                     })

//                 }
//             </div>

//         </div>
//     );
// };

// export default MyComponent;









///TRYEIEDDDDD  CODE


import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, Toggle, Toggleselectedid } from '../Recoil';
import axios from 'axios';
import Modal from 'react-modal';
import DataInventory from './DataInventory';
import { Circles } from 'react-loader-spinner';
import ProductDetail from './ProductDetail';
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
    const [getapidata, setgetapi] = useState([])
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedInventory, setSelectedInventory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);



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
        setInputFields({
            invoice_number: '',
            invoice_amount: '',
            invoice_date: '',
            inventory_paydate: '',
            vendor: '',
            invoice_image_id: ''
        });
        setSelectedInventory(null);
    };




    const handleProductSelect = (product) => {
        setSelectedProduct(product);
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

    const handleEdit = (inventory) => {
        setSelectedInventory(inventory);
        setIsOpen(true);
        setInputFields({
            invoice_number: inventory.invoice_number,
            invoice_amount: inventory.invoice_amount,
            invoice_date: inventory.invoice_date,
            inventory_paydate: inventory.inventory_paydate,
            vendor: inventory.vendor,
            invoice_image_id: inventory.invoice_image_id

        });
        console.log(inventory)
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(formRef.current);

            // If an image is uploaded, use the response image URL as the invoice_image_id
            if (image) {
                const imageData = new FormData();
                imageData.append('file', image);

                const responseImage = await axios.post(`${baseurl}/inventories/upload/image`, imageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Set the uploaded image URL as the invoice_image_id
                formData.append('invoice_image_id', responseImage.data.image_url);
            } else {
                // If no new image is uploaded, use the existing invoice_image_id
                formData.append('invoice_image_id', inputFields.invoice_image_id);
            }

            if (selectedInventory) {
                const response = await axios.patch(`${baseurl}/inventories/${selectedInventory.invoice_id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Inventory updated successfully!');
                console.log(response.data); 

                setgetapi(prevData => prevData.map(item => (
                    item.invoice_id === selectedInventory.invoice_id ? inputFields : item
                )));
            } else {
                const response = await axios.post(`${baseurl}/inventories`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data)
                setgetapi(prevData => [...prevData, response.data.invoice]);
                console.log('Inventory created successfully!');
            }


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



    useEffect(() => {

        const filteredResults = getapidata.filter(item =>
            item?.vendor && item.vendor.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredData(filteredResults);
    }, [search, getapidata]);

        

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${baseurl}/inventories`);

                setgetapi(response.data);
                console.log(response.data)
                setFilteredData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data from the API.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [baseurl,]);




    return (
        <div>


            {loading && (
                <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-opacity-60 z-2 bg-gray-300">
                    <div className="ml-40">
                        <Circles
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />

                    </div>
                </div>
            )}

            {!selectedProduct &&
                <div>
                
                    <div className="w-4/5 mx-auto py-4">
                        <div className="flex items-center justify-between">
                            <div className="relative w-full mr-4">
                                <input
                                    type="text"
                                    name="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search"
                                    className="border rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg
                                        className="w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 15l5-5m0 0l-5-5m5 5H4"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
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
                                        placeholder='ENTER DATE'
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
            }

            <div style={{ maxHeight: '800px', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }} >





                {selectedProduct ? (

                    <ProductDetail product={selectedProduct} onProductSelect={handleProductSelect} />
                ) : (


                    <DataInventory onProductSelect={handleProductSelect} filteredData={filteredData} data={getapidata} setdata={setgetapi} modal={openModal} onEdit={handleEdit} closemodal={closeModal} />
                )}





            </div>

        </div>
    );
};

export default MyComponent;














































































































