

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Circles } from 'react-loader-spinner'
import { BaseURLState, Finalresponse, GloablFile, Num, Response } from '../Recoil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const Zbonus = () => {


  const baseurl = useRecoilValue(BaseURLState);

  const [num, setnum] = useRecoilState(Num)

  const [res, setres] = useRecoilState(Response);

  const [final, setfinal] = useRecoilState(Finalresponse)

  const [loading, setloding] = useState(false)
  const [rentmodal, setRentModal] = useState({


    amount: 12
  });

  const [file, setfile] = useRecoilState(GloablFile)

  console.log(rentmodal)

  // const handleInputChange = (field, value) => {
  //     setRentModal((prevData) => ({
  //         ...prevData,
  //         [field]: value,
  //     }));
  // };


  const handleCheckboxChange = (field) => {
    setRentModal((prevData) => ({
      ...prevData,
      [field]: !prevData[field],
    }));
  };

  const handleUpload2 = async () => {
    try {
      setloding(true)
      const formData = new FormData();


      formData.append('rentmodal', JSON.stringify(rentmodal));


      Object.entries(rentmodal).forEach(([key, value]) => {
        formData.append(key, value);
      });


      formData.append('file', file);
      console.log(formData)
      // /ahmedabad/bbnow/structure1/{file_id}/{file_name}
      // Get Salary
      const response = await axios.post(`${baseurl}/ahmedabad/flipkart/structure1/${final.file_id}/${final.file_name}`, formData, {

        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Data sent successfully', response.data);
      setnum(15)
      console.log("api12 successfully ");
      setfinal(response.data);

    } catch (error) {
      toast.error(error.response.data.detail)
      console.error('Error sending data', error);
      console.log('Response data:', error.response.data);
      console.log('Response status:', error.response.status);
      console.log('Response headers:', error.response.headers);
    } finally {
      setloding(false)
    }
  };


  console.log(res.file_id + "the data from zomatao" + res.file_name)
  function handleclick(val) {
    setnum(val)
  }
  const handleInputKeyDown = (e) => {
    // Prevent the default action if the key pressed is '-' or '+'
    if (e.key === '-' || e.key === '+' || e.key === 'e') {
      e.preventDefault();
    }
  };


 
 
 
 

  // useEffect(() => {
  //     const savedInputValues = localStorage.getItem('inputValuesahflipkart');
  //     if (savedInputValues) {
  //       setRentModal(JSON.parse(savedInputValues));
  //     }
  //   }, []);

  //   // Effect to save inputValues to localStorage whenever it changes
  //   useEffect(() => {
  //     localStorage.setItem('inputValuesahflipkart', JSON.stringify(rentmodal));
  //   }, [rentmodal]);
  const [inputs, setInputs] = useState([{ name: '', clients: "", city: '', address: '', dateto: "", datefrom: "", days: [], orderto: "", orderfrom: "", present: "", incentive: "", pentalty: "" }]);

  // Options for days
  const dayOptions = [
    { value: 'mon', label: 'Monday' },
    { value: 'tue', label: 'Tuesday' },
    { value: 'wed', label: 'Wednesday' },
    { value: 'thu', label: 'Thursday' },
    { value: 'fri', label: 'Friday' },
    { value: 'sat', label: 'Saturday' },
    { value: 'sun', label: 'Sunday' }
  ];

  // Options for cities
  const cityOptions = [
    { value: 'city1', label: 'City 1' },
    { value: 'city2', label: 'City 2' },
    { value: 'city3', label: 'City 3' }
  ];

  const clients = [
    { value: 'zomato', label: 'zomato' },
    { value: 'Swiggy', label: 'Swiggy' },
    { value: 'Blinkit', label: 'Blinkit' },
    { value: 'Bluedart', label: 'Bluedart' },
    { value: 'flipkart', label: 'flipkart' }
  ];


  const present = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  // Function to handle input change
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
  };

  // Function to handle multi-select change
  const handleMultiSelectChange = (index, selectedOptions) => {
    const newInputs = [...inputs];
    newInputs[index]['days'] = selectedOptions.map(option => option.value);
    setInputs(newInputs);
  };

  // Function to handle city select change
  const handleCityChange = (index, selectedOption) => {
    const newInputs = [...inputs];
    newInputs[index]['city'] = selectedOption.value;
    setInputs(newInputs);
  };



  // Function to handle city select change
  const handleCliendtChange = (index, selectedOption) => {
    const newInputs = [...inputs];
    newInputs[index]['clients'] = selectedOption.value;
    setInputs(newInputs);
  };



  const handlePresentChange = (index, selectedOption) => {
    const newInputs = [...inputs];
    newInputs[index]['present'] = selectedOption.value;
    setInputs(newInputs);
  };


  // Function to handle adding new input fields
  const handleAddInput = () => {
    setInputs([...inputs, { name: '', clients: "", city: '', address: '', dateto: "", datefrom: "", days: [], orderto: "", orderfrom: "", present: "", incentive: "", pentalty: "" }]);
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 100, // Ensure high z-index
      position: 'relative', // Relative position to avoid issues
    }),
    control: (provided) => ({
      ...provided,
      zIndex: 100, // Also set z-index for the control
    }),
  };

  return (


    <>

      {loading && (
        <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-opacity-60 bg-gray-300">
          <div className="ml-40">
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </div>
      )}

      {/* <div class="flex items-center justify-center mt-2 ">
        <main class="bg-white p-4 rounded shadow-lg lg:w-4/5">
          <h3 class="text-3xl text-center pb-2 font-bold">Bonus</h3>
          <div className='border-4 bg-slate-100 p-4'>
            <div>
              <h3 className="text-3xl text-center pt-2 mt-2 font-bold">Surat</h3>

              <div className="overflow-x-auto">
                <table className="">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Client</th>
                      <th className="border px-4 py-2">Date to</th>
                      <th className="border px-4 py-2">Date from</th>
                      <th className="border px-4 py-2">Days</th>
                      <th className="border px-4 py-2">Order To</th>
                      <th className="border px-4 py-2">Order From</th>
                      <th className="border px-4 py-2">Present</th>
                      <th className="border px-4 py-2">Incentive</th>
                      <th className="border px-4 py-2">Penalty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inputs.map((input, index) => (
                      <tr key={index} classsname=" px-64 py-64">
                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder="Name"
                            className="border rounded px-2 py-1 w-24"
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <Select
                            options={clients}
                            value={clients.find(option => option.value === input.clients)}
                            onChange={(selectedOption) => handleCliendtChange(index, selectedOption)}
                            className="border rounded px-2 py-1 w-40"
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <input
                            type="date"
                            name="dateto"
                            value={input.dateto}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder="Date to"
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <input
                            type="date"
                            name="datefrom"
                            value={input.datefrom}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder="Date from"
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <Select
                            isMulti
                            delimiter
                            options={dayOptions}
                            value={dayOptions.filter(option => input.days.includes(option.value))}
                            onChange={(selectedOptions) => handleMultiSelectChange(index, selectedOptions)}
                            className="border rounded px-2 py-1 w-40"
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            name="orderto"
                            value={input.orderto}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder="Order To"
                            className="border rounded px-2 py-1 w-20"
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            name="orderfrom"
                            value={input.orderfrom}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder="Order From"
                            className="border rounded px-2 py-1 w-20"
                          />


                        </td>

                        <td className="border px-4 py-2">
                          <Select
                            options={present}
                            value={present.find(option => option.value === input.present)}
                            onChange={(selectedOption) => handlePresentChange(index, selectedOption)}
                            className="border rounded px-2 py-1 w-40"
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            name="incentive"
                            value={input.incentive}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder="Incentive"
                            className="border rounded px-2 py-1 w-20"
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            name="penalty"
                            value={input.pentalty}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder="Penalty"
                            className="border rounded px-2 py-1 w-20"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div class='flex justify-between mt-4'>
                <button onClick={handleUpload2} class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                <div className='flex gap-3'>
                  <button onClick={handleAddInput} class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add
                  </button>
                  <button onClick={() => handleclick(1)} class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button></div>

              </div>
            </div>
          </div>
        </main>
      </div> */}
<div className="flex justify-center items-center  mt-2">
  <main className="bg-white p-6 rounded shadow-lg w-full max-w-7xl">
    <h3 className="text-3xl text-center pb-4 font-bold">Bonus</h3>
    <div className="border-4 bg-slate-100 p-4">
      <h3 className="text-3xl text-center font-bold">Surat</h3>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-center relative">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2  ">Client</th>
              <th className="border px-4 py-2">Date from</th>
              <th className="border px-4 py-2">Date to</th>
              <th className="border px-4 py-2">Days</th>
              <th className="border px-4 py-2">Order From</th>
              <th className="border px-4 py-2">Order to</th>
              <th className="border px-4 py-2">Present</th>
              <th className="border px-4 py-2">Incentive</th>
              <th className="border px-4 py-2">Penalty</th>
            </tr>
          </thead>
          <tbody>
            {inputs.map((input, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Name"
                    className="border rounded px-2 py-1 w-24"
                  />
                </td>
                <td className="border px-4 py-2">
                  <Select
                    options={clients}
                    value={clients.find((option) => option.value === input.clients)}
                    onChange={(selectedOption) => handleCliendtChange(index, selectedOption)}
                    className="w-40 z-90"  styles={customStyles} 
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="date"
                    name="dateto"
                    value={input.dateto}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Date to"
                    className="w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="date"
                    name="datefrom"
                    value={input.datefrom}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Date from"
                    className="w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <Select
                    isMulti
                    delimiter
                    options={dayOptions}
                    value={dayOptions.filter((option) => input.days.includes(option.value))}
                    onChange={(selectedOptions) => handleMultiSelectChange(index, selectedOptions)}
                    className="w-40"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="orderto"
                    value={input.orderto}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Order To"
                    className="w-20"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="orderfrom"
                    value={input.orderfrom}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Order From"
                    className="w-20"
                  />
                </td>
                <td className="border px-4 py-2">
                  <Select
                    options={present}
                    value={present.find((option) => option.value === input.present)}
                    onChange={(selectedOption) => handlePresentChange(index, selectedOption)}
                    className="w-40 z-30"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="incentive"
                    value={input.incentive}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Incentive"
                    className="w-20"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="penalty"
                    value={input.pentalty}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Penalty"
                    className="w-20"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={handleUpload2} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
        <div className="flex gap-3">
          <button onClick={handleAddInput} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add
          </button>
          <button onClick={() => handleclick(1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back
          </button>
        </div>
      </div>
    </div>
  </main>
</div>

    </>
  );
};

export default Zbonus;
