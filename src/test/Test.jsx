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
//         } catch (error) {
//             console.error('Error deleting file:', error);
//             toast.error('Error deleting product. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEditClick = (item) => {
//         onEdit(item);
//     };

//     return (
//         <div>
//             {filteredData.map((item) => (
//                 <div key={item.product_id}>
//                     <h3>{item.name}</h3>
//                     <FaRegEdit onClick={() => handleEditClick(item)} />
//                     <FaTrashAlt onClick={() => handleDeleteClick(item.product_id)} />
//                 </div>
//             ))}
//             {showModalForProduct && (
//                 <Modal
//                     isOpen={!!showModalForProduct}
//                     onRequestClose={() => setShowModalForProduct(null)}
//                     contentLabel="Confirm Delete"
//                 >
//                     <h2>Are you sure you want to delete this product?</h2>
//                     <button onClick={() => handleDeletefile(showModalForProduct)}>Yes</button>
//                     <button onClick={() => setShowModalForProduct(null)}>No</button>
//                     {loading && <ThreeDots color="#00BFFF" height={80} width={80} />}
//                 </Modal>
//             )}
//             <ToastContainer />
//         </div>
//     );
// };

// export default Singleproduct;
