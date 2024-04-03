




import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, Edit } from '../Recoil';
const DataInventory = ({ item, data, setdata, modal }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [loading, setloading] = useState(false)
    const [showModal, setShowModal] = useState(false);


    const[edit,setedit]=useRecoilState(Edit)

    const baseurl = useRecoilValue(BaseURLState);
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };







    const handleDeletefile = async (invoice_id) => {
        setloading(true);
        try {

            let url = `${baseurl}/inventories/${invoice_id}`
            const response = await axios.delete(url, {
                headers: {

                    'Content-Type': 'application/json'
                }
            });

            if (data && setdata) {

                const filteredData = data.filter(item => item.invoice_id !== invoice_id);
                setdata(filteredData);
                alert("Deleted ")
            }


            console.log(response.data); // Assuming the response contains meaningful data


        } catch (error) {
            console.error('Error deleting file:', error);

            // Handle error
        } finally {
            setloading(false)
        }

        setShowModal(false);
        setShowOptions(false)
    };



    function handleDelete() {

        setShowModal(true);

    }


    function handleUpdate(item) {
        modal(item)
    }


    const cancelLogout = () => {
        setShowModal(false);
        setShowOptions(false)
    };



    // useEffect(()=>{
    //     setTimeout(() => {
    //         setShowOptions(false)
    //     },6000);
    // },[showOptions])



    return (

        <div className="mx-auto flex justify-center">
            <div className="border w-4/5 rounded p-4 m-4 flex items-center shadow-lg hover:bg-gray-200 justify-between relative">
                <div className="flex flex-col">
                    <p className="text-xs text-gray-500 mb-1">Invoice Number</p>
                    <p className="text-lg font-semibold">{item.invoice_number}</p>

                    {/* <p className="text-xs text-gray-500 mb-1">Invoice date</p>
                    <p className="text-lg font-semibold">{item.invoice_date}</p> */}
                </div>
                <div className="flex flex-col" style={{ minWidth: '120px' }}>
                    <p className="text-xs text-gray-500 mb-1">Vendor</p>
                    <p className="text-lg font-semibold">{item.vendor}</p>
                    {/* <p className="text-xs text-gray-500 mb-1">Paydate</p>
                    <p className="text-lg font-semibold">{item.inventory_paydate}</p> */}
                </div>
                <div className="relative">
                    <button onClick={toggleOptions}>

                        <BsThreeDotsVertical className='text-[20px]  mb-6 ' />
                    </button>
                    {showOptions && (


                        <div className="absolute top-12 right-0 bg-white border rounded-lg p-2 shadow-md">
                            <button className="block w-full py-2 text-left hover:bg-gray-100 transition duration-300 ease-in-out">
                                <span className="flex items-center space-x-2">
                                    <span className="text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6 4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1H6zm2 2h4v2H8V6zm-2 4h8v2H6V10zm0 4h4v2H6v-2z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <span onClick={() => handleUpdate(item)} >Edit</span>
                                </span>
                            </button>
                            <button className="block w-full py-2 text-left hover:bg-gray-100 transition duration-300 ease-in-out">
                                <span className="flex items-center space-x-2">
                                    <span className="text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 3a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1H5zm10 2H5v12h10V5zm-6 4h2v4H9V9zm0 6h2v2H9v-2z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <span onClick={() => handleDelete()} >Delete</span>
                                </span>
                            </button>
                            <Modal
                                isOpen={showModal}
                                onRequestClose={cancelLogout}
                                contentLabel="Logout Confirmation"
                                className="bg-[#121212] text-white rounded-lg p-4 w-72 mx-auto mt-20"
                                overlayClassName="fixed inset-0 flex items-center justify-center z-50"
                            >
                                <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
                                <p className="text-lg mb-6">Are you sure you want to Delete?</p>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={() => handleDeletefile(item.invoice_id)} disabled={loading}
                                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                                    >


                                        {loading ? (
                                            <ThreeDots
                                                height="20"
                                                width="40"
                                                radius="9"
                                                color="#4fa94d"
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                wrapperClassName=""
                                                visible={true}
                                            />
                                        ) : (
                                            "Ok"
                                        )}


                                    </button>

                                    <button
                                        onClick={cancelLogout}
                                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Modal>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default DataInventory;
