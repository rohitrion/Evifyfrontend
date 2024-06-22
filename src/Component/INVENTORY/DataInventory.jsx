

import React, { useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, Edit, Toggle, Toggleselectedid } from '../Recoil';
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DataInventory = ({ item, data, setdata, onEdit, filteredData, onProductSelect }) => {

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const baseurl = useRecoilValue(BaseURLState);
    const [showModalForProduct, setShowModalForProduct] = useState(null);

    const handleDeleteClick = (product_id) => {
        setShowModalForProduct(product_id); // Set the product id for which modal should be opened
    };

    const handleDeletefile = async (invoice_id) => {
        setLoading(true);
        try {
            let url = `${baseurl}/inventories/${invoice_id}`;
            const response = await axios.delete(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (data && setdata) {
                const updatedData = data.filter(item => item.invoice_id !== invoice_id);
                setdata(updatedData);
                toast.success('🦄 Deleted!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

            console.log(response.data); // Assuming the response contains meaningful data

        } catch (error) {
            console.error('Error deleting file:', error);
            // Handle error
        } finally {
            setLoading(false);
        }

        setShowModal(false);

    };

    const handleEditClick = (item, id) => {
        onEdit(item);
        console.log(item)

    };

    const cancelLogout = () => {
        setShowModal(false);
        setShowModalForProduct(false)
    };

    const handleClick = (product) => {
        onProductSelect(product);
    };

    return (
        <><ToastContainer />



            {filteredData.length === 0 ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">No Data Found</h2>
                        <p className="text-lg text-gray-600">Create Inventory , to display Data.</p>
                    </div>
                </div>
            ) : (
                <div className="mx-auto w-10/12" style={{ maxHeight: '800px', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', position: "fixed", }}>


                    <table className="border-separate font-sans  border-2 w-11/12 mx-auto  " >
                        <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                            <tr className="bg-[#FFB603] text-[#000000]  ">
                                <th className="border px-4  text-center py-2">Invoice Number</th>
                                <th className="border  text-center px-4 py-2">Vendor</th>
                                <th className="border  text-center px-4 py-2">User</th>
                                <th className="border  text-center px-4 py-2">Last-updated</th>
                                <th className="border px-4  text-center py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index} className="hover:bg-[#8FB7B0] text-sm  text-[#000000]   ">
                                    <td className="border font-bold cursor-pointer text-center px-4 py-2" onClick={() => handleClick(item)}>{item.invoice_number}</td>
                                    <td className="border font-bold cursor-pointer text-center px-4 py-2" onClick={() => handleClick(item)}>{item.vendor}</td>
                                    <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.user?.first_name}</td>
                                    <td className="border font-bold text-center px-4 py-2" >{item.updated_at}</td>
                                    <td className="border px-4 py-2">

                                        <td className=" px-4 py-2 flex justify-center gap-5">
                                            <button onClick={() => handleEditClick(item)} className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
                                                <FaRegEdit className="h-4 w-4 text-[#5D7CF6]" />
                                                <span className="sr-only">Edit</span>
                                            </button>
                                            <button onClick={() => handleDeleteClick(item.invoice_id)} className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
                                                <FaTrashAlt className="h-4 w-4 text-gray-600" />
                                                <span className="sr-only ">Delete</span>
                                            </button>
                                        </td>

                                        <div className="">

                                            <Modal
                                                isOpen={showModalForProduct === item.invoice_id} // Open modal only for the selected product
                                                onRequestClose={() => setShowModalForProduct(null)}

                                                contentLabel="Logout Confirmation"
                                                className="bg-[#121212] text-white rounded-lg p-4 w-72 mx-auto mt-20"
                                                overlayClassName="fixed inset-0 flex items-center justify-center z-50"
                                            >
                                                <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
                                                <p className="text-lg mb-6">Are you sure you want to delete?</p>
                                                <div className="flex justify-center space-x-4">
                                                    <button onClick={() => handleDeletefile(item.invoice_id)} disabled={loading} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                                                        {loading ? (
                                                            <ThreeDots height={20} width={40} radius={9} color="#4fa94d" ariaLabel="three-dots-loading" visible={true} />
                                                        ) : (
                                                            "Ok"
                                                        )}
                                                    </button>
                                                    <button onClick={cancelLogout} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                                                        Cancel
                                                    </button>
                                                </div>
                                            </Modal>
                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>)}
        </>
    );
};

export default DataInventory;
 