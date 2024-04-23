

// <td className="border px-4 py-2">
// <button onClick={() => openModal(index)} className="rounded-full flex  items-center justify-center p-2 bg-gray-200 hover:bg-gray-300">
//     <span><FaCheck className="text-green-500" /> </span>   {/* Use the FaCheck icon */}
//     <span className="ml-2">Use Quantity</span> {/* Add a label */}
// </button>
// </td>










// import React, { useState } from 'react';
// import { BsThreeDotsVertical } from "react-icons/bs";
// import Modal from "react-modal";
// import { ThreeDots } from "react-loader-spinner";
// import axios from "axios";
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { BaseURLState, Edit, Toggle, Toggleselectedid } from '../Recoil';
// import { FaRegEdit } from "react-icons/fa";
// import { FaTrashAlt } from "react-icons/fa";
// import { FaCheck } from 'react-icons/fa';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { v4 as uuidv4 } from 'uuid';
// const Category_data = ({ item, data, setdata, onEdit, filteredData, setFilteredData, onProductSelect }) => {


//     const baseurl = useRecoilValue(BaseURLState);
//     const [updatedQuantities, setUpdatedQuantities] = useState({}); // State to store updated quantities for each category
//     const [isOpen, setIsOpen] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const handleClick = (product) => {
//         onProductSelect(product);
//     };
//     // const handleQuantityChange = (index, event) => {
//     //     const value = event.target.value;
//     //     setUpdatedQuantities(prevState => ({
//     //         ...prevState,
//     //         [index]: value
//     //     }));
//     // };

//     const handleQuantityChange = (index, event, item) => {
//         const value = event.target.value;
//         const availableQuantity = item.remaining_quantity;
//         if (value <= availableQuantity) {
//             setUpdatedQuantities(prevState => ({
//                 ...prevState,
//                 [index]: value
//             }));
//         } else {
//             // Optionally, you can show a message or prevent setting the quantity
//             toast.error('Entered quantity exceeds available quantity');
//             setUpdatedQuantities('')
//             // You might want to show a message to the user here
//         }
//     };

//     const handleUpdateQuantity = async (index, item) => {

//         if (updatedQuantities === "") {
//             return
//         }

//         const quantity = updatedQuantities[index] || '';
//         try {
//             const url = `${baseurl}/inventory/use`;
//             const response = await axios.post(url, {
//                 product_name: item.product_name,
//                 category: item.category,
//                 bike_category: item.bike_category,
//                 color: item.color,
//                 size: item.size,
//                 city: item.city,
//                 quantity: quantity,
//             });

//             console.log(response.data);
//             toast.success('Quantity updated successfully');
//             setFilteredData(prevData => {
//                 return prevData.map(dataItem => {
//                     if (dataItem.remaining_quantity === item.remaining_quantity) {
//                         return { ...dataItem, remaining_quantity: item.remaining_quantity - quantity };
//                     }
//                     return dataItem;
//                 });
//             });

//             setUpdatedQuantities('')
//         } catch (error) {
//             console.error('Error updating quantity:', error);
//             toast.error('Error updating quantity');

//         }
//     };

//     const handleInputKeyDown = (e) => {
//         // Prevent the default action if the key pressed is '-' or '+'
//         if (e.key === '-' || e.key === '+' || e.key === 'e') {
//             e.preventDefault();
//         }
//     };

//     const closeModal = () => {
//         setIsOpen(false);

//     };

//     const customStyles = {
//         content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             maxWidth: '30%', // Adjusted width for responsiveness
//             width: 'auto', // Set to auto for responsiveness
//             maxHeight: '90vh', // Limit height for small screens
//             overflow: 'auto', // Enable scrolling if content overflows
//             background: '#fff',
//             borderRadius: '8px',
//             boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
//             padding: '20px',
//             position: 'relative'

//         },
//         overlay: {
//             background: 'rgba(0,0,0,0.6)'
//         }
//     };


//     const openModal = () => {
//         setIsOpen(true);
//         // setInputFields({
//         //   invoice_number: '',
//         //   invoice_amount: '',
//         //   invoice_date: '',
//         //   inventory_paydate: '',
//         //   vendor: '',
//         //   invoice_image_id: ''
//         // });


//         // setSelectedInventory(null);
//     };


//     return (
//         <>

//             <ToastContainer
//                 position="top-center"
//                 autoClose={2000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="dark"

//             />
//             <div className="mx-auto w-full">
//                 <table className="border-collapse w-4/5 mx-auto">
//                     <thead>
//                         <tr className="bg-gray-200">
//                             <th className="border px-4  text-center py-2">Category</th>
//                             <th className="border  text-center px-4 py-2">Bike</th>
//                             <th className="border  text-center px-4 py-2">Product</th>
//                             <th className="border  text-center px-4 py-2">Size</th>
//                             <th className="border  text-center px-4 py-2">Quantity</th>
//                             <th className="border  text-center px-4 py-2">City</th>
//                             {/* <th className="border  text-center px-4 py-2">Use</th> */}
//                             <th className="border px-4  text-center py-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredData.map((item, index) => {
//                             // const categoryId = uuidv4(); // Generate UUID for each items
//                             const categoryId = index;
//                             return (
//                                 <tr key={index} className="hover:bg-gray-100">
//                                     <td className="border font-bold cursor-pointer text-center px-4 py-2" >{item.category}</td>
//                                     <td className="border font-bold cursor-pointer text-center px-4 py-2">{item.bike_category}</td>
//                                     <td className="border font-bold text-center px-4 py-2">{item.product_name}</td>
//                                     <td className="border font-bold text-center px-4 py-2">{item.size}</td>
//                                     <td className="border font-bold text-center px-4 py-2">{item.remaining_quantity}</td>
//                                     <td className="border font-bold text-center px-4 py-2">{item.city}</td>

//                                     <Modal
//                                         isOpen={isOpen}
//                                         contentLabel="Logout Confirmation"
//                                         className="bg-[#121212] text-white rounded-lg p-4 w-72 mx-auto mt-20"
//                                         overlayClassName="fixed inset-0 flex items-center justify-center z-50"
//                                     >
//                                         <td className="border font-bold text-center px-4 py-2">
//                                             <input
//                                                 type="number"
//                                                 value={updatedQuantities[categoryId] || ''}
//                                                 onChange={(e) => handleQuantityChange(categoryId, e, item)}
//                                                 className="border rounded-md px-2 py-1 w-24 text-center text-black"
//                                                 disabled={updatedQuantities[index] === item.remaining_quantity}
//                                                 onKeyDown={handleInputKeyDown}
//                                                 min={0}
//                                             />
//                                         </td>

//                                         <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
//                                         <p className="text-lg mb-6">Are you sure you want to delete?</p>
//                                         <div className="flex justify-center space-x-4">
//                                             <button onClick={() => handleUpdateQuantity(categoryId, item)} disabled={loading} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
//                                                 {loading ? (
//                                                     <ThreeDots height={20} width={40} radius={9} color="#4fa94d" ariaLabel="three-dots-loading" visible={true} />
//                                                 ) : (
//                                                     "Ok"
//                                                 )}
//                                             </button>
//                                             <button onClick={closeModal} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     </Modal>

//                                     <td className="border px-4 py-2">
//                                         <div className="flex justify-center gap-5">
//                                             <button onClick={openModal} className="rounded-full flex  items-center justify-center p-2 bg-gray-200 hover:bg-gray-300">
//                                                 <span><FaCheck className="text-green-500" /> </span>   {/* Use the FaCheck icon */}
//                                                 <span className="ml-2">Use Quantity</span> {/* Add a label */}
//                                             </button>
//                                         </div>
//                                     </td>

//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// };

// export default Category_data;











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

const Category_data = ({ item, data, setdata, onEdit, filteredData, setFilteredData, onProductSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [updatedQuantities, setUpdatedQuantities] = useState({});
    const baseurl = useRecoilValue(BaseURLState);
    // Handle opening the modal for a specific index
    const openModal = (index) => {
        setSelectedIndex(index);
        setIsOpen(true);
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
                quantity,
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
            maxHeight: "40vh"
        },
        overlay: {
            background: "rgba(0, 0, 0, 0.7)", // Slightly darker overlay for more contrast
        },
    };



    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                theme="dark"
            />

            <table className="border-collapse w-4/5 mx-auto">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 text-center py-2">Category</th>
                        <th className="border text-center px-4 py-2">Bike</th>
                        <th className="border text-center px-4 py-2">Product</th>
                        <th className="border text-center px-4 py-2">Size</th>
                        <th className="border text-center px-4 py-2">Quantity</th>
                        <th className="border text-center px-4 py-2">City</th>
                        <th className="border px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (

                        <tr key={index} className="hover:bg-gray-100">
                            <td className="border font-bold text-center px-4 py-2">{item.category}</td>
                            <td className="border font-bold text-center px-4 py-2">{item.bike_category}</td>
                            <td className="border font-bold text-center px-4 py-2">{item.product_name}</td>
                            <td className="border font-bold text-center px-4 py-2">{item.size}</td>
                            <td className="border font-bold text-center px-4 py-2">{item.remaining_quantity}</td>
                            <td className="border font-bold text-center px-4 py-2">{item.city}</td>
                            <td className="border px-4 py-2">
                                <div className="flex justify-center gap-5">
                                    <button onClick={() => openModal(index)} className="rounded-full flex  items-center justify-center p-2 bg-gray-200 hover:bg-gray-300">
                                        <span><FaCheck className="text-green-500" /> </span>   {/* Use the FaCheck icon */}
                                        <span className="ml-2">Use Quantity</span> {/* Add a label */}
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Update Quantity"
            >
                {selectedIndex !== null && (
                    <div className='flex-col ' >
                        <div>
                            <h2 className="text-xl font-bold mb-4 ">Update Quantity</h2></div>
                        <div className="mb-5 "  > <p> Are you sure to Update Quantity?</p></div>
                        <div className="mb-6 " >
                            <input
                                type="number"
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
                                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >
                                Update
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default Category_data;
