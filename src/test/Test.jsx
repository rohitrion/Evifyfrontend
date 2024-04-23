// import React, { useState } from 'react';
// import Select from 'react-select';

// const YourComponent = () => {
//   // State to manage input values and dynamically add new inputs
//   const [inputs, setInputs] = useState([{ name: '', city: '', address: '', date:"",days: [] }]);

//   // Options for days
//   const dayOptions = [
//     { value: 'mon', label: 'Monday' },
//     { value: 'tue', label: 'Tuesday' },
//     { value: 'wed', label: 'Wednesday' },
//     { value: 'thu', label: 'Thursday' },
//     { value: 'fri', label: 'Friday' },
//     { value: 'sat', label: 'Saturday' },
//     { value: 'sun', label: 'Sunday' } 
//   ];

//   // Options for cities
//   const cityOptions = [
//     { value: 'city1', label: 'City 1' },
//     { value: 'city2', label: 'City 2' },
//     { value: 'city3', label: 'City 3' }
//   ];

//   // Function to handle input change
//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const newInputs = [...inputs];
//     newInputs[index][name] = value;
//     setInputs(newInputs);
//   };

//   // Function to handle multi-select change
//   const handleMultiSelectChange = (index, selectedOptions) => {
//     const newInputs = [...inputs];
//     newInputs[index]['days'] = selectedOptions.map(option => option.value);
//     setInputs(newInputs);
//   };

//   // Function to handle city select change
//   const handleCityChange = (index, selectedOption) => {
//     const newInputs = [...inputs];
//     newInputs[index]['city'] = selectedOption.value;
//     setInputs(newInputs);
//   };

//   // Function to handle adding new input fields
//   const handleAddInput = () => {
//     setInputs([...inputs, { name: '', city: '', address: '', days: [] }]);
//   };



//   console.log(inputs)

//   return (
//     <div className="container mx-auto">
//       <table className="border-collapse border border-gray-400">
//         <thead>
//           <tr>
//             <th className="border border-gray-400 px-4 py-2">Name</th>
//             <th className="border border-gray-400 px-4 py-2">Date</th>
//             <th className="border border-gray-400 px-4 py-2">City</th>
//             <th className="border border-gray-400 px-4 py-2">Address</th>
//             <th className="border border-gray-400 px-4 py-2">Days</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inputs.map((input, index) => (
//             <tr key={index}>
//               <td className="border border-gray-400 px-4 py-2">
//                 <input
//                   type="text"
//                   name="name"
//                   value={input.name}
//                   onChange={(e) => handleInputChange(index, e)}
//                   placeholder="Name"
//                   className="border rounded px-2 py-1"
//                 />
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 <input
//                   type="date"
//                   name="date"
//                   value={input.date}
//                   onChange={(e) => handleInputChange(index, e)}
//                   placeholder="Name"
//                   className="border rounded px-2 py-1"
//                 />
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 <Select
//                   options={cityOptions}
//                   value={cityOptions.find(option => option.value === input.city)}
//                   onChange={(selectedOption) => handleCityChange(index, selectedOption)}
//                 />
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 <input
//                   type="text"
//                   name="address"
//                   value={input.address}
//                   onChange={(e) => handleInputChange(index, e)}
//                   placeholder="Address"
//                   className="border rounded px-2 py-1"
//                 />
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 <Select
//                   isMulti
//                   delimiter
//                   options={dayOptions}
//                   value={dayOptions.filter(option => input.days.includes(option.value))}
//                   onChange={(selectedOptions) => handleMultiSelectChange(index, selectedOptions)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleAddInput} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
//         Add
//       </button>
//     </div>
//   );
// };

// export default YourComponent;
