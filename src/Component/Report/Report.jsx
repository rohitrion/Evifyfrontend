

import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AuthState, BaseURLState, Toggle, Toggleselectedid } from '../Recoil';
import axios from 'axios';
import Modal from 'react-modal';
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Report_data from './Report_data';
const customStyles = {
    content: {
        top: '50%',
        left: '56%',
        right: 'auto',
        bottom: 'auto',
        // marginRight: '-690%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '50%', // Adjusted width for responsiveness
        width: 'auto', // Set to auto for responsiveness
        maxHeight: '80vh', // Limit height for small screens
        overflow: 'auto', // Enable scrolling if content overflows
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        position: 'relative',

    },
    overlay: {
        background: 'rgba(0,0,0,0.6)'
    }
};

const Report = () => {
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
    const [authState, setauthstate] = useRecoilState(AuthState)



    const [year, setyear] = useState('');
    const [month, setmonth] = useState('');
    const [client, setclient] = useState();
    const [city, setcity] = useState('');






    const [inputFields, setInputFields] = useState({
        year: year,
        client: client,
        city: city,
        month: month,
        fulltime_rider: 0,
        fulltime_order: 0,
        partime_rider: 0,
        partime_order: 0,
        average_rider: 0,
        carry_forward: 0,
        new_join_rider: 0,
        left_rider: 0,
        shift_1: 0,
        shift_1: 0,
        shift_2: 0,
        shift_3: 0,
        shift_4: 0,
        sales_with_gst: 0,
        sales_without_gst: 0,
        payout_with_gst: 0,
        payout_without_gst: 0,
        opening_vehicles: 0,
        vehicles_added: 0,
        vehicles_remove: 0,
        active_vehicle: 0,
        vehicle_deploy: 0,
        vehicle_under_repair: 0
    });





    const openModal = () => {
        setIsOpen(true);
        setInputFields({
            year: '',
            client: '',
            city: '',
            month: '',
            fulltime_order: '',
            partime_rider: '',
            fulltime_rider: '',
            partime_order: '',
            average_rider: '',
            carry_forward: '',
            new_join_rider: '',
            left_rider: '',
            shift_1: '',
            shift_1: '',
            shift_2: '',
            shift_3: '',
            shift_4: '',
            sales_with_gst: '',
            sales_without_gst: '',
            payout_with_gst: '',
            payout_without_gst: '',
            opening_vehicles: '',
            vehicles_added: '',
            vehicles_remove: '',
            invoice_id: '',
            active_vehicle: '',
            invoice_id: '',
            vehicle_deploy: '',
            vehicle_under_repair: ''
        });
        setSelectedInventory(null);
    };




    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };



    const closeModal = () => {
        setIsOpen(false);
        setIsLoading(false);
        setInputFields({
            invoice_number: '',
            invoice_amount: '',
            invoice_date: '',
            inventory_paydate: '',
            vendor: '',
            invoice_image_id: ''
        });

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
            invoice_image_id: inventory.invoice_image_id,
            invoice_id: inventory.invoice_id

        });
        console.log(inventory)
    };



    const handleSubmit = async (e) => {


        e.preventDefault();
        setIsLoading(true);

        // const requiredFields = ['invoice_number', 'invoice_amount', 'invoice_date', 'inventory_paydate', 'vendor'];

        // const hasEmptyRequiredField = requiredFields.some(field => inputFields[field] === '');

        // if (hasEmptyRequiredField) {
        //     toast.error("please fill all the feilds", {
        //         position: 'top-center',
        //         autoClose: 1000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //     })
        //     setIsLoading(false);
        //     return;
        // }



        try {
            // const formData = new FormData(formRef.current);
            const headers = {
                'Authorization': `Bearer ${authState.token}`,
            };




            // if (selectedInventory) {
            //     const response = await axios.patch(`${baseurl}/inventories/${selectedInventory.invoice_id}`, formData, {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     });
            //     console.log('Inventory updated successfully!');
            //     console.log(response.data);
            //     toast.info("Inventory updated successfully", {
            //         position: 'top-center',
            //         autoClose: 1000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //     })
            //     setgetapi(prevData => prevData.map(item => (
            //         item.invoice_id === selectedInventory.invoice_id ? inputFields : item
            //     )));
            // } else {
            const response = await axios.post(`${baseurl}/sales`, inputFields, {
                headers: {
                    ...headers,
                    'Content-Type': 'application/json', // Important for file uploads
                },

            });
            console.log(response.data)
            toast.success("Sales data created successfully", {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })

            setgetapi(prevData => [...prevData, response.data.invoice]);
            console.log('Inventory created successfully!');
            // }

            setError(null);

        } catch (error) {
            console.error('Error:', error);
            toast.error(error)
            // setError('Failed to submit form data. Please try again later.');
        } finally {
            setIsLoading(false);
            closeModal();

        }
    };





    useEffect(() => {

        const filteredResults = getapidata.filter(item =>
            item?.month && item.client.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredData(filteredResults);
    }, [search, getapidata]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${baseurl}/sales`);

                setgetapi(response.data.sales);
                console.log(response.data.sales,"the report data ")
                setFilteredData(response.data.sales);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data from the API.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [baseurl]);


    // console.log(inputFields)

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
                                    placeholder=" 🔍️    Search"
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
                        <h1 className="text-lg font-bold text-purple-400 mb-4">REPORT DETAILS</h1>
                        {/* <form onSubmit={handleSubmit} ref={formRef}>

                            <div className="mb-4    ">
                                <label className="block text-[#000000] text-sm font-bold mb-2" htmlFor="image">
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
                                <label htmlFor="invoice_number" className="block text-[#000000] text-sm font-bold mb-2">Invoice Number:</label>
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
                                <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">INVOICE AMOUNT</label>
                                <div className="relative">
                                    <input
                                        type="number" step="0.01"
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
                                <label htmlFor="invoice_date" className="block text-[#000000] text-sm font-bold mb-2">INVOICE DATE</label>
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
                                <label htmlFor="inventory_paydate" className="block text-[#000000] text-sm font-bold mb-2">INVOICE PAYDATE</label>
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
                                <label htmlFor="vendor" className="block text-[#000000] text-sm font-bold mb-2">VENDOR</label>
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

 */}






                        {/* <form onSubmit={handleSubmit} ref={formRef}>



                            <h3>CLIENT & DATE DETAILS  </h3>


                            <div className='flex  w-max'>


                                <div className="mb-4">
                                    <label htmlFor="vendor" className="block text-black text-bold text-sm font-bold mb-2">Year</label>
                                    <div className="relative">


                                        <select
                                            className="px-4 py-1 mr-2 bg-[#EFEFEF] w-full rounded-lg font-bold  hover:bg-slate-200 transition duration-300 ease-in-out transform hover:scale-105 text-black "
                                        // value={unit}
                                        // onChange={handleUnitChange}
                                        >
                                            <option value="Select">Select </option>
                                            <option value="NOS">NOS </option>
                                            <option value="PACKET">PACKET</option>


                                        </select>


                                    </div>
                                </div>








                                <div className="mb-4">
                                    <label htmlFor="vendor" className="block text-black text-bold text-sm font-bold mb-2">Client</label>
                                    <div className="relative">


                                        <select
                                            className="px-4 py-1 mr-2 bg-[#EFEFEF] w-full rounded-lg font-bold  hover:bg-slate-200 transition duration-300 ease-in-out transform hover:scale-105 text-black "
                                        // value={unit}
                                        // onChange={handleUnitChange}
                                        >
                                            <option value="Select">Select </option>
                                            <option value="NOS">NOS </option>
                                            <option value="PACKET">PACKET</option>


                                        </select>


                                    </div>
                                </div>







                                <div className="mb-4">
                                    <label htmlFor="vendor" className="block text-black text-bold text-sm font-bold mb-2">City</label>
                                    <div className="relative">


                                        <select
                                            className="px-4 py-1 mr-2 bg-[#EFEFEF] w-full rounded-lg font-bold  hover:bg-slate-200 transition duration-300 ease-in-out transform hover:scale-105 text-black "
                                        // value={unit}
                                        // onChange={handleUnitChange}
                                        >
                                            <option value="Select">Select </option>
                                            <option value="NOS">NOS </option>
                                            <option value="PACKET">PACKET</option>


                                        </select>


                                    </div>
                                </div>


                                <div className="mb-4">
                                    <label htmlFor="vendor" className="block text-black text-bold text-sm font-bold mb-2">Month</label>
                                    <div className="relative">


                                        <select
                                            className="px-4 py-1 mr-2 bg-[#EFEFEF] w-full rounded-lg font-bold  hover:bg-slate-200 transition duration-300 ease-in-out transform hover:scale-105 text-black "
                                        // value={unit}
                                        // onChange={handleUnitChange}
                                        >
                                            <option value="Select">Select </option>
                                            <option value="NOS">NOS </option>
                                            <option value="PACKET">PACKET</option>


                                        </select>


                                    </div>
                                </div>






                            </div>



                            <h3>RIDER AND ORDER DETAILS   </h3>

                            <div>
                                <div className='flex'>

                                    <div className="mb-4">
                                        <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">FULL TIME RIDER*
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="invoice_amount"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>



                                    <div className="mb-4">
                                        <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">FULL TIME RIDER*
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="invoice_amount"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>




                                    <div className="mb-4">
                                        <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">FULL TIME ORDER

                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="invoice_amount"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>



                                    <div className="mb-4">
                                        <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">PART TIME RIDER*


                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="invoice_amount"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>



                                    <div className="mb-4">
                                        <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">PART TIME ORDER


                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="invoice_amount"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>

                                </div>


                                <div className='flex'>

                                    <div className="mb-4">
                                        <label htmlFor="AVG_RIDER" className="block text-[#000000] text-sm font-bold mb-2">AVG_RIDER*

                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="AVG_RIDER"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>



                                    <div className="mb-4">
                                        <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">Carry forward

                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="invoice_amount"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>




                                    <div className="mb-4">
                                        <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">NEW JOIN RIDER





                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="invoice_amount"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>



                                    <div className="mb-4">
                                        <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">LEFT RIDER




                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="invoice_amount"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>





                                </div>


                            </div>

                            <h3>SHIFT'S DETAILS   </h3>

                            <div className='flex'>

                                <div className="mb-4">
                                    <label htmlFor="AVG_RIDER" className="block text-[#000000] text-sm font-bold mb-2">Shift-1


                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number" step="0.01"
                                            min={0}
                                            name="AVG_RIDER"
                                            // value={inputFields.invoice_amount}
                                            // onChange={handleChange}
                                            placeholder="Enter FULL TIME RIDER  Amount     "

                                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                        />

                                    </div>
                                </div>



                                <div className="mb-4">
                                    <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">Shift-2


                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number" step="0.01"
                                            min={0}
                                            name="invoice_amount"
                                            // value={inputFields.invoice_amount}
                                            // onChange={handleChange}
                                            placeholder="Enter FULL TIME RIDER  Amount     "

                                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                        />

                                    </div>
                                </div>




                                <div className="mb-4">
                                    <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">Shift-3






                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number" step="0.01"
                                            min={0}
                                            name="invoice_amount"
                                            // value={inputFields.invoice_amount}
                                            // onChange={handleChange}
                                            placeholder="Enter FULL TIME RIDER  Amount     "

                                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                        />

                                    </div>
                                </div>



                                <div className="mb-4">
                                    <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">Shift-4


                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number" step="0.01"
                                            min={0}
                                            name="invoice_amount"
                                            // value={inputFields.invoice_amount}
                                            // onChange={handleChange}
                                            placeholder="Enter FULL TIME RIDER  Amount     "

                                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                        />

                                    </div>
                                </div>

                            </div>

                            <h3> AMOUNT DETAILS  </h3>



                            <div className='flex'>

                                <div className="mb-4">
                                    <label htmlFor="AVG_RIDER" className="block text-[#000000] text-sm font-bold mb-2">SALES WITH GST*



                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number" step="0.01"
                                            min={0}
                                            name="AVG_RIDER"
                                            // value={inputFields.invoice_amount}
                                            // onChange={handleChange}
                                            placeholder="Enter FULL TIME RIDER  Amount     "

                                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                        />

                                    </div>
                                </div>



                                <div className="mb-4">
                                    <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">SALES WITHOUT GST*



                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number" step="0.01"
                                            min={0}
                                            name="invoice_amount"
                                            // value={inputFields.invoice_amount}
                                            // onChange={handleChange}
                                            placeholder="Enter FULL TIME RIDER  Amount     "

                                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                        />

                                    </div>
                                </div>




                                <div className="mb-4">
                                    <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">PAYOUT WITH GST*







                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number" step="0.01"
                                            min={0}
                                            name="invoice_amount"
                                            // value={inputFields.invoice_amount}
                                            // onChange={handleChange}
                                            placeholder="Enter FULL TIME RIDER  Amount     "

                                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                        />

                                    </div>
                                </div>



                                <div className="mb-4">
                                    <label htmlFor="invoice_amount" className="block text-[#000000] text-sm font-bold mb-2">PAYOUT WITHOUT GST*



                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number" step="0.01"
                                            min={0}
                                            name="invoice_amount"
                                            // value={inputFields.invoice_amount}
                                            // onChange={handleChange}
                                            placeholder="Enter FULL TIME RIDER  Amount     "

                                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                        />

                                    </div>
                                </div>

                            </div>

                            <h3> VEHICLES DETAILS  </h3>


                            <div>
                                <div className='flex'>

                                    <div className="mb-4">
                                        <label htmlFor="AVG_RIDER" className="block text-[#000000] text-sm font-bold mb-2">Opening Vehicles


                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="AVG_RIDER"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>



                                    <div className="mb-4">
                                        <label htmlFor="AVG_RIDER" className="block text-[#000000] text-sm font-bold mb-2">Vehicles Added


                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="AVG_RIDER"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>




                                    <div className="mb-4">
                                        <label htmlFor="AVG_RIDER" className="block text-[#000000] text-sm font-bold mb-2">Vehicles remove



                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="AVG_RIDER"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>

                                </div>


                                <div className='flex'>

                                    <div className="mb-4">
                                        <label htmlFor="AVG_RIDER" className="block text-[#000000] text-sm font-bold mb-2">Active Vehicles



                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="AVG_RIDER"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>



                                    <div className="mb-4">
                                        <label htmlFor="AVG_RIDER" className="block text-[#000000] text-sm font-bold mb-2">Vehicle Deployee



                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="AVG_RIDER"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>




                                    <div className="mb-4">
                                        <label htmlFor="AVG_RIDER" className="block text-[#000000] text-sm font-bold mb-2">Vehicles Under Repair


                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                min={0}
                                                name="AVG_RIDER"
                                                // value={inputFields.invoice_amount}
                                                // onChange={handleChange}
                                                placeholder="Enter FULL TIME RIDER  Amount     "

                                                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />

                                        </div>
                                    </div>

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

                        </form> */}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h3 className="text-lg font-bold  text-[#000000] mb-4">CLIENT & DATE DETAILS</h3>
                            <div className="flex flex-wrap -mx-2 border-black border-2 rounded p-6">
                                <div className="w-1/4 px-2 mb-4">
                                    <label htmlFor="year" className="block text-[#000000] font-bold mb-2">
                                        Year
                                    </label>
                                    <div className="relative">
                                        <select

                                            id="year"
                                            name="year"
                                            className="w-full px-4 py-2 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={inputFields.year}
                                            onChange={handleChange}
                                        >
                                            <option value="Select">Select</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                            <option value="2028">2028</option>
                                            <option value="2029">2029</option>
                                            <option value="2030">2030</option>

                                        </select>
                                    </div>
                                </div>

                                <div className="w-1/4 px-2 mb-4">
                                    <label htmlFor="client" className="block text-[#000000] font-bold mb-2">
                                        CLIENT
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="client"
                                            name="client"
                                            className="w-full px-4 py-2 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={inputFields.client}
                                            onChange={handleChange}
                                        >
                                            <option value="Select">Select</option>

                                            <option value="Bigbasket">Bigbasket</option>
                                            <option value="BB Now"> BB Now </option>
                                            <option value="Bluedart">Bluedart</option>
                                            <option value="E-Com ">E-Com </option>
                                            <option value="Flipkart">Flipkart</option>
                                            <option value="Swiggy">Swiggy</option>
                                            <option value="Blinkit">Blinkit</option>
                                            <option value="Uptown Fresh"> Uptown Fresh</option>
                                            <option value="Zomato">Zomato</option>

                                        </select>
                                    </div>
                                </div>

                                <div className="w-1/4 px-2 mb-4">
                                    <label htmlFor="city" className="block text-[#000000] font-bold mb-2">
                                        CITY

                                    </label>
                                    <div className="relative">
                                        <select
                                            id="city"
                                            name="city"
                                            className="w-full px-4 py-2 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={inputFields.city}
                                            onChange={handleChange}
                                        >
                                            <option value="Select">Select</option>
                                            <option value="Surat">Surat</option>
                                            <option value="Vadodara">Vadodara</option>
                                            <option value="Ahmedabad">Ahmedabad</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="w-1/4 px-2 mb-4">
                                    <label htmlFor="month*
                               " className="block text-[#000000] font-bold mb-2">
                                        MONTH


                                    </label>
                                    <div className="relative">
                                        <select
                                            id="month"
                                            name="month"
                                            className="w-full px-4 py-2 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={inputFields.month}
                                            onChange={handleChange}
                                        >
                                            <option value="Select">Select</option>
                                            <option value="Jan">January</option>
                                            <option value="Feb">February</option>
                                            <option value="Mar">March</option>
                                            <option value="Apr">April</option>
                                            <option value="May">May</option>
                                            <option value="Jun">June</option>
                                            <option value="Jul">July</option>
                                            <option value="Aug">August</option>
                                            <option value="Sep">September</option>
                                            <option value="Oct">October</option>
                                            <option value="Nov">November</option>
                                            <option value="Dec">December</option>
                                        </select>
                                    </div>
                                </div>


                                {/* Repeat the same structure for Client, City, and Month */}
                            </div>

                            <h3 className="text-lg font-bold text-[#000000] mb-4">RIDER AND ORDER DETAILS</h3>
                            <div className=' border-black border-2 p-6 rounded'>
                                <div className="flex flex-wrap -mx-2  my-4 ">
                                    {/* Repeat the input field structure for AVG_RIDER, Carry forward, NEW JOIN RIDER, and LEFT RIDER */}
                                    <div className="w-1/4 px-2 mb-4">
                                        <label htmlFor="avg-rider" className="block text-[#000000] font-bold mb-2">
                                            FULL TIME RIDER

                                        </label>
                                        <input
                                            id="fulltime_rider       "

                                            name="fulltime_rider"
                                            value={inputFields.fulltime_rider}
                                            onChange={handleChange}
                                            type="number"
                                            step="0.01"
                                            min={0}
                                            placeholder="Enter AVG_RIDER Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="w-1/4 px-2 mb-4">
                                        <label htmlFor="fulltime_order" className="block text-[#000000] font-bold mb-2">
                                            FULL TIME ORDER

                                        </label>
                                        <input
                                            id="fulltime_rider"
                                            type="number"
                                            step="0.01"
                                            min={0}
                                            name="fulltime_order"
                                            value={inputFields.fulltime_order}
                                            onChange={handleChange}
                                            placeholder="Enter AVG_RIDER Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="w-1/4 px-2 mb-4">
                                        <label htmlFor="partime_rider" className="block text-[#000000] font-bold mb-2">
                                            PART TIME RIDER

                                        </label>
                                        <input
                                            id="partime_rider"
                                            type="number"
                                            step="0.01"
                                            name="partime_rider"
                                            value={inputFields.partime_rider}
                                            onChange={handleChange}
                                            min={0}
                                            placeholder="Enter partime_rider Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="w-1/4 px-2 mb-4">
                                        <label htmlFor="partime_order" className="block text-[#000000] font-bold mb-2">
                                            PART TIME ORDER

                                        </label>
                                        <input
                                            id="partime_order"
                                            type="number"
                                            step="0.01"
                                            name="partime_order"
                                            value={inputFields.partime_order}
                                            onChange={handleChange}
                                            min={0}
                                            placeholder="Enter partime_order Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>



                                <div className="flex flex-wrap -mx-2">
                                    {/* AVG_RIDER */}
                                    <div className="w-1/4 px-2 mb-4">
                                        <label htmlFor="average_rider" className="block text-[#000000] font-bold mb-2">
                                            AVG RIDER
                                        </label>
                                        <input
                                            id="average_rider"
                                            type="number"
                                            name="average_rider"
                                            value={inputFields.average_rider}
                                            onChange={handleChange}
                                            step="0.01"
                                            min={0}
                                            placeholder="Enter AVG RIDER Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Carry forward */}
                                    <div className="w-1/4 px-2 mb-4">
                                        <label htmlFor="carry_forward" className="block text-[#000000] font-bold mb-2">
                                            Carry forward
                                        </label>
                                        <input
                                            id="carry_forward"
                                            type="number"
                                            name="carry_forward"
                                            value={inputFields.carry_forward}
                                            onChange={handleChange}
                                            step="0.01"
                                            min={0}
                                            placeholder="Enter Carry forward Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* NEW JOIN RIDER */}
                                    <div className="w-1/4 px-2 mb-4">
                                        <label htmlFor="new_join_rider" className="block text-[#000000] font-bold mb-2">
                                            NEW JOIN RIDER
                                        </label>
                                        <input
                                            id="new_join_rider"
                                            type="number"
                                            name="new_join_rider"
                                            value={inputFields.new_join_rider}
                                            onChange={handleChange}
                                            step="0.01"
                                            min={0}
                                            placeholder="Enter NEW JOIN RIDER Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* LEFT RIDER */}
                                    <div className="w-1/4 px-2 mb-4">
                                        <label htmlFor="left_rider" className="block text-[#000000] font-bold mb-2">
                                            LEFT RIDER
                                        </label>
                                        <input
                                            id="left_rider"
                                            type="number"
                                            step="0.01"
                                            name="left_rider"
                                            value={inputFields.left_rider}
                                            onChange={handleChange}
                                            min={0}
                                            placeholder="Enter LEFT RIDER Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-[#000000]  mb-4">SHIFT'S DETAILS</h3>
                            <div className="flex flex-wrap -mx-2  border-black border-2 p-6">
                                {/* Repeat the input field structure for Shift-1, Shift-2, Shift-3, and Shift-4 */}
                                <div className="w-1/4 px-2 mb-4">
                                    <label htmlFor="shift_1" className="block text-[#000000] font-bold mb-2">
                                        Shift-1
                                    </label>
                                    <input
                                        id="shift_1"
                                        type="number"
                                        name="shift_1"
                                        value={inputFields.shift_1}
                                        onChange={handleChange}
                                        step="0.01"
                                        min={0}
                                        placeholder="Enter Shift-1 Amount"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="w-1/4 px-2 mb-4">
                                    <label htmlFor="shift_2" className="block text-[#000000] font-bold mb-2">
                                        Shift-2
                                    </label>
                                    <input
                                        id="shift_2"
                                        type="number"
                                        step="0.01"
                                        name="shift_2"
                                        value={inputFields.shift_2}
                                        onChange={handleChange}
                                        min={0}
                                        placeholder="Enter Shift-1 Amount"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="w-1/4 px-2 mb-4">
                                    <label htmlFor="shift_3-1" className="block text-[#000000] font-bold mb-2">
                                        Shift-3
                                    </label>
                                    <input
                                        id="shift_3"
                                        type="number"
                                        step="0.01"
                                        name="shift_3"
                                        value={inputFields.shift_3}
                                        onChange={handleChange}
                                        min={0}
                                        placeholder="Enter Shift-3 Amount"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="w-1/4 px-2 mb-4">
                                    <label htmlFor="shift_4" className="block text-[#000000] font-bold mb-2">
                                        Shift-4
                                    </label>
                                    <input
                                        id="shift_4"
                                        type="number"
                                        step="0.01"
                                        name="shift_4"
                                        value={inputFields.shift_4}
                                        onChange={handleChange}
                                        min={0}
                                        placeholder="Enter Shift-4 Amount"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-[#000000] mb-4">AMOUNT DETAILS</h3>
                            <div className="flex flex-wrap -mx-2  border-black border-2 p-6">
                                {/* Repeat the input field structure for SALES WITH GST, SALES WITHOUT GST, PAYOUT WITH GST, and PAYOUT WITHOUT GST */}
                                <div className="w-1/4 px-2 mb-4">
                                    <label htmlFor="sales_with_gst" className="block text-[#000000] font-bold mb-2">
                                        SALES WITH GST

                                    </label>
                                    <input
                                        id="sales_with_gst"
                                        type="number"
                                        step="0.01"
                                        name="sales_with_gst"
                                        value={inputFields.sales_with_gst}
                                        onChange={handleChange}
                                        min={0}
                                        placeholder="Enter SALES WITH GST Amount"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="w-1/4 px-2 mb-4">
                                    <label htmlFor="sales_without_gst" className="block text-[#000000] font-bold mb-2">
                                        SALES WITHOUT GST

                                    </label>
                                    <input
                                        id="sales_without_gst"
                                        type="number"
                                        step="0.01"
                                        name="sales_without_gst"
                                        value={inputFields.sales_without_gst}
                                        onChange={handleChange}
                                        min={0}
                                        placeholder="Enter Sales Without GST Amount"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="w-1/4 px-2 mb-4">
                                    <label htmlFor="payout_with_gst" className="block text-[#000000] font-bold mb-2">
                                        PAYOUT WITH GST

                                    </label>
                                    <input
                                        id="payout_with_gst"
                                        type="number"
                                        step="0.01"
                                        name="payout_with_gst"
                                        value={inputFields.payout_with_gst}
                                        onChange={handleChange}
                                        min={0}
                                        placeholder="Enter Payout WITH GST Amount"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="w-1/4 px-2 mb-4">
                                    <label htmlFor="payout_without_gst" className="block text-[#000000] font-bold mb-2">
                                        PAYOUT WITHOUT GST

                                    </label>
                                    <input
                                        id="payout_without_gst"
                                        type="number"
                                        name="payout_without_gst"
                                        value={inputFields.payout_without_gst}
                                        onChange={handleChange}
                                        step="0.01"
                                        min={0}
                                        placeholder="Enter Pay Without GST Amount"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-[#000000]  mb-4">VEHICLES DETAILS</h3>

                            <div className=' border-black border-2 p-6'>
                                <div className="flex flex-wrap -mx-2 my-4">
                                    {/* Repeat the input field structure for Opening Vehicles, Vehicles Added, Vehicles Remove, Active Vehicles, Vehicle Deployee, and Vehicles Under Repair */}
                                    <div className="w-1/3 px-2 mb-4">
                                        <label htmlFor="opening_vehicles" className="block text-[#000000] font-bold mb-2">
                                            Opening Vehicles
                                        </label>
                                        <input
                                            id="opening-vehicles"
                                            type="number"
                                            step="0.01"
                                            name="opening_vehicles"
                                            value={inputFields.opening_vehicles}
                                            onChange={handleChange}
                                            min={0}
                                            placeholder="Enter Opening Vehicles Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="w-1/3 px-2 mb-4">
                                        <label htmlFor="vehicles_added" className="block text-[#000000] font-bold mb-2">
                                            Vehicles Added

                                        </label>
                                        <input
                                            id="vehicles_added"
                                            type="number"
                                            name="vehicles_added"
                                            value={inputFields.vehicles_added}
                                            onChange={handleChange}
                                            step="0.01"
                                            min={0}
                                            placeholder="Enter  Vehicles Added Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="w-1/3 px-2 mb-4">
                                        <label htmlFor="vehicles_remove" className="block text-[#000000] font-bold mb-2">
                                            Vehicles remove

                                        </label>
                                        <input
                                            id="vehicles_remove"
                                            type="number"
                                            step="0.01"
                                            name="vehicles_remove"
                                            value={inputFields.vehicles_remove}
                                            onChange={handleChange}
                                            min={0}
                                            placeholder="Enter   Vehicles remove Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-2">
                                    {/* Repeat the input field structure for Opening Vehicles, Vehicles Added, Vehicles Remove, Active Vehicles, Vehicle Deployee, and Vehicles Under Repair */}
                                    <div className="w-1/3 px-2 mb-4">
                                        <label htmlFor="active_vehicle" className="block text-[#000000] font-bold mb-2">
                                            Active Vehicles

                                        </label>
                                        <input
                                            id="active_vehicle"
                                            type="number"
                                            name="active_vehicle"
                                            value={inputFields.active_vehicle}
                                            onChange={handleChange}
                                            step="0.01"
                                            min={0}
                                            placeholder="Enter  Active Vehicles Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="w-1/3 px-2 mb-4">
                                        <label htmlFor="vehicle_deploy" className="block text-[#000000] font-bold mb-2">
                                            Vehicle Deployee

                                        </label>
                                        <input
                                            id="vehicle_deploy"
                                            type="number"
                                            step="0.01"
                                            name="vehicle_deploy"
                                            value={inputFields.vehicle_deploy}
                                            onChange={handleChange}
                                            min={0}
                                            placeholder="Enter    Vehicle Deployee Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="w-1/3 px-2 mb-4">
                                        <label htmlFor="vehicle_under_repair" className="block text-[#000000] font-bold mb-2">
                                            Vehicles Under Repair

                                        </label>
                                        <input
                                            id="vehicle_under_repair"
                                            type="number"
                                            name="vehicle_under_repair"
                                            value={inputFields.vehicle_under_repair}
                                            onChange={handleChange}
                                            step="0.01"
                                            min={0}
                                            placeholder="Enter  Vehicles Under Repair Amount"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {isLoading ? 'Submitting...' : 'Submit'}
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Close
                                </button>
                            </div>
                        </form>


                    </Modal>


                </div>
            }

            {/* <div  >


                {selectedProduct ? (

                    <ProductDetail product={selectedProduct} onProductSelect={handleProductSelect} />
                ) : ( */}

            <Report_data onProductSelect={handleProductSelect} filteredData={filteredData} data={getapidata} setdata={setgetapi} modal={openModal} onEdit={handleEdit} closemodal={closeModal} />

            {/* )}


            </div> */}

        </div>
    );
};

export default Report;













































































































