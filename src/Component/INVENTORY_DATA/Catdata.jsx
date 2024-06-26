

import React, { useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, Edit, Toggle, Toggleselectedid } from '../Recoil';
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Catdata = ({ item, data, setdata, onEdit, filteredData, setFilteredData, onProductSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [updatedQuantities, setUpdatedQuantities] = useState({});
    
    const baseurl = useRecoilValue(BaseURLState);
    const [narration, setnarration] = useState('');


    const [sta, setstaic] = useState(false)





    // Handle opening the modal for a specific index
    const openModal = (index) => {
        setSelectedIndex(index);
        setIsOpen(true);
        setFilteredData("updated_at")
        setstaic(false)
    };



    const openModals = (index) => {
        setSelectedIndex(index);
        setIsOpen(true);

        setstaic(true)
    };

    // Handle closing the modal and resetting the state
    const closeModal = () => {
        setIsOpen(false);
        // setSelectedIndex(null);
        setUpdatedQuantities({})
    };

    const handleQuantityChange = (index, event, item) => {
        const value = event.target.value;
        if (value <= item.remaining_quantity) {
            setUpdatedQuantities((prev) => ({
                ...prev,
                [index]: value,
            }));
        } else {
            toast.error("Entered quantity exceeds available quantity");
            setUpdatedQuantities((prev) => ({
                ...prev,
                [index]: '',
            }));
        }
    };

    const handleUpdateQuantity = async (index, item) => {
        const quantity = updatedQuantities[index];
        if (!quantity) {
            return;
        }

        try {
            const url = `${baseurl}/inventory/use`;
            await axios.post(url, {
                product_name: item.product_name,
                category: item.category,
                bike_category: item.bike_category,
                color: item.color,
                size: item.size,
                city: item.city,
                HSN_code: item.hsn_code,
                quantity,
                name: narration
            });

            toast.success("Quantity updated successfully");
            setFilteredData((prevData) =>
                prevData.map((dataItem) => {
                    if (dataItem === item) {
                        return { ...dataItem, remaining_quantity: dataItem.remaining_quantity - quantity };
                    }

                    return dataItem;
                })
            );

            closeModal();
        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error("Error updating quantity");
        } finally {

        }
    };

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "30%",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)", // Increased shadow for depth
            backgroundColor: "#f9f9f9", // Light gray for a soft background
            maxHeight: "40vh",
            zIndex: "60"
        },
        overlay: {
            background: "rgba(0, 0, 0, 0.7)", // Slightly darker overlay for more contrast
        },
    };



    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                theme="dark"
            />

            <table className="border-collaspe  border-1 w-full mx-auto   ">
                <thead style={{ position: 'sticky', top: 0, zIndex: 9999 }}>
                    <tr className="bg-[#FFB603] text-[#000000] ">
                        <th className="border px-4 text-center py-2">HSN_Code</th>
                        <th className="border px-4 text-center py-2">Category</th>
                        <th className="border text-center px-4 py-2">Bike</th>
                        <th className="border text-center px-4 py-2">Product</th>
                        <th className="border text-center px-4 py-2">Size</th>
                        <th className="border text-center px-4 py-2">Color</th>
                        <th className="border text-center px-4 py-2">Quantity</th>
                        <th className="border text-center px-4 py-2">City</th>
                        <th className="border text-center px-4 py-2">User</th>
                        <th className="border text-center px-4 py-2">Update_At</th>
                        <th className="border text-center px-4 py-2">Narration</th>
                        {/* <th className="border px-4 py-2 text-center">Actions</th>
                        <th className="border px-4 py-2 text-center">Transfer</th> */}
                    </tr>

                </thead>
                <tbody>
                    {filteredData.map((item, index) => (

                        <tr key={index} className="hover:bg-blue-100/40 text-sm  text-[#000000]  ">
                            <td className="border font-bold text-center  px-4 py-2">{item?.HSN_code}</td>
                            <td className="border font-bold text-center px-4 py-2">{item?.category}</td>
                            <td className="border font-bold text-center px-4 py-2">{item?.bike_category}</td>
                            <td className="border font-bold text-center px-4 py-2">{item?.product_name}</td>
                            <td className="border font-bold text-center px-4 py-2">{item?.size}</td>
                            <td className="border font-bold text-center px-4 py-2">{item?.color}</td>
                            <td className="border font-bold text-center px-4 py-2">{item?.quntity}</td>
                            <td className="border font-bold text-center px-4 py-2">{item?.city}</td>
                            <td className="border font-bold text-center px-4 py-2">{item?.user?.first_name || 'N/A'}</td>



                            <td className="border font-bold text-center px-4 py-2">{item.updated_at.toString().substring(0, 10)}</td>
                            <td className="border font-bold text-center px-4 py-2">{item.name}</td>
                            {/* <td className="border px-4 py-2">
                                <div className="flex justify-center gap-5">
                                  

                                    <button onClick={() => openModal(index)} class="button"> USE
                                    </button>
                                </div>
                            </td> */}



                            {/* 
                            <td className="border px-4 py-2">
                                <div className="flex justify-center gap-5">
                           
                                    <button onClick={() => openModals(index)} class="button"> TRF
                                    </button>
                                </div>
                            </td> */}



                        </tr>
                    ))}
                </tbody>
            </table>

            {
                sta ? <div>

                    <Modal
                        isOpen={isOpen}
                        onRequestClose={closeModal}
                        className="bg-white rounded-lg p-6 w-96 mx-auto mt-20 shadow-lg border border-2 border-black "
                        overlayClassName="fixed inset-0 flex    items-center justify-center "
                        contentLabel="Update Quantity"
                    >
                        {selectedIndex !== null && (
                            <div className='flex-col ' >
                                <div>
                                    <h2 className="text-xl font-bold mb-4 ">coming soon</h2></div>
                                <div className="mb-5 "  > <p> Are you sure to  Trasfer?</p></div>
                                <div className="font-bold text-black"  > <p> Transfer</p></div>
                                <div className="mb-3 " >
                                    <input
                                        type="number"
                                        placeholder='Enter qunatity'
                                        value={updatedQuantities[selectedIndex] || ''}
                                        onChange={(e) => handleQuantityChange(selectedIndex, e, filteredData[selectedIndex])}
                                        className="border rounded-md px-2 py-1 w-full text-center"
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === '+' || e.key === 'e') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </div>



                                <div className="flex justify-between mt-4 ">
                                    <button
                                        onClick={() => handleUpdateQuantity(selectedIndex, filteredData[selectedIndex])}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </Modal>

                </div>
                    :


                    <Modal
                        isOpen={isOpen}
                        onRequestClose={closeModal}
                        className="bg-white rounded-lg p-6 w-96 mx-auto mt-20 shadow-lg   border-2 border-black"
                        overlayClassName="fixed inset-0 flex  border border-2 border-black   items-center justify-center "
                        contentLabel="Update Quantity"
                    >
                        {selectedIndex !== null && (
                            <div className='flex-col ' >
                                <div>
                                    <h2 className="text-xl font-bold mb-4 ">Update Quantity</h2></div>
                                <div className="mb-5 "  > <p> Are you sure to Update Quantity?</p></div>
                                <div className="font-bold text-black"  > <p> Quantity</p></div>
                                <div className="mb-3 " >
                                    <input
                                        type="number"
                                        placeholder='Enter qunatity'
                                        value={updatedQuantities[selectedIndex] || ''}
                                        onChange={(e) => handleQuantityChange(selectedIndex, e, filteredData[selectedIndex])}
                                        className="border rounded-md px-2 py-1 w-full text-center"
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === '+' || e.key === 'e') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </div>

                                <div className="font-bold text-black"  > <p> Narration</p></div>
                                <div className="mb-6 " >
                                    <input
                                        type="text"
                                        required
                                        value={narration}
                                        placeholder='Enter reason'
                                        onChange={(e) => setnarration(e.target.value)}
                                        className="border rounded-md px-2 py-1 w-full text-center"

                                    />
                                </div>


                                <div className="flex justify-between mt-4 ">
                                    <button
                                        onClick={() => handleUpdateQuantity(selectedIndex, filteredData[selectedIndex])}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </Modal>
            }
        </>
    );
};

export default Catdata;
