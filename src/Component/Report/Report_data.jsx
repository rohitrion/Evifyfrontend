
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
const Report_data = ({ item, data, setdata, onEdit, filteredData, onProductSelect }) => {

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const baseurl = useRecoilValue(BaseURLState);
    const [showModalForProduct, setShowModalForProduct] = useState(null);

    const handleDeleteClick = (product_id) => {
        setShowModalForProduct(product_id); // Set the product id for which modal should be opened
    };

    const handleDeletefile = async (id) => {
        setLoading(true);
        try {
            let url = `${baseurl}/sales/${id}`;
            const response = await axios.delete(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (data && setdata) {
                const updatedData = data.filter(item => item.id !== id);
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
            setShowModal(false);
            setShowModalForProduct(false)
        }



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

            <div className="mx-auto pl-4 w-10/12" style={{ maxHeight: '800px', overflowX: 'scroll', scrollbarWidth: '1', position: "fixed", }}>


                <table className="border-collapse font-sans  border-2 w-11/12 mx-auto  " >
                    <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        <tr className="bg-[#FFB603] text-[#000000]  ">
                            <th className="border px-4  text-center py-2">year</th>
                            <th className="border px-4  text-center py-2">Month</th>
                            <th className="border px-4  text-center py-2">city</th>
                            <th className="border px-4  text-center py-2">client</th>

                            <th className="border px-4  text-center py-2">fulltime_rider</th>
                            <th className="border px-4  text-center py-2">fulltime_order</th>
                            <th className="border px-4  text-center py-2">partime_rider</th>
                            <th className="border px-4  text-center py-2">partime_order</th>


                            <th className="border px-4  text-center py-2">shift_1</th>
                            <th className="border px-4  text-center py-2">shift_2</th>
                            <th className="border px-4  text-center py-2">shift_3</th>
                            <th className="border px-4  text-center py-2">shift_4</th>

                            <th className="border  text-center px-4 py-2">Average_Rider</th>
                            <th className="border px-4  text-center py-2">Carry_Forward</th>
                            <th className="border px-4  text-center py-2">left_rider</th>
                            <th className="border px-4  text-center py-2">New_Join_Rider</th>


                            <th className="border  text-center px-4 py-2">Sales_with_gst</th>
                            <th className="border px-4  text-center py-2">sales_without_gst</th>

                            <th className="border px-4  text-center py-2">payout_with_gst</th>
                            <th className="border px-4  text-center py-2">payout_without_gst</th>

                            <th className="border px-4  text-center py-2">opening_vehicles</th>
                            <th className="border px-4  text-center py-2">vehicles_added</th>
                            <th className="border px-4  text-center py-2">vehicles_remove</th>
                            <th className="border px-4  text-center py-2">active_vehicles</th>
                            <th className="border  text-center px-4 py-2">Vehicle_Deploy</th>
                            <th className="border px-4  text-center py-2">Vehicle_under_repair</th>

                            <th className="border px-4  text-center py-2">bike_kilometer_run</th>
                            <th className="border px-4  text-center py-2">co2_emission</th>
                            <th className="border px-4  text-center py-2">battery_run_count</th>

                            <th className="border px-4  text-center py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index} className="hover:bg-[#8FB7B0] text-sm  text-[#000000]   ">

                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.year}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.month}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.city}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.client}</td>

                                <td className="border font-bold cursor-pointer text-center px-4 py-2" >{item.fulltime_rider}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.fulltime_order}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.partime_rider}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.partime_order}</td>

                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.shift_1}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2" >{item.shift_2}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.shift_3}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.shift_4}</td>

                                <td className="border font-bold cursor-pointer text-center px-4 py-2" >{item.average_rider}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.carry_forward}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.left_rider}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.new_join_rider}</td>

                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.sales_with_gst}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.sales_without_gst}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.payout_with_gst}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.payout_without_gst}</td>

                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.opening_vehicles}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.vehicles_added}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.vehicles_remove}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.active_vehicles}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.vehicle_deploy}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.vehicle_under_repair}</td>

                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.bike_kilometer_run}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.co2_emission}</td>
                                <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.battery_run_count}</td>
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
                                                <button onClick={() => handleDeletefile(item.id)} disabled={loading} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
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


            </div>
        </>
    );
};

export default Report_data;
