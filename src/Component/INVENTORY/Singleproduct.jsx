


import React, { useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, Edit, Toggle, Toggleselectedid } from '../Recoil';
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const Singleproduct = ({ item, data, setdata, onEdit, filteredData, onProductSelect, setFilteredData }) => {

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalForProduct, setShowModalForProduct] = useState(null); // State to track modal for each product
    const baseurl = useRecoilValue(BaseURLState);

    const handleDeleteClick = (product_id) => {
        setShowModalForProduct(product_id); // Set the product id for which modal should be opened
    };

    const handleDeletefile = async (product_id) => {
        setLoading(true);
        try {
            let url = `${baseurl}/products/${product_id}`;
            const response = await axios.delete(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (filteredData) {
                const updatedData = filteredData.filter(item => item.product_id !== product_id);
                setFilteredData(updatedData);
                setdata(updatedData);
                alert("Deleted ");
            }

            console.log(response.data); // Assuming the response contains meaningful data

        } catch (error) {
            console.error('Error deleting file:', error);
            // Handle error
        } finally {
            setLoading(false);
            setShowModalForProduct(null); // Reset the state after delete operation
        }
    };

    const handleEditClick = (item) => {
        onEdit(item);
        console.log(item);
    };

    const handleClick = (product) => {
        onProductSelect(product);
    };

    return (

        <div className="mx-auto w-full">


            <table className="border-collapse w-10/12 mx-auto">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border  text-center px-4 py-2">City</th>
                        <th className="border  text-center px-4 py-2">Bike</th>
                        <th className="border  text-center px-4 py-2">Category</th>
                        <th className="border text-center px-4   py-2">Product-Name</th>
                        <th className="border  text-center px-4 py-2">Color</th>
                        <th className="border  text-center px-4 py-2">Size</th>
                        <th className="border  text-center px-4 py-2">Quantity</th>
                        <th className="border px-4  text-center py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="border font-bold text-center px-4 py-4" >{item.city}</td>
                            <td className="border font-bold text-center px-4 py-4" >{item.bike_category}</td>
                            <td className="border font-bold text-center px-4 py-4" >{item.category}</td>
                            <td className="border font-bold  text-center px-4 py-4" >{item.product_name}</td>
                            <td className="border font-bold text-center px-4 py-4">{item.color}</td>
                            <td className="border font-bold text-center px-4 py-4" >{item.size}</td>
                            <td className="border font-bold text-center px-4 py-4" >{item.quantity}</td>

                            <td className="border px-4 py-2">
                                <div className="flex justify-center gap-5">
                                    <button onClick={() => handleEditClick(item)} className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
                                        <FaRegEdit className="h-4 w-4 text-gray-600" />
                                        <span className="sr-only">Edit</span>
                                    </button>
                                    <button onClick={() => handleDeleteClick(item.product_id)} className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
                                        <FaTrashAlt className="h-4 w-4 text-gray-600" />
                                        <span className="sr-only">Delete</span>
                                    </button>
                                </div>

                                <Modal
                                    isOpen={showModalForProduct === item.product_id} // Open modal only for the selected product
                                    onRequestClose={() => setShowModalForProduct(null)}
                                    contentLabel="Delete Confirmation"
                                    className="bg-[#121212] text-white rounded-lg p-4 w-72 mx-auto mt-20"
                                    overlayClassName="fixed inset-0 flex items-center justify-center z-50"
                                >
                                    <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
                                    <p className="text-lg mb-6">Are you sure you want to delete?</p>
                                    <div className="flex justify-center space-x-4">
                                        <button onClick={() => handleDeletefile(item.product_id)} disabled={loading} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                                            {loading ? (
                                                <ThreeDots height={20} width={40} radius={9} color="#4fa94d" ariaLabel="three-dots-loading" visible={true} />
                                            ) : (
                                                "Ok"
                                            )}
                                        </button> 
                                        <button onClick={() => setShowModalForProduct(null)} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                                            Cancel
                                        </button>
                                    </div>
                                </Modal>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>


        </div>
    );
};

export default Singleproduct;
