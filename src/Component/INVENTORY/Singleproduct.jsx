


// import React, { useState } from 'react';
// import { BsThreeDotsVertical } from "react-icons/bs";
// import Modal from "react-modal";
// import { ThreeDots } from "react-loader-spinner";
// import axios from "axios";
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { BaseURLState, Edit, Toggle, Toggleselectedid } from '../Recoil';
// import { FaRegEdit } from "react-icons/fa";
// import { FaTrashAlt } from "react-icons/fa";

// const Singleproduct = ({ item, data, setdata, onEdit, filteredData, onProductSelect, setFilteredData }) => {

//     const [loading, setLoading] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [showModalForProduct, setShowModalForProduct] = useState(null); // State to track modal for each product
//     const baseurl = useRecoilValue(BaseURLState);

//     const handleDeleteClick = (product_id) => {
//         setShowModalForProduct(product_id); // Set the product id for which modal should be opened
//     };

//     const handleDeletefile = async (product_id) => {
//         setLoading(true);
//         try {
//             let url = `${baseurl}/products/${product_id}`;
//             const response = await axios.delete(url, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (filteredData) {
//                 const updatedData = filteredData.filter(item => item.product_id !== product_id);
//                 setFilteredData(updatedData);
//                 setdata(updatedData);
//                 alert("Deleted ");
//             }

//             console.log(response.data); // Assuming the response contains meaningful data

//         } catch (error) {
//             console.error('Error deleting file:', error);
//             // Handle error
//         } finally {
//             setLoading(false);
//             setShowModalForProduct(null); // Reset the state after delete operation
//         }
//     };

//     const handleEditClick = (item) => {
//         onEdit(item);
//         console.log(item);
//     };

//     const handleClick = (product) => {
//         onProductSelect(product);
//     };

//     return (

//         <div className="mx-auto w-full  " >

//             <div className="overflow-hidden no-scrollbar">
//                 <table className="border-collapse w-10/12 mx-auto"  >
//                     <thead>
//                         <tr className="bg-gray-200">
//                             <th className="border  text-center px-4 py-2">City</th>
//                             <th className="border  text-center px-4 py-2">Bike</th>
//                             <th className="border  text-center px-4 py-2">Category</th>
//                             <th className="border text-center px-4   py-2">Product-Name</th>
//                             <th className="border  text-center px-4 py-2">Color</th>
//                             <th className="border  text-center px-4 py-2">Size</th>
//                             <th className="border  text-center px-4 py-2">Quantity</th>
//                             <th className="border px-4  text-center py-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody   >
//                         {filteredData.map((item, index) => (
//                             <tr key={index} className="hover:bg-gray-100"    >
//                                 <td className="border font-bold text-center px-4 py-4" >{item.city}</td>
//                                 <td className="border font-bold text-center px-4 py-4" >{item.bike_category}</td>
//                                 <td className="border font-bold text-center px-4 py-4" >{item.category}</td>
//                                 <td className="border font-bold  text-center px-4 py-4" >{item.product_name}</td>
//                                 <td className="border font-bold text-center px-4 py-4">{item.color}</td>
//                                 <td className="border font-bold text-center px-4 py-4" >{item.size}</td>
//                                 <td className="border font-bold text-center px-4 py-4" >{item.quantity}</td>

//                                 <td className="border px-4 py-2 " >
//                                     <div className="flex justify-center gap-5">
//                                         <button onClick={() => handleEditClick(item)} className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
//                                             <FaRegEdit className="h-4 w-4 text-gray-600" />
//                                             <span className="sr-only">Edit</span>
//                                         </button>
//                                         <button onClick={() => handleDeleteClick(item.product_id)} className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
//                                             <FaTrashAlt className="h-4 w-4 text-gray-600" />
//                                             <span className="sr-only">Delete</span>
//                                         </button>
//                                     </div>

//                                     <Modal
//                                         isOpen={showModalForProduct === item.product_id} // Open modal only for the selected product
//                                         onRequestClose={() => setShowModalForProduct(null)}
//                                         contentLabel="Delete Confirmation"
//                                         className="bg-[#121212] text-white rounded-lg p-4 w-72 mx-auto mt-20"
//                                         overlayClassName="fixed inset-0 flex items-center justify-center z-50"
//                                     >
//                                         <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
//                                         <p className="text-lg mb-6">Are you sure you want to delete?</p>
//                                         <div className="flex justify-center space-x-4">
//                                             <button onClick={() => handleDeletefile(item.product_id)} disabled={loading} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
//                                                 {loading ? (
//                                                     <ThreeDots height={20} width={40} radius={9} color="#4fa94d" ariaLabel="three-dots-loading" visible={true} />
//                                                 ) : (
//                                                     "Ok"
//                                                 )}
//                                             </button>
//                                             <button onClick={() => setShowModalForProduct(null)} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     </Modal>
//                                 </td>
//                             </tr>

//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     );
// };

// export default Singleproduct;









// import React, { useState } from 'react';
// import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
// import Modal from 'react-modal';
// import { ThreeDots } from 'react-loader-spinner';
// import axios from 'axios';
// import { useRecoilValue } from 'recoil';
// import { BaseURLState } from '../Recoil';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';
// const Singleproduct = ({ filteredData, setData, setFilteredData, onEdit }) => {
//     const [loading, setLoading] = useState(false);
//     const [showModalForProduct, setShowModalForProduct] = useState(null);
//     const baseurl = useRecoilValue(BaseURLState);

//     const handleDeleteClick = (product_id) => {
//         setShowModalForProduct(product_id);
//     };

//     const handleDeletefile = async (product_id) => {
//         setLoading(true);
//         try {
//             const url = `${baseurl}/products/${product_id}`;
//             await axios.delete(url);
//             const updatedData = filteredData.filter((item) => item.product_id !== product_id);
//             setFilteredData(updatedData);
//             setData(updatedData);
//             setShowModalForProduct(null);
//             toast.success('Product deleted successfully!');
//         }

//         catch (error) {
//             console.error('Error deleting file:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEditClick = (item) => {
//         onEdit(item);
//     };

//     return (


//         <>
//             <div
//                 className="fixed overflow-auto border-collapse  top-40 mt-10  w-10/12 mx-auto  " // Fixed position with overflow scroll
//                 style={{ maxHeight: '700px', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Optional: set a specific height and enable vertical scrolling
//             >
//                 <ToastContainer/>
//                 <table className="border-separate font-sans  border-2 w-11/12 mx-auto  mt-10   ">
//                     <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
//                         <tr className="bg-[#FFB603]">

//                             <th className="border  text-center px-4 py-2">City</th>
//                             <th className="border  text-center px-4 py-2">Bike</th>
//                             <th className="border  text-center px-4 py-2">Category</th>
//                             <th className="border text-center px-4   py-2">Product_Name</th>
//                             <th className="border  text-center px-4 py-2">Color</th>
//                             <th className="border  text-center px-4 py-2">Size</th>
//                             <th className="border  text-center px-4 py-2">User</th>
//                             <th className="border  text-center px-4 py-2">Hsn</th>
//                             <th className="border  text-center px-4 py-2">Unit</th>
//                             <th className="border  text-center px-4 py-2">Quantity</th>
//                             <th className="border  text-center px-4 py-2">Amount</th>
//                             <th className="border px-4  text-center py-2">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {filteredData.map((item, index) => (
//                             <tr key={index} className="hover:bg-[#8FB7B0]" >
//                                 <td className="border font-bold text-center px-4 py-4" >{item.city}</td>
//                                 <td className="border font-bold text-center px-4 py-4" >{item.bike_category}</td>
//                                 <td className="border font-bold text-center px-4 py-4" >{item.category}</td>
//                                 <td className="border font-bold  text-center px-2 py-4" >{item.product_name}</td>
//                                 <td className="border font-bold text-center px-4 py-4">{item.color}</td>
//                                 <td className="border font-bold text-center px-4 py-4" >{item.size}</td>
//                                 <td className="border font-bold text-center px-4 py-4" >{item.user?.first_name}</td>
//                                 <td className="border font-bold text-center px-4 py-4" >{item.HSN_code}</td>
//                                 <td className="border font-bold text-center px-4 py-4" >{item.unit}</td>
//                                 <td className="border font-bold text-center px-4 py-4" >{item.quantity}</td>
//                                 <td className="border font-bold text-center px-4 py-4" >{item.amount}</td>

//                                 <td className="border px-6 py-2">
//                                     <div className="flex justify-center gap-5">
//                                         <button onClick={() => handleEditClick(item)} className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
//                                             <FaRegEdit className="h-4 w-4 text-gray-600" />
//                                             <span className="sr-only">Edit</span>
//                                         </button>
//                                         <button onClick={() => handleDeleteClick(item.product_id)} className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
//                                             <FaTrashAlt className="h-4 w-4 text-[#5D7CF6]" />
//                                             <span className="sr-only">Delete</span>
//                                         </button>
//                                     </div>

//                                     <Modal
//                                         isOpen={showModalForProduct === item.product_id}

//                                         onRequestClose={() => setShowModalForProduct(null)}
//                                         contentLabel="Delete Confirmation"
//                                         className="bg-[#121212] text-white rounded-lg p-4 w-72 mx-auto mt-20"
//                                         overlayClassName="fixed inset-0 flex items-center justify-center z-50"
//                                     >
//                                         <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
//                                         <p className="text-lg mb-6">Are you sure you want to delete?</p>
//                                         <div className="flex justify-center space-x-4">
//                                             <button onClick={() => handleDeletefile(item.product_id)} disabled={loading} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
//                                                 {loading ? (
//                                                     <ThreeDots height={20} width={40} radius={9} color="#4fa94d" ariaLabel="three-dots-loading" visible={true} />
//                                                 ) : (
//                                                     "Ok"
//                                                 )}
//                                             </button>
//                                             <button onClick={() => setShowModalForProduct(null)} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     </Modal>
//                                 </td>
//                             </tr>

//                         ))}
//                     </tbody>
//                 </table>
//                 <ToastContainer />
//             </div>
//         </>
//     );
// };

// export default Singleproduct;













import React, { useState } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { BaseURLState } from '../Recoil';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Singleproduct = ({ filteredData, setData, setFilteredData, onEdit, Differnce }) => {
    const [loading, setLoading] = useState(false);
    const [showModalForProduct, setShowModalForProduct] = useState(null);
    const baseurl = useRecoilValue(BaseURLState);

    const handleDeleteClick = (product_id) => {
        setShowModalForProduct(product_id);
    };

    const handleDeletefile = async (product_id) => {
        setLoading(true);
        try {
            const url = `${baseurl}/products/${product_id}`;
            await axios.delete(url);
            const updatedData = filteredData.filter((item) => item.product_id !== product_id);
            setFilteredData(updatedData);
            setData(updatedData);
            setShowModalForProduct(null);
            toast.success('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting file:', error);
            toast.error('product deleted', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (item) => {
        onEdit(item);
    };

    return (
        <>
            <div
                className="fixed overflow-auto border-collapse top-40 mt-10 w-10/12 mx-auto"
                style={{ maxHeight: '700px', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <ToastContainer />
       
                <h5 style={{ position: 'relative', top: 20,  right:85 }} className='text-end text-black text-bold' >  Difference:  {Differnce}  </h5>
                <table  className="border-separate font-sans border-2 w-11/12 mx-auto mt-10">

                    <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        <tr className="bg-[#FFB603] text-[#000000] ">
                            <th className="border text-center px-4 py-2">City</th>
                            <th className="border text-center px-4 py-2">Bike</th>
                            <th className="border text-center px-4 py-2">Category</th>
                            <th className="border text-center px-2 py-2">Product_Name</th>
                            <th className="border text-center px-4 py-2">Color</th>
                            <th className="border text-center px-4 py-2">Size</th>
                            <th className="border text-center px-4 py-2">User</th>
                            <th className="border text-center px-4 py-2">Hsn</th>
                            <th className="border text-center px-4 py-2">Unit</th>
                            <th className="border text-center px-4 py-2">Quantity</th>
                            <th className="border text-center px-4 py-2">Amount</th>
                            <th className="border px-4 text-center py-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index} className="hover:bg-[#8FB7B0]  text-[#000000]  ">
                                <td className="border font-bold text-center px-4 py-4">{item.city}</td>
                                <td className="border font-bold text-center px-4 py-4">{item.bike_category}</td>
                                <td className="border font-bold text-center px-4 py-4">{item.category}</td>
                                <td className="border font-bold text-center px-2 py-4">{item.product_name}</td>
                                <td className="border font-bold text-center px-4 py-4">{item.color}</td>
                                <td className="border font-bold text-center px-4 py-4">{item.size}</td>
                                <td className="border font-bold text-center px-4 py-4">{item.user?.first_name}</td>
                                <td className="border font-bold text-center px-4 py-4">{item.HSN_code}</td>
                                <td className="border font-bold text-center px-4 py-4">{item.unit}</td>
                                <td className="border font-bold text-center px-4 py-4">{item.quantity}</td>
                                <td className="border font-bold text-center px-4 py-4">{item.total_amount}</td>
                                <td className="border px-6 py-2">
                                    <div className="flex justify-center gap-5">
                                        <button onClick={() => handleEditClick(item)} className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
                                            <FaRegEdit className="h-4 w-4 text-gray-600" />
                                            <span className="sr-only">Edit</span>
                                        </button>
                                        <button onClick={() => handleDeleteClick(item.product_id)} className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
                                            <FaTrashAlt className="h-4 w-4 text-[#5D7CF6]" />
                                            <span className="sr-only">Delete</span>
                                        </button>
                                    </div>
                                    <Modal
                                        isOpen={showModalForProduct === item.product_id}
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
        </>
    );
};

export default Singleproduct;
