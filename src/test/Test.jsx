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


// import React, { useState } from 'react';

// // Define initial data structure
// const initialData = {
//   file_key: 'string',
//   include_slab: true,
//   slabs: [
//     {
//       from_date: 'string',
//       to_date: 'string',
//       zomato_first_order_start: 1,
//       zomato_first_order_end: 29,
//       zomato_first_week_amount: 30,
//       zomato_first_weekend_amount: 32,
//       zomato_second_order_start: 20,
//       zomato_second_order_end: 25,
//       zomato_second_week_amount: 25,
//       zomato_second_weekend_amount: 27,
//       zomato_order_greter_than: 26,
//       zomato_third_week_amount: 30,
//       zomato_third_weekend_amount: 32,
//     },
//   ],
//   include_vahicle_charges: true,
//   fulltime_average: 20,
//   fulltime_greter_than_order: 20,
//   vahicle_charges_fulltime: 100,
//   partime_average: 11,
//   partime_greter_than_order: 12,
//   vahicle_charges_partime: 70,
//   include_bonus: true,
//   bonus_order_fulltime: 700,
//   bonus_amount_fulltime: 1000,
//   bonus_order_partime: 400,
//   bonus_amount_partime: 500,
//   include_rejection: true,
//   rejection_orders: 2,
//   rejection_amount: 20,
//   include_bad_order: true,
//   bad_orders: 2,
//   bad_orders_amount: 20,
// };

// // Create component
// const SlabManager = () => {
//   // Use state to manage the main data and the additional slab forms
//   const [data, setData] = useState(initialData);
//   const [slabForms, setSlabForms] = useState([]); // State to track dynamic input forms

//   // Function to handle input changes in dynamic forms
//   const handleInputChange = (index, e) => {
//     const { name, value } = e.target;

//     // Update specific slab form input
//     setSlabForms((prev) =>
//       prev.map((form, idx) => (idx === index ? { ...form, [name]: value } : form))
//     );
//   };

//   // Add a new empty slab form
//   const addSlabForm = () => {
//     setSlabForms((prev) => [
//       ...prev,
//       {
//         from_date: '',
//         to_date: '',
//         zomato_first_order_start: '',
//         zomato_first_order_end: '',
//         zomato_first_week_amount: '',
//         zomato_first_weekend_amount: '',
//         zomato_second_order_start: '',
//         zomato_second_order_end: '',
//         zomato_second_week_amount: '',
//         zomato_second_weekend_amount: '',
//         zomato_order_greter_than: '',
//         zomato_third_week_amount: '',
//         zomato_third_weekend_amount: '',
//       },
//     ]);
//   };

//   // Function to submit all data (existing and additional slabs)
//   const submitData = async () => {
//     const updatedData = {
//       ...data,
//       slabs: [...data.slabs, ...slabForms], // Include existing slabs and new ones
//     };

//     const response = await fetch('YOUR_API_ENDPOINT', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedData),
//     });

//     if (response.ok) {
//       console.log('Data posted successfully');
//     } else {
//       console.log('Error posting data');
//     }
//   };

//   return (
//     <div>
//       <h2>Add New Slab</h2>
//       <button onClick={addSlabForm}>Add New Slab</button> {/* Adds a new set of inputs */}

//       {slabForms.map((form, index) => (
//         <div key={index}>
//           {/* Input fields for each slab form */}
//           <input
//             type="text"
//             name="from_date"
//             placeholder="From Date"
//             value={form.from_date}
//             onChange={(e) => handleInputChange(index, e)}
//           />
//           <input
//             type="text"
//             name="to_date"
//             placeholder="To Date"
//             value={form.to_date}
//             onChange={(e) => handleInputChange(index, e)}
//           />
//           {/* Continue with additional input fields for this slab */}
//           <input
//             type="text"
//             name="zomato_first_order_start"
//             placeholder="First Order Start"
//             value={form.zomato_first_order_start}
//             onChange={(e) => handleInputChange(index, e)}
//           />
//           <input
//             type="text"
//             name="zomato_first_order_end"
//             placeholder="First Order End"
//             value={form.zomato_first_order_end}
//             onChange={(e) => handleInputChange(index, e)}
//           />
//           {/* Add other fields for this slab */}
//         </div>
//       ))}

//       <button onClick={submitData}>Submit Data</button> {/* Posts the entire data */}
//     </div>
//   );
// };

// export default SlabManager;



// import React, { useState } from 'react';

// // Initial data structure with predefined slabs
// const initialData = {
//   file_key: 'string',
//   include_slab: true,
//   slabs: [
//     {
//       from_date: '',
//       to_date: '',
//       zomato_first_order_start: '',
//       zomato_first_order_end: '',
//       zomato_first_week_amount: '',
//       zomato_first_weekend_amount: '',
//       zomato_second_order_start: '',
//       zomato_second_order_end: '',
//       zomato_second_week_amount: '',
//       zomato_second_weekend_amount: '',
//       zomato_order_greter_than: '',
//       zomato_third_week_amount: '',
//       zomato_third_weekend_amount: '',
//     },
//   ],
// };

// // Component definition
// const SlabManager = () => {
//   const [data, setData] = useState(initialData);
//   const [additionalSlabs, setAdditionalSlabs] = useState([]); // Manage additional slabs

//   // Handle input changes for initial and additional slabs
//   const handleInputChange = (index, e, isInitial = false) => {
//     const { name, value } = e.target;

//     if (isInitial) {
//       // Update the initial slabs
//       const updatedSlabs = [...data.slabs];
//       updatedSlabs[index] = { ...updatedSlabs[index], [name]: value };
//       setData((prevData) => ({ ...prevData, slabs: updatedSlabs }));
//     } else {
//       // Update additional slabs
//       setAdditionalSlabs((prev) =>
//         prev.map((form, idx) => (idx === index ? { ...form, [name]: value } : form))
//       );
//     }
//   };

//   // Add a new empty slab to additional slabs
//   const addSlabForm = () => {
//     setAdditionalSlabs((prev) => [
//       ...prev,
//       {
//         from_date: '',
//         to_date: '',
//         zomato_first_order_start: '',
//         zomato_first_order_end: '',
//         zomato_first_week_amount: '',
//         zomato_first_weekend_amount: '',
//         zomato_second_order_start: '',
//         zomato_second_order_end: '',
//         zomato_second_week_amount: '',
//         zomato_second_weekend_amount: '',
//         zomato_order_greter_than: '',
//         zomato_third_week_amount: '',
//         zomato_third_weekend_amount: '',
//       },
//     ]);
//   };

//   // Submit all data (initial and additional slabs)
//   const submitData = async () => {
//     const completeSlabs = [...data.slabs, ...additionalSlabs]; // Combine initial and additional slabs
//     const updatedData = { ...data, slabs: completeSlabs };

//     const response = await fetch('YOUR_API_ENDPOINT', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedData),
//     });

//     if (response.ok) {
//       console.log('Data posted successfully');
//     } else {
//       console.log('Error posting data');
//     }
//   };

//   return (
//     <div>
//       <h2>Slab Management</h2>

//       {/* Initial slab inputs */}
//       {data.slabs.map((form, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             name="from_date"
//             placeholder="From Date"
//             value={form.from_date}
//             onChange={(e) => handleInputChange(index, e, true)}
//           />
//           <input
//             type="text"
//             name="to_date"
//             placeholder="To Date"
//             value={form.to_date}
//             onChange={(e) => handleInputChange(index, e, true)}
//           />
//           <input
//             type="text"
//             name="zomato_first_order_start"
//             placeholder="First Order Start"
//             value={form.zomato_first_order_start}
//             onChange={(e) => handleInputChange(index, e, true)}
//           />
//           <input
//             type="text"
//             name="zomato_first_order_end"
//             placeholder="First Order End"
//             value={form.zomato_first_order_end}
//             onChange={(e) => handleInputChange(index, e, true)}
//           />
//           {/* Additional initial inputs */}
//         </div>
//       ))}

//       {/* Additional slab inputs */}
//       {additionalSlabs.map((form, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             name="from_date"
//             placeholder="From Date"
//             value={form.from_date}
//             onChange={(e) => handleInputChange(index, e, false)}
//           />
//           <input
//             type="text"
//             name="to_date"
//             placeholder="To Date"
//             value={form.to_date}
//             onChange={(e) => handleInputChange(index, e, false)}
//           />
//           <input
//             type="text"
//             name="zomato_first_order_start"
//             placeholder="First Order Start"
//             value={form.zomato_first_order_start}
//             onChange={(e) => handleInputChange(index, e, false)}
//           />
//           <input
//             type="text"
//             name="zomato_first_order_end"
//             placeholder="First Order End"
//             value={form.zomato_first_order_end}
//             onChange={(e) => handleInputChange(index, e, false)}
//           />
//           {/* Additional additional inputs */}
//         </div>
//       ))}

//       <button onClick={addSlabForm}>Add New Slab</button> {/* Add new slab inputs */}
//       <button onClick={submitData}>Submit Data</button> {/* Submit all slabs */}
//     </div>
//   );
// };

// export default SlabManager;





import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { GloablFile } from '../Component/Recoil';

const DynamicFormWithPost = () => {



  const [file, setfile] = useRecoilState(GloablFile)


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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSlabChange = (index, e) => {
    const { name, value } = e.target;
    const newSlabs = [...formData.slabs];
    newSlabs[index][name] = value;
    setFormData({ ...formData, slabs: newSlabs });
  };

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

  const submitForm = async () => {
    try {
      const response = await axios.post('http://54.237.210.197:8000/surat/zomato/date/structure', formData);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
console.log(file)
  return (
    <div>
      <h2>Dynamic Input Form with POST</h2>
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
              type="date"
              name="from_date"
              value={slab.from_date}
              onChange={(e) => handleSlabChange(index, e)}
            />
          </div>

          <div>
            <label>To Date: </label>
            <input
              type="date"
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
      <button onClick={submitForm}>Submit Form</button>
    </div>
  );
};

export default DynamicFormWithPost;
