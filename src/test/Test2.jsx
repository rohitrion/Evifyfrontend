




// import React, { useState ,useEffect} from 'react';
// import axios from 'axios';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { BaseURLState, Finalresponse, GloablFile, Num, Response } from '../Recoil';
// import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
// import 'react-toastify/dist/ReactToastify.css';
// import { Circles } from 'react-loader-spinner'
// const Salary = () => {


//   const baseurl = useRecoilValue(BaseURLState);

//   const [num, setnum] = useRecoilState(Num)

//   const [res, setres] = useRecoilState(Response)

//   const [error, seterror] = useState()
//   const [final, setfinal] = useRecoilState(Finalresponse)


//   const [rentmodal, setRentModal] = useState({
//     include_slab: false,
//     zomato_first_order_start: 1,
//     zomato_first_order_end: 29,
//     zomato_first_week_amount: 30,
//     zomato_first_weekend_amount: 32,
//     zomato_second_order_start: 20,
//     zomato_second_order_end: 25,
//     zomato_second_week_amount: 25,
//     zomato_second_weekend_amount: 27,
//     zomato_order_greter_than: 26,
//     zomato_third_week_amount: 30,
//     zomato_third_weekend_amount: 32,
//     include_vahicle_charges: false,
//     fulltime_average: 21,
//     fulltime_greter_than_order: 21,
//     vahicle_charges_fulltime: 100,
//     partime_average: 11,
//     partime_greter_than_order: 11,
//     vahicle_charges_partime: 70,
//     include_bonus: false,
//     bonus_order_fulltime: 700,
//     bonus_amount_fulltime: 1000,
//     bonus_order_partime: 400,
//     bonus_amount_partime: 500,
//     include_rejection: false,
//     rejection_orders: 2,
//     rejection_amount: 20,
//     include_bad_order: false,
//     bad_orders: 2,
//     bad_orders_amount: 20,

//   });
//   const [file, setfile] = useRecoilState(GloablFile)

//   const [loading, setloding] = useState(false)

//   console.log(rentmodal)

//   const handleInputChange = (field, value) => {
//     setRentModal((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };


//   const handleCheckboxChange = (field) => {
//     setRentModal((prevData) => ({
//       ...prevData,
//       [field]: !prevData[field],
//     }));
//   };

//   const handleUpload2 = async () => {
//     try {
//       setloding(true)
//       const formData = new FormData();


//       formData.append('rentmodal', JSON.stringify(rentmodal));


//       Object.entries(rentmodal).forEach(([key, value]) => {
//         formData.append(key, value);
//       });


//       formData.append('file', file);
//       console.log(formData)

//       const response = await axios.post(`${baseurl}/surat/zomato/structure3?`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Data sent successfully', response.data);
//       // console.log('Data sent successfully', JSON.stringify(response.data));
//       setres(response.data)
//       setfinal(response.data)

//       setnum(1)


//       console.log(res + "the response" + setres)
//       console.log(res + "the data ")
//       console.log("api12 successfully ");
//     } catch (error) {
//       seterror(error)
//       console.error('Error sending data', error);
//       console.log('Response data:', error.response.data);
//       console.log('Response status:', error.response.status);
//       console.log('Response headers:', error.response.headers);
//       toast.error(error.response.data.detail)
//     } finally {

//       setloding(false); // Set loading to false regardless of success or error

//     }
//   };


//   function handleclick(val) {
//     setnum(val)
//   }

//   const handleInputKeyDown = (e) => {
//     // Prevent the default action if the key pressed is '-' or '+'
//     if (e.key === '-' || e.key === '+' || e.key === 'e') {
//       e.preventDefault();
//     }
//   };


//   useEffect(() => {
//     const savedInputValues = localStorage.getItem('suratzomamto');
//     if (savedInputValues) {
//         setRentModal(JSON.parse(savedInputValues));
//     }
// }, []);

// // Effect to save inputValues to localStorage whenever it changes
// useEffect(() => {
//     console.log('bava');
//     localStorage.setItem('suratzomamto', JSON.stringify(rentmodal));
// }, [rentmodal]);


//   return (

//     <>

//       {loading && (
//         <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-opacity-60 bg-gray-300">
//           <div className="ml-40">
//             <Circles
//               height="80"
//               width="80"
//               color="#4fa94d"
//               ariaLabel="circles-loading"
//               wrapperStyle={{}}
//               wrapperClass=""
//               visible={true}
//             />
//           </div>
//         </div>
//       )}
//       {/* lg:h-3/6  xl:h-5/6 overflow-y-auto */}

//       <div className="flex items-center justify-center mt-2     ">
//         <ToastContainer />

//         <main className="bg-white p-4 rounded shadow-lg w-120 lg:w-144  ">
//           <h3 className="text-3xl text-center pb-2 font-bold">Zomato</h3>
//           <div className='border-4 bg-slate-100 p-[50px] mb-3 '>


//             <div className="overflow-x-auto    " style={{ maxHeight: '500px', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//               <h3 className="text-3xl text-center pb-9 font-bold">Slab Sturcture</h3>

          
//               <input
//                 type="checkbox"
//                 checked={rentmodal.include_slab}
//                 onChange={() => handleCheckboxChange('include_slab')}
//               />
//               <table className=" border border-gray-300 text-center ">
//                 <thead >
//                   <tr className='text-center'>
//                     <th className="border border-gray-300 p-2">ORDER-TO</th>
//                     <th className="border border-gray-300 p-2"> ORDER-FROM</th>
//                     <th className="border border-gray-300 p-2">MON-FRI </th>
//                     <th className="border border-gray-300 p-2">SAT-SUN </th>
//                   </tr>
//                 </thead>
//                 <tbody className='text-center'>
//                   <tr>

//                     <td className="border border-gray-300 p-2 text-center">
//                       <input
//                         type="number"
//                         min={0}
//                         value={rentmodal.zomato_first_order_start}
//                         placeholder='ordeTO'
//                         onChange={(e) => handleInputChange('zomato_first_order_start', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                          className='text-center'
//                       />

//                     </td>

//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_first_order_end}
//                         onChange={(e) => handleInputChange('zomato_first_order_end', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_first_week_amount}
//                         onChange={(e) => handleInputChange('zomato_first_week_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_first_weekend_amount}
//                         onChange={(e) => handleInputChange('zomato_first_weekend_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                   </tr>
//                   <tr>

//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_second_order_start}
//                         onChange={(e) => handleInputChange('zomato_second_order_start', e.target.value)}
//                         placeholder='ordeTO'
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'

//                       />

//                     </td>

//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_second_order_end}
//                         onChange={(e) => handleInputChange('zomato_second_order_end', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'

//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_second_week_amount}
//                         onChange={(e) => handleInputChange('zomato_second_week_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_second_weekend_amount}
//                         onChange={(e) => handleInputChange('zomato_second_weekend_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                   </tr>


//                   <tr>

//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={null}
//                         className='text-center'
//                         placeholder='ORDERTO >='
//                         readOnly
//                         onChange={(e) => handleInputChange('bonusorder', 'bonus_order_partime', e.target.value)}
//                       />

//                     </td>

//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_order_greter_than}
//                         onChange={(e) => handleInputChange('zomato_order_greter_than', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_third_week_amount}
//                         onChange={(e) => handleInputChange('zomato_third_week_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_third_weekend_amount}
//                         onChange={(e) => handleInputChange('zomato_third_weekend_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                   </tr>


//                 </tbody>
//               </table>



//               <h3 className="text-3xl text-center pt-4 mt-4  font-bold">Rent Sturcture</h3>
//               <input
//                 type="checkbox"
//                 checked={rentmodal.include_vahicle_charges}
//                 onChange={() => handleCheckboxChange('include_vahicle_charges')}
//               />
//               <table className="min-w-full border border-gray-300 mt-4 text-center">

//                 <thead>
//                   <tr>
//                     <th className="border border-gray-300 p-2"> WORK-TYPE</th>
//                     <th className="border border-gray-300 p-2">ORDER</th>
//                     <th className="border border-gray-300 p-2">AVG</th>
//                     <th className="border border-gray-300 p-2">BIKE-RANT</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="text"
//                         placeholder='FULL-TIME' className='text-center' readOnly
//                         value={"FULL TIME"}
//                         onChange={(e) => handleInputChange(e.target.value)}
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.fulltime_greter_than_order}
//                         onChange={(e) => handleInputChange('fulltime_greter_than_order', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.fulltime_average}
//                         onChange={(e) => handleInputChange('fulltime_average', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.vahicle_charges_fulltime}
//                         onChange={(e) => handleInputChange('vahicle_charges_fulltime', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>

//                   </tr>
//                   {/* ... Repeat for other input fields */}
//                   <tr>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="text" placeholder='PART-TIME' className='text-center' readOnly
//                         value={'PART_TIME'}
//                         onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.partime_greter_than_order}
//                         onChange={(e) => handleInputChange('partime_greter_than_order', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         className='text-center'
//                         min={0}
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.partime_average}
//                         onChange={(e) => handleInputChange('partime_average', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.vahicle_charges_partime}
//                         onChange={(e) => handleInputChange('vahicle_charges_partime', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>

//                   </tr>
//                 </tbody>
//               </table>









//               <h3 className="text-3xl text-center pt-4 mt-4 font-bold">MONTHLY-BONUS</h3>
//               <input
//                 type="checkbox"
//                 checked={rentmodal.include_bonus}
//                 onChange={() => handleCheckboxChange('include_bonus')}
//               />
//               <table className="min-w-full border border-gray-300 mt-4 text-center">

//                 <thead>
//                   <tr>
//                     <th className="border border-gray-300 p-2"> WORK-TYPE</th>
//                     <th className="border border-gray-300 p-2">ORDER</th>
//                     <th className="border border-gray-300 p-2">INCENTIVE</th>

//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="text"
//                         placeholder='FULL-TIME' className='text-center' readOnly
//                         value={"FULL_TIME"}
//                         onChange={(e) => handleInputChange('bonusorder', 'vehicleChargesOrderFulltime', e.target.value)}
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.bonus_order_fulltime}
//                         onChange={(e) => handleInputChange('bonus_order_fulltime', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.bonus_amount_fulltime}
//                         onChange={(e) => handleInputChange('bonus_amount_fulltime', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>


//                   </tr>
//                   {/* ... Repeat for other input fields */}
//                   <tr>
//                   <td className="border border-gray-300 p-2">
//                       <input
//                         type="text" placeholder='PART-TIME' className='text-center' readOnly
//                         value={'PART_TIME'}
//                         onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.bonus_order_partime}
//                         onChange={(e) => handleInputChange('bonus_order_partime', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.bonus_amount_partime}
//                         onChange={(e) => handleInputChange('bonus_amount_partime', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>


//                   </tr>
//                 </tbody>
//               </table>








//               <h3 className="text-3xl text-center pt-4 mt-4  font-bold">Rejection ORDER</h3>
//               <input
//                 type="checkbox"
//                 checked={rentmodal.include_rejection}
//                 onChange={() => handleCheckboxChange('include_rejection')}
//               />
//               <table className="min-w-full border border-gray-300 mt-4 text-center">

//                 <thead>
//                   <tr>
//                     <th className="border border-gray-300 p-2">ORDER-GRETHER-THAN-EQUAL-TO</th>
//                     <th className="border border-gray-300 p-2">AMOUNT</th>

//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.rejection_orders}
//                         onChange={(e) => handleInputChange('rejection_orders', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.rejection_amount}
//                         onChange={(e) => handleInputChange('rejection_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                   </tr>
//                   {/* ... Repeat for other input fields */}
//                 </tbody>
//               </table>









//               <h3 className="text-3xl text-center pt-4 mt-4  font-bold">BAD ORDER</h3>
//               <input
//                 type="checkbox"
//                 checked={rentmodal.include_bad_order}
//                 onChange={() => handleCheckboxChange('include_bad_order')}
//               />
//               <table className="min-w-full border border-gray-300 mt-4 text-center">

//                 <thead>
//                   <tr>
//                     <th className="border border-gray-300 p-2">ORDER-GRETHER-THAN-EQUAL-TO</th>
//                     <th className="border border-gray-300 p-2">AMOUNT</th>

//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.bad_orders}
//                         onChange={(e) => handleInputChange('bad_orders', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.bad_orders_amount}
//                         onChange={(e) => handleInputChange('bad_orders_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                   </tr>

//                 </tbody>
//               </table>










//               <div className='flex justify-between '>
//                 <button onClick={handleUpload2} className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
//                 <button onClick={() => handleclick(1)} className="mt-4 bg-blue-500 text-white p-2 rounded">back</button>
//               </div>

//             </div>


//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Salary;






















// import React, { useState ,useEffect} from 'react';
// import axios from 'axios';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { BaseURLState, Finalresponse, GloablFile, Num, Response } from '../Recoil';
// import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
// import 'react-toastify/dist/ReactToastify.css';
// import { Circles } from 'react-loader-spinner'
// const Salary = () => {


//   const baseurl = useRecoilValue(BaseURLState);

//   const [num, setnum] = useRecoilState(Num)

//   const [res, setres] = useRecoilState(Response)

//   const [error, seterror] = useState()
//   const [final, setfinal] = useRecoilState(Finalresponse)


//   const [rentmodal, setRentModal] = useState({
//     include_slab: false,
//     zomato_first_order_start: 1,
//     zomato_first_order_end: 29,
//     zomato_first_week_amount: 30,
//     zomato_first_weekend_amount: 32,
//     zomato_second_order_start: 20,
//     zomato_second_order_end: 25,
//     zomato_second_week_amount: 25,
//     zomato_second_weekend_amount: 27,
//     zomato_order_greter_than: 26,
//     zomato_third_week_amount: 30,
//     zomato_third_weekend_amount: 32,
//     include_vahicle_charges: false,
//     fulltime_average: 21,
//     fulltime_greter_than_order: 21,
//     vahicle_charges_fulltime: 100,
//     partime_average: 11,
//     partime_greter_than_order: 11,
//     vahicle_charges_partime: 70,
//     include_bonus: false,
//     bonus_order_fulltime: 700,
//     bonus_amount_fulltime: 1000,
//     bonus_order_partime: 400,
//     bonus_amount_partime: 500,
//     include_rejection: false,
//     rejection_orders: 2,
//     rejection_amount: 20,
//     include_bad_order: false,
//     bad_orders: 2,
//     bad_orders_amount: 20,

//   });
//   const [file, setfile] = useRecoilState(GloablFile)

//   const [loading, setloding] = useState(false)

//   console.log(rentmodal)

//   const handleInputChange = (field, value) => {
//     setRentModal((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };


//   const handleCheckboxChange = (field) => {
//     setRentModal((prevData) => ({
//       ...prevData,
//       [field]: !prevData[field],
//     }));
//   };

//   const handleUpload2 = async () => {
//     try {
//       setloding(true)
//       const formData = new FormData();


//       formData.append('rentmodal', JSON.stringify(rentmodal));


//       Object.entries(rentmodal).forEach(([key, value]) => {
//         formData.append(key, value);
//       });


//       formData.append('file', file);
//       console.log(formData)

//       const response = await axios.post(`${baseurl}/surat/zomato/structure3?`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Data sent successfully', response.data);
//       // console.log('Data sent successfully', JSON.stringify(response.data));
//       setres(response.data)
//       setfinal(response.data)

//       setnum(1)


//       console.log(res + "the response" + setres)
//       console.log(res + "the data ")
//       console.log("api12 successfully ");
//     } catch (error) {
//       seterror(error)
//       console.error('Error sending data', error);
//       console.log('Response data:', error.response.data);
//       console.log('Response status:', error.response.status);
//       console.log('Response headers:', error.response.headers);
//       toast.error(error.response.data.detail)
//     } finally {

//       setloding(false); // Set loading to false regardless of success or error

//     }
//   };


//   function handleclick(val) {
//     setnum(val)
//   }

//   const handleInputKeyDown = (e) => {
//     // Prevent the default action if the key pressed is '-' or '+'
//     if (e.key === '-' || e.key === '+' || e.key === 'e') {
//       e.preventDefault();
//     }
//   };


//   useEffect(() => {
//     const savedInputValues = localStorage.getItem('suratzomamto');
//     if (savedInputValues) {
//         setRentModal(JSON.parse(savedInputValues));
//     }
// }, []);

// // Effect to save inputValues to localStorage whenever it changes
// useEffect(() => {
//     console.log('bava');
//     localStorage.setItem('suratzomamto', JSON.stringify(rentmodal));
// }, [rentmodal]);


//   return (

//     <>

//       {loading && (
//         <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-opacity-60 bg-gray-300">
//           <div className="ml-40">
//             <Circles
//               height="80"
//               width="80"
//               color="#4fa94d"
//               ariaLabel="circles-loading"
//               wrapperStyle={{}}
//               wrapperClass=""
//               visible={true}
//             />
//           </div>
//         </div>
//       )}
//       {/* lg:h-3/6  xl:h-5/6 overflow-y-auto */}

//       <div className="flex items-center justify-center mt-2     ">
//         <ToastContainer />

//         <main className="bg-white p-4 rounded shadow-lg w-120 lg:w-144  ">
//           <h3 className="text-3xl text-center pb-2 font-bold">Zomato</h3>
//           <div className='border-4 bg-slate-100 p-[50px] mb-3 '>


//             <div className="overflow-x-auto    " style={{ maxHeight: '500px', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//               <h3 className="text-3xl text-center pb-9 font-bold">Slab Sturcture</h3>

          
//               <input
//                 type="checkbox"
//                 checked={rentmodal.include_slab}
//                 onChange={() => handleCheckboxChange('include_slab')}
//               />
//               <table className=" border border-gray-300 text-center ">
//                 <thead >
//                   <tr className='text-center'>
//                     <th className="border border-gray-300 p-2">ORDER-TO</th>
//                     <th className="border border-gray-300 p-2"> ORDER-FROM</th>
//                     <th className="border border-gray-300 p-2">MON-FRI </th>
//                     <th className="border border-gray-300 p-2">SAT-SUN </th>
//                   </tr>
//                 </thead>
//                 <tbody className='text-center'>
//                   <tr>

//                     <td className="border border-gray-300 p-2 text-center">
//                       <input
//                         type="number"
//                         min={0}
//                         value={rentmodal.zomato_first_order_start}
//                         placeholder='ordeTO'
//                         onChange={(e) => handleInputChange('zomato_first_order_start', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                          className='text-center'
//                       />

//                     </td>

//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_first_order_end}
//                         onChange={(e) => handleInputChange('zomato_first_order_end', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_first_week_amount}
//                         onChange={(e) => handleInputChange('zomato_first_week_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_first_weekend_amount}
//                         onChange={(e) => handleInputChange('zomato_first_weekend_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                   </tr>
//                   <tr>

//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_second_order_start}
//                         onChange={(e) => handleInputChange('zomato_second_order_start', e.target.value)}
//                         placeholder='ordeTO'
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'

//                       />

//                     </td>

//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_second_order_end}
//                         onChange={(e) => handleInputChange('zomato_second_order_end', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'

//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_second_week_amount}
//                         onChange={(e) => handleInputChange('zomato_second_week_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_second_weekend_amount}
//                         onChange={(e) => handleInputChange('zomato_second_weekend_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                   </tr>


//                   <tr>

//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={null}
//                         className='text-center'
//                         placeholder='ORDERTO >='
//                         readOnly
//                         onChange={(e) => handleInputChange('bonusorder', 'bonus_order_partime', e.target.value)}
//                       />

//                     </td>

//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_order_greter_than}
//                         onChange={(e) => handleInputChange('zomato_order_greter_than', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_third_week_amount}
//                         onChange={(e) => handleInputChange('zomato_third_week_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.zomato_third_weekend_amount}
//                         onChange={(e) => handleInputChange('zomato_third_weekend_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                   </tr>


//                 </tbody>
//               </table>



//               <h3 className="text-3xl text-center pt-4 mt-4  font-bold">Rent Sturcture</h3>
//               <input
//                 type="checkbox"
//                 checked={rentmodal.include_vahicle_charges}
//                 onChange={() => handleCheckboxChange('include_vahicle_charges')}
//               />
//               <table className="min-w-full border border-gray-300 mt-4 text-center">

//                 <thead>
//                   <tr>
//                     <th className="border border-gray-300 p-2"> WORK-TYPE</th>
//                     <th className="border border-gray-300 p-2">ORDER</th>
//                     <th className="border border-gray-300 p-2">AVG</th>
//                     <th className="border border-gray-300 p-2">BIKE-RANT</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="text"
//                         placeholder='FULL-TIME' className='text-center' readOnly
//                         value={"FULL TIME"}
//                         onChange={(e) => handleInputChange(e.target.value)}
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.fulltime_greter_than_order}
//                         onChange={(e) => handleInputChange('fulltime_greter_than_order', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.fulltime_average}
//                         onChange={(e) => handleInputChange('fulltime_average', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.vahicle_charges_fulltime}
//                         onChange={(e) => handleInputChange('vahicle_charges_fulltime', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>

//                   </tr>
//                   {/* ... Repeat for other input fields */}
//                   <tr>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="text" placeholder='PART-TIME' className='text-center' readOnly
//                         value={'PART_TIME'}
//                         onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.partime_greter_than_order}
//                         onChange={(e) => handleInputChange('partime_greter_than_order', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         className='text-center'
//                         min={0}
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.partime_average}
//                         onChange={(e) => handleInputChange('partime_average', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.vahicle_charges_partime}
//                         onChange={(e) => handleInputChange('vahicle_charges_partime', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>

//                   </tr>
//                 </tbody>
//               </table>









//               <h3 className="text-3xl text-center pt-4 mt-4 font-bold">MONTHLY-BONUS</h3>
//               <input
//                 type="checkbox"
//                 checked={rentmodal.include_bonus}
//                 onChange={() => handleCheckboxChange('include_bonus')}
//               />
//               <table className="min-w-full border border-gray-300 mt-4 text-center">

//                 <thead>
//                   <tr>
//                     <th className="border border-gray-300 p-2"> WORK-TYPE</th>
//                     <th className="border border-gray-300 p-2">ORDER</th>
//                     <th className="border border-gray-300 p-2">INCENTIVE</th>

//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="text"
//                         placeholder='FULL-TIME' className='text-center' readOnly
//                         value={"FULL_TIME"}
//                         onChange={(e) => handleInputChange('bonusorder', 'vehicleChargesOrderFulltime', e.target.value)}
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.bonus_order_fulltime}
//                         onChange={(e) => handleInputChange('bonus_order_fulltime', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.bonus_amount_fulltime}
//                         onChange={(e) => handleInputChange('bonus_amount_fulltime', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>


//                   </tr>
//                   {/* ... Repeat for other input fields */}
//                   <tr>
//                   <td className="border border-gray-300 p-2">
//                       <input
//                         type="text" placeholder='PART-TIME' className='text-center' readOnly
//                         value={'PART_TIME'}
//                         onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.bonus_order_partime}
//                         onChange={(e) => handleInputChange('bonus_order_partime', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.bonus_amount_partime}
//                         onChange={(e) => handleInputChange('bonus_amount_partime', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>


//                   </tr>
//                 </tbody>
//               </table>








//               <h3 className="text-3xl text-center pt-4 mt-4  font-bold">Rejection ORDER</h3>
//               <input
//                 type="checkbox"
//                 checked={rentmodal.include_rejection}
//                 onChange={() => handleCheckboxChange('include_rejection')}
//               />
//               <table className="min-w-full border border-gray-300 mt-4 text-center">

//                 <thead>
//                   <tr>
//                     <th className="border border-gray-300 p-2">ORDER-GRETHER-THAN-EQUAL-TO</th>
//                     <th className="border border-gray-300 p-2">AMOUNT</th>

//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.rejection_orders}
//                         onChange={(e) => handleInputChange('rejection_orders', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.rejection_amount}
//                         onChange={(e) => handleInputChange('rejection_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                   </tr>
//                   {/* ... Repeat for other input fields */}
//                 </tbody>
//               </table>









//               <h3 className="text-3xl text-center pt-4 mt-4  font-bold">BAD ORDER</h3>
//               <input
//                 type="checkbox"
//                 checked={rentmodal.include_bad_order}
//                 onChange={() => handleCheckboxChange('include_bad_order')}
//               />
//               <table className="min-w-full border border-gray-300 mt-4 text-center">

//                 <thead>
//                   <tr>
//                     <th className="border border-gray-300 p-2">ORDER-GRETHER-THAN-EQUAL-TO</th>
//                     <th className="border border-gray-300 p-2">AMOUNT</th>

//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.bad_orders}
//                         onChange={(e) => handleInputChange('bad_orders', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />

//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="number"
//                         value={rentmodal.bad_orders_amount}
//                         onChange={(e) => handleInputChange('bad_orders_amount', e.target.value)}
//                         onKeyDown={handleInputKeyDown}
//                         min={0}
//                         className='text-center'
//                       />
//                     </td>
//                   </tr>

//                 </tbody>
//               </table>










//               <div className='flex justify-between '>
//                 <button onClick={handleUpload2} className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
//                 <button onClick={() => handleclick(1)} className="mt-4 bg-blue-500 text-white p-2 rounded">back</button>
//               </div>

//             </div>


//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Salary;




import React, { useState } from 'react';

const DynamicForm = () => {
  // Initial data
  const [formData, setFormData] = useState({
    file_key: '',
    include_slab: true,
    slabs: [
      {
        from_date: '',
        to_date: '',
        zomato_first_order_start: 1,
      },
    ],
    include_vahicle_charges: true,
    fulltime_average: 20,
    fulltime_greter_than_order: 20,
    vahicle_charges_fulltime: 100,
  });

  // Handler for updating state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  // Handler for updating slabs
  const handleSlabChange = (index, e) => {
    const { name, value } = e.target;
    const newSlabs = [...formData.slabs];
    newSlabs[index][name] = value;
    setFormData({ ...formData, slabs: newSlabs });
  };

  // Adding a new slab
  const addSlab = () => {
    setFormData({
      ...formData,
      slabs: [
        ...formData.slabs,
        {
          from_date: '',
          to_date: '',
          zomato_first_order_start: 1,
        },
      ],
    });
  };

  return (
    <div>
      <h2>Dynamic Input Form</h2>
      <div>
        <label>File Key: </label>
        <input
          type="text"
          name="file_key"
          value={formData.file_key}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Include Slab: </label>
        <input
          type="checkbox"
          name="include_slab"
          checked={formData.include_slab}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Full-time Average: </label>
        <input
          type="number"
          name="fulltime_average"
          value={formData.fulltime_average}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Include Vehicle Charges: </label>
        <input
          type="checkbox"
          name="include_vahicle_charges"
          checked={formData.include_vahicle_charges}
          onChange={handleChange}
        />
      </div>

      <h3>Slabs</h3>
      {formData.slabs.map((slab, index) => (
        <div key={index}>
          <h4>Slab {index + 1}</h4>
          <div>
            <label>From Date: </label>
            <input
              type="text"
              name="from_date"
              value={slab.from_date}
              onChange={(e) => handleSlabChange(index, e)}
            />
          </div>

          <div>
            <label>To Date: </label>
            <input
              type="text"
              name="to_date"
              value={slab.to_date}
              onChange={(e) => handleSlabChange(index, e)}
            />
          </div>

          <div>
            <label>Zomato First Order Start: </label>
            <input
              type="number"
              name="zomato_first_order_start"
              value={slab.zomato_first_order_start}
              onChange={(e) => handleSlabChange(index, e)}
            />
          </div>
        </div>
      ))}

      <button onClick={addSlab}>Add Slab</button>
    </div>
  );
};

export default DynamicForm;
