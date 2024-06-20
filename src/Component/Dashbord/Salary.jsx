


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, FileUploadresponse, Finalresponse, GloablFile, Num, Response } from '../Recoil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Circles } from 'react-loader-spinner'
import "react-datepicker/dist/react-datepicker.css"; // Import styles for date picker
import { format, isValid } from 'date-fns'; // Importing the isValid function to check date validity
import { parse } from 'date-fns';

const Salary = () => {


  const baseurl = useRecoilValue(BaseURLState);

  const [num, setnum] = useRecoilState(Num)

  const [res, setres] = useRecoilState(Response)

  const [error, seterror] = useState()
  const [final, setfinal] = useRecoilState(Finalresponse)

  const [fileupload, setFileupload] = useRecoilState(FileUploadresponse)
  console.log(fileupload, "the file response")


  const initialData = {
    file_key: fileupload,
    include_slab: true,
    slabs: [
      {
        from_date: "",
        to_date: "",
        zomato_first_order_start: 1,
        zomato_first_order_end: 29,
        zomato_first_week_amount: 30,
        zomato_first_weekend_amount: 32,
        zomato_second_order_start: 20,
        zomato_second_order_end: 25,
        zomato_second_week_amount: 25,
        zomato_second_weekend_amount: 27,
        zomato_order_greter_than: 26,
        zomato_third_week_amount: 30,
        zomato_third_weekend_amount: 32,
      },
    ],
    include_vahicle_charges: true,
    fulltime_average: 20,
    fulltime_greter_than_order: 20,
    vahicle_charges_fulltime: 100,
    partime_average: 11,
    partime_greter_than_order: 12,
    vahicle_charges_partime: 70,
    include_bonus: true,
    bonus_order_fulltime: 700,
    bonus_amount_fulltime: 1000,
    bonus_order_partime: 400,
    bonus_amount_partime: 500,
    include_rejection: true,
    rejection_orders: 2,
    rejection_amount: 20,
    include_bad_order: true,
    bad_orders: 2,
    bad_orders_amount: 20,
  };

  const [rentmodal, setRentModal] = useState(initialData);
  const [show, setshow] = useState(false)




  const addSlabForm = () => {
    setshow(true)
    const newSlab = {
      from_date: "",
      to_date: "",
      zomato_first_order_start: '',
      zomato_first_order_end: '',
      zomato_first_week_amount: '',
      zomato_first_weekend_amount: '',
      zomato_second_order_start: '',
      zomato_second_order_end: '',
      zomato_second_week_amount: '',
      zomato_second_weekend_amount: '',
      zomato_order_greter_than: '',
      zomato_third_week_amount: '',
      zomato_third_weekend_amount: '',
    };


    setRentModal((prevState) => ({
      ...prevState,
      slabs: [...prevState.slabs, newSlab], // Append the new slab to existing slabs
    }));
  };

  const handleSlabChange = (index, event) => {
    const { name, value, type } = event.target;
    const updatedSlabs = [...rentmodal.slabs];

    if (type === 'date') {
      try {
        const parsedDate = parse(value, 'yyyy-MM-dd', new Date());
        const formattedDate = format(parsedDate, 'dd-MM-yyyy'); // Correct date format with 4-digit year

        updatedSlabs[index][name] = formattedDate;
      } catch (error) {
        console.error(`Error parsing date at index ${index}:`, error); // Handle invalid date
      }
    } else {
      updatedSlabs[index][name] = value; // Update other input types directly
    }

    setRentModal((prevState) => ({
      ...prevState,
      slabs: updatedSlabs,
    }));
  };


  const [file, setfile] = useRecoilState(GloablFile)

  const [loading, setloding] = useState(false)

  console.log(rentmodal)

  const handleInputChange = (field, value) => {
    setRentModal((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };


  const handleCheckboxChange = (field) => {
    setRentModal((prevData) => ({
      ...prevData,
      [field]: !prevData[field],
    }));
  };


  const handleUpload2 = async () => {
    try {
      setloding(true); // Set loading state to true during the request

      const rentmodalJSON = JSON.stringify(rentmodal);

      // Perform the POST request to send data
      const response = await axios.post(
        `${baseurl}/surat/zomato/date/structure`,
        rentmodalJSON,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response && response.data) {
        console.log('Data sent successfully', response.data);

        // Set the response data to state
        setres(response.data);
        setfinal(response.data);
        setnum(1);
      } else {
        // Handle unexpected response structure
        console.warn('Unexpected response structure');
      }

      console.log(res, "the response");
    } catch (error) {
      console.error('Error sending data', error);

      // Handle cases where response data might be undefined
      if (error.response && error.response.data) {
        console.log('Response data:', error.response.data);
        toast.error(error.response.data.detail);
      } else {
        console.warn('No response data or undefined');
        toast.error('An error occurred');
      }
    } finally {
      setloding(false); // Set loading state to false regardless of success or failure
    }
  };


  function handleclick(val) {
    setnum(val)
  }

  const handleInputKeyDown = (e) => {
    // Prevent the default action if the key pressed is '-' or '+'
    if (e.key === '-' || e.key === '+' || e.key === 'e') {
      e.preventDefault();
    }
  };


  const handleDeleteLastSlab = () => {
    if (rentmodal.slabs.length > 1) {
      const updatedSlabs = rentmodal.slabs.slice(0, -1); // Remove the last slab
      setshow(false)
      setRentModal((prevData) => ({
        ...prevData, // Spread the rest of the state
        slabs: updatedSlabs, // Update with the new array without the last item
      }));
      toast.success("Deleted", { autoClose: 1000 });
    } else {
      toast.error('Cannot delete the only slab', { autoClose: 1000 }); // Display an error if there's only one slab
    }
  };





//   useEffect(() => {
//     const savedInputValues = localStorage.getItem('inputValuezomatosurat');
//     if (savedInputValues) {
//         setRentModal(JSON.parse(savedInputValues));
//     }
// }, []);

// // Effect to save inputValues to localStorage whenever it changes
// useEffect(() => {
  
//     localStorage.setItem('inputValuezomatosurat', JSON.stringify(rentmodal));
// }, [rentmodal]);


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
      {/* lg:h-3/6  xl:h-5/6 overflow-y-auto */}

      <div className="flex items-center justify-center mt-2     ">
        <ToastContainer />

        <main className="bg-white p-4 rounded shadow-lg w-120 lg:w-144  ">
          <h3 className="text-3xl text-center pb-2 font-bold">Zomato</h3>
          <div className='border-4 bg-slate-100 p-[50px] mb-3 '>


            <div className="overflow-x-auto    " style={{ maxHeight: '500px', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>




              <h3 className="text-3xl text-center pb-2 font-bold">Slab Sturcture</h3>






              {rentmodal.slabs.map((form, index) => (
                <div key={index}>
                  <table className="border border-gray-300 text-center mt-4 w-full">
                    <thead>
                      <tr className="text-center">
                        <th className="border border-gray-300 p-2">ORDER-FROM</th>
                        <th className="border border-gray-300 p-2">ORDER-TO</th>
                        <th className="border border-gray-300 p-2">MON-FRI</th>
                        <th className="border border-gray-300 p-2">SAT-SUN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {show && (
                        <tr>
                          <td className="border border-gray-300 p-2">
                            <input
                              type="date"
                              name="from_date"
                              value={
                                form.from_date
                                  ? format(parse(form.from_date, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd')
                                  : ''
                              }
                              onChange={(e) => handleSlabChange(index, e)}
                              className="text-center"
                              onKeyDown={handleInputKeyDown}
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            <input
                              type="date"
                              name="to_date"
                              value={
                                form.to_date
                                  ? format(parse(form.to_date, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd')
                                  : ''
                              }
                              onChange={(e) => handleSlabChange(index, e)}
                              className="text-center"
                              onKeyDown={handleInputKeyDown}
                            />
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            name="zomato_first_order_start"
                            placeholder="First Order Start"
                            value={form.zomato_first_order_start}
                            onChange={(e) => handleSlabChange(index, e)}
                            className="text-center"
                            onKeyDown={handleInputKeyDown}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            name="zomato_first_order_end"
                            placeholder="First Order End"
                            value={form.zomato_first_order_end}
                            onChange={(e) => handleSlabChange(index, e)}
                            className="text-center"
                            onKeyDown={handleInputKeyDown}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            name="zomato_first_week_amount"
                            placeholder="First Week Amount"
                            value={form.zomato_first_week_amount}
                            onChange={(e) => handleSlabChange(index, e)}
                            className="text-center"
                            onKeyDown={handleInputKeyDown}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            name="zomato_first_weekend_amount"
                            placeholder="First Weekend Amount"
                            value={form.zomato_first_weekend_amount}
                            onChange={(e) => handleSlabChange(index, e)}
                            className="text-center"
                            onKeyDown={handleInputKeyDown}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            name="zomato_second_order_start"
                            placeholder="Second Order Start"
                            value={form.zomato_second_order_start}
                            onChange={(e) => handleSlabChange(index, e)}
                            className="text-center"
                            onKeyDown={handleInputKeyDown}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            name="zomato_second_order_end"
                            placeholder="Second Order End"
                            value={form.zomato_second_order_end}
                            onChange={(e) => handleSlabChange(index, e)}
                            className="text-center"
                            onKeyDown={handleInputKeyDown}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            name="zomato_second_week_amount"
                            placeholder="Second Week Amount"
                            value={form.zomato_second_week_amount}
                            onChange={(e) => handleSlabChange(index, e)}
                            className="text-center"
                            onKeyDown={handleInputKeyDown}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            name="zomato_second_weekend_amount"
                            placeholder="Second Weekend Amount"
                            value={form.zomato_second_weekend_amount}
                            onChange={(e) => handleSlabChange(index, e)}
                            className="text-center"
                            onKeyDown={handleInputKeyDown}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            placeholder="Order"
                            readOnly
                            value="Order"
                            className="text-center"
                            onChange={(e) => handleSlabChange(index, e)}
                            onKeyDown={handleInputKeyDown}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            name="zomato_order_greter_than"
                            placeholder="Order Greater Than"
                            value={form.zomato_order_greter_than}
                            className="text-center"
                            onChange={(e) => handleSlabChange(index, e)}
                            onKeyDown={handleInputKeyDown}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            name="zomato_third_week_amount"
                            placeholder="Third Week Amount"
                            value={form.zomato_third_week_amount}
                            className="text-center"
                            onChange={(e) => handleSlabChange(index, e)}
                            onKeyDown={handleInputKeyDown}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            name="zomato_third_weekend_amount"
                            placeholder="Third Weekend Amount"
                            value={form.zomato_third_weekend_amount}
                            className="text-center"
                            onChange={(e) => handleSlabChange(index, e)}
                            onKeyDown={handleInputKeyDown}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}


              {/* {rentmodal.slabs.map((form, index) => (
                <div key={index}>
                  <table className="border border-gray-300 text-center mt-4 w-full">
                    <thead>
                      <tr className="text-center">
                        <th className="border border-gray-300 p-2">ORDER-TO</th>
                        <th className="border border-gray-300 p-2">ORDER-FROM</th>
                        <th className="border border-gray-300 p-2">MON-FRI</th>
                        <th className="border border-gray-300 p-2">SAT-SUN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {show && (

                        <tr>
                          <td className="border border-gray-300 p-2">
                            <input
                              type="date"
                              name="from_date"
                              value={
                                form.from_date
                                  ? format(parse(form.from_date, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd')
                                  : ''
                              }
                              onChange={(e) => handleSlabChange(index, e)}
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            <input
                              type="date"
                              name="to_date"
                              value={
                                form.to_date
                                  ? format(parse(form.to_date, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd')
                                  : ''
                              }
                              onChange={(e) => handleSlabChange(index, e)}
                            />
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name="zomato_first_order_start"
                            placeholder="First Order Start"
                            value={form.zomato_first_order_start}
                            onChange={(e) => handleSlabChange(index, e)}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name="zomato_first_order_end"
                            placeholder="First Order End"
                            value={form.zomato_first_order_end}
                            onChange={(e) => handleSlabChange(index, e)}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name="zomato_first_week_amount"
                            placeholder="First Week Amount"
                            value={form.zomato_first_week_amount}
                            onChange={(e) => handleSlabChange(index, e)}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name="zomato_first_weekend_amount"
                            placeholder="First Weekend Amount"
                            value={form.zomato_first_weekend_amount}
                            onChange={(e) => handleSlabChange(index, e)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name="zomato_second_order_start"
                            placeholder="Second Order Start"
                            value={form.zomato_second_order_start}
                            onChange={(e) => handleSlabChange(index, e)}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name="zomato_second_order_end"
                            placeholder="Second Order End"
                            value={form.zomato_second_order_end}
                            onChange={(e) => handleSlabChange(index, e)}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name="zomato_second_week_amount"
                            placeholder="Second Week Amount"
                            value={form.zomato_second_week_amount}
                            onChange={(e) => handleSlabChange(index, e)}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name="zomato_second_weekend_amount"
                            placeholder="Second Weekend Amount"
                            value={form.zomato_second_weekend_amount}
                            onChange={(e) => handleSlabChange(index, e)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            placeholder="Order"
                            className="text-center"
                            readOnly
                            value="Order"
                            onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name="zomato_order_greater_than"
                            placeholder="Order Greater Than"
                            value={form.zomato_order_greter_than}
                            onChange={(e) => handleSlabChange(index, e)}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name="zomato_third_week_amount"
                            placeholder="Third Week Amount"
                            value={form.zomato_third_week_amount}
                            onChange={(e) => handleSlabChange(index, e)}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name="zomato_third_weekend_amount"
                            placeholder="Third Weekend Amount"
                            value={form.zomato_third_weekend_amount}
                            onChange={(e) => handleSlabChange(index, e)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              ))} */}

              <div className="flex justify-end gap-8 mt-8 mb-4">
                <button
                  className="bg-blue-500 text-white p-2 gap-3 rounded"
                  onClick={addSlabForm}
                >
                  Add New Slab
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={handleDeleteLastSlab}
                >
                  Delete
                </button>
              </div>





              <h3 className="text-3xl text-center pt-4 mt-4  font-bold">Rent Sturcture</h3>
              <input
                type="checkbox"
                checked={rentmodal.include_vahicle_charges}
                onChange={() => handleCheckboxChange('include_vahicle_charges')}
              />
              <table className="min-w-full border border-gray-300 mt-4 text-center">

                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2"> WORK-TYPE</th>
                    <th className="border border-gray-300 p-2">ORDER</th>
                    <th className="border border-gray-300 p-2">AVG</th>
                    <th className="border border-gray-300 p-2">BIKE-RANT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        placeholder='FULL-TIME' className='text-center' readOnly
                        value={"FULL TIME"}
                        onChange={(e) => handleInputChange(e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.fulltime_greter_than_order}
                        onChange={(e) => handleInputChange('fulltime_greter_than_order', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        className='text-center'
                        min={0}

                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.fulltime_average}
                        onChange={(e) => handleInputChange('fulltime_average', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.vahicle_charges_fulltime}
                        onChange={(e) => handleInputChange('vahicle_charges_fulltime', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />
                    </td>

                  </tr>
                  {/* ... Repeat for other input fields */}
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text" placeholder='PART-TIME' className='text-center' readOnly
                        value={'PART_TIME'}
                        onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.partime_greter_than_order}
                        onChange={(e) => handleInputChange('partime_greter_than_order', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        className='text-center'
                        min={0}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.partime_average}
                        onChange={(e) => handleInputChange('partime_average', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.vahicle_charges_partime}
                        onChange={(e) => handleInputChange('vahicle_charges_partime', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />
                    </td>

                  </tr>
                </tbody>
              </table>









              <h3 className="text-3xl text-center pt-4 mt-4 font-bold">MONTHLY-BONUS</h3>
              <input
                type="checkbox"
                checked={rentmodal.include_bonus}
                onChange={() => handleCheckboxChange('include_bonus')}
              />
              <table className="min-w-full border border-gray-300 mt-4 text-center">

                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2"> WORK-TYPE</th>
                    <th className="border border-gray-300 p-2">ORDER</th>
                    <th className="border border-gray-300 p-2">INCENTIVE</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        placeholder='FULL-TIME' className='text-center' readOnly
                        value={"FULL_TIME"}
                        onChange={(e) => handleInputChange('bonusorder', 'vehicleChargesOrderFulltime', e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.bonus_order_fulltime}
                        onChange={(e) => handleInputChange('bonus_order_fulltime', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.bonus_amount_fulltime}
                        onChange={(e) => handleInputChange('bonus_amount_fulltime', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />
                    </td>


                  </tr>
                  {/* ... Repeat for other input fields */}
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text" placeholder='PART-TIME' className='text-center' readOnly
                        value={'PART_TIME'}
                        onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.bonus_order_partime}
                        onChange={(e) => handleInputChange('bonus_order_partime', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.bonus_amount_partime}
                        onChange={(e) => handleInputChange('bonus_amount_partime', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />
                    </td>


                  </tr>
                </tbody>
              </table>








              <h3 className="text-3xl text-center pt-4 mt-4  font-bold">Rejection ORDER</h3>
              <input
                type="checkbox"
                checked={rentmodal.include_rejection}
                onChange={() => handleCheckboxChange('include_rejection')}
              />
              <table className="min-w-full border border-gray-300 mt-4 text-center">

                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">ORDER-GRETHER-THAN-EQUAL-TO</th>
                    <th className="border border-gray-300 p-2">AMOUNT</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.rejection_orders}
                        onChange={(e) => handleInputChange('rejection_orders', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.rejection_amount}
                        onChange={(e) => handleInputChange('rejection_amount', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />
                    </td>
                  </tr>
                  {/* ... Repeat for other input fields */}
                </tbody>
              </table>









              <h3 className="text-3xl text-center pt-4 mt-4  font-bold">BAD ORDER</h3>
              <input
                type="checkbox"
                checked={rentmodal.include_bad_order}
                onChange={() => handleCheckboxChange('include_bad_order')}
              />
              <table className="min-w-full border border-gray-300 mt-4 text-center">

                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">ORDER-GRETHER-THAN-EQUAL-TO</th>
                    <th className="border border-gray-300 p-2">AMOUNT</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.bad_orders}
                        onChange={(e) => handleInputChange('bad_orders', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.bad_orders_amount}
                        onChange={(e) => handleInputChange('bad_orders_amount', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />
                    </td>
                  </tr>

                </tbody>
              </table>










              <div className='flex justify-between '>
                <button onClick={handleUpload2} className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
                <button onClick={() => handleclick(1)} className="mt-4 bg-blue-500 text-white p-2 rounded">back</button>
              </div>

            </div>


          </div>
        </main>
      </div>
    </>
  );
};

export default Salary;






// const addSlabForm = () => {
//   setSlabForms((prev) => [
//     ...prev,
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
//   ]);



// };

// const formData = new FormData();


// formData.append('rentmodal', JSON.stringify(rentmodal));


// Object.entries(rentmodal).forEach(([key, value]) => {
//   formData.append(key, value);
// });

// formData.append('file_key', res.file_key);
// console.log(formData)



// const [rentmodal, setRentModal] = useState({
//   include_slab: false,
//   zomato_first_order_start: 1,
//   zomato_first_order_end: 29,
//   zomato_first_week_amount: 30,
//   zomato_first_weekend_amount: 32,
//   zomato_second_order_start: 20,
//   zomato_second_order_end: 25,
//   zomato_second_week_amount: 25,
//   zomato_second_weekend_amount: 27,
//   zomato_order_greter_than: 26,
//   zomato_third_week_amount: 30,
//   zomato_third_weekend_amount: 32,
//   include_vahicle_charges: false,
//   fulltime_average: 21,
//   fulltime_greter_than_order: 21,
//   vahicle_charges_fulltime: 100,
//   partime_average: 11,
//   partime_greter_than_order: 11,
//   vahicle_charges_partime: 70,
//   include_bonus: false,
//   bonus_order_fulltime: 700,
//   bonus_amount_fulltime: 1000,
//   bonus_order_partime: 400,
//   bonus_amount_partime: 500,
//   include_rejection: false,
//   rejection_orders: 2,
//   rejection_amount: 20,
//   include_bad_order: false,
//   bad_orders: 2,
//   bad_orders_amount: 20,

// });



{/* 

              <h3 className="text-3xl text-center pb-9 font-bold">Slab Sturcture</h3>


              <input
                type="checkbox"
                checked={rentmodal.include_slab}
                onChange={() => handleCheckboxChange('include_slab')}
              />
              <table className=" border border-gray-300 text-center ">
                <thead >
                  <tr className='text-center'>
                    <th className="border border-gray-300 p-2">ORDER-TO</th>
                    <th className="border border-gray-300 p-2"> ORDER-FROM</th>
                    <th className="border border-gray-300 p-2">MON-FRI </th>
                    <th className="border border-gray-300 p-2">SAT-SUN </th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  <tr>

                    <td className="border border-gray-300 p-2 text-center">
                      <input
                        type="number"
                        min={0}
                        value={rentmodal.zomato_first_order_start}
                        placeholder='ordeTO'
                        onChange={(e) => handleInputChange('zomato_first_order_start', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        className='text-center'
                      />

                    </td>

                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.zomato_first_order_end}
                        onChange={(e) => handleInputChange('zomato_first_order_end', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.zomato_first_week_amount}
                        onChange={(e) => handleInputChange('zomato_first_week_amount', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.zomato_first_weekend_amount}
                        onChange={(e) => handleInputChange('zomato_first_weekend_amount', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />
                    </td>
                  </tr>
                  <tr>

                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.zomato_second_order_start}
                        onChange={(e) => handleInputChange('zomato_second_order_start', e.target.value)}
                        placeholder='ordeTO'
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'

                      />

                    </td>

                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.zomato_second_order_end}
                        onChange={(e) => handleInputChange('zomato_second_order_end', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'

                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.zomato_second_week_amount}
                        onChange={(e) => handleInputChange('zomato_second_week_amount', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.zomato_second_weekend_amount}
                        onChange={(e) => handleInputChange('zomato_second_weekend_amount', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />
                    </td>
                  </tr>


                  <tr>

                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={null}
                        className='text-center'
                        placeholder='ORDERTO >='
                        readOnly
                        onChange={(e) => handleInputChange('bonusorder', 'bonus_order_partime', e.target.value)}
                      />

                    </td>

                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.zomato_order_greter_than}
                        onChange={(e) => handleInputChange('zomato_order_greter_than', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.zomato_third_week_amount}
                        onChange={(e) => handleInputChange('zomato_third_week_amount', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={rentmodal.zomato_third_weekend_amount}
                        onChange={(e) => handleInputChange('zomato_third_weekend_amount', e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min={0}
                        className='text-center'
                      />
                    </td>
                  </tr>


                </tbody>
              </table> */}





















// const handleUpload2 = async () => {
//   try {
//     setloding(true)
//     // setRentModal((prevData) => ({
//     //   ...prevData,
//     //   file_key: fileupload,

//     // }));


//     const rentmodalJSON = JSON.stringify(rentmodal);





//     const response = await axios.post(`${baseurl}/surat/zomato/date/structure`, rentmodalJSON, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log('Data sent successfully', response.data);

//     setres(response.data)
//     setfinal(response.data)

//     setnum(1)


//     console.log(res + "the response" + setres)
//     console.log(res + "the data ")
//     console.log("api12 successfully ");
//   } catch (error) {
//     seterror(error)
//     console.error('Error sending data', error);
//     console.log('Response data:', error.response.data);
//     console.log('Response status:', error.response.status);
//     console.log('Response headers:', error.response.headers);
//     toast.error(error.response.data.detail)
//   } finally {

//     setloding(false); // Set loading to false regardless of success or error

//   }
// };



// const handleSlabChange = (index, e) => {
//   const { name, value } = e.target;
//   const newSlabs = [...rentmodal.slabs];
//   newSlabs[index][name] = value;
//   setRentModal({ ...rentmodal, slabs: newSlabs });
// };


// const handleInputChange1 = (index, e) => {
//   const { name, value } = e.target;

//   // Update specific slab form input
//   setSlabForms((prev) =>
//     prev.map((form, idx) => (idx === index ? { ...form, [name]: value } : form))
//   );
// };







// useEffect(() => {
//   const savedInputValues = localStorage.getItem('suratzomamto');
//   if (savedInputValues) {
//     setRentModal(JSON.parse(savedInputValues));
//   }
// }, []);

// // Effect to save inputValues to localStorage whenever it changes
// useEffect(() => {
//   console.log('bava');
//   localStorage.setItem('suratzomamto', JSON.stringify(rentmodal));
// }, [rentmodal]);










{/* <td className="border border-gray-300 p-2">
                        <input
                          type="date"
                          name="from_date"
                          placeholder="From Date"
                          value={form.from_date} 
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="date"
                          name="to_date"
                          placeholder="To Date"
                          value={form.to_date} 
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td> */}

{/* <td className="border border-gray-300 p-2">
                        <DatePicker
                          selected={form.from_date ? new Date(form.from_date) : null}
                          onChange={(date) => handleDateChange(index, date, 'from_date')}
                          dateFormat="dd-MM-yy" // Custom format
                          isClearable // Optional: allows clearing the date
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <DatePicker
                          selected={form.to_date ? new Date(form.to_date) : null}
                          onChange={(date) => handleDateChange(index, date, 'to_date')}
                          dateFormat="dd-MM-yy"
                          isClearable
                        />
                      </td> */}






// const handleSlabChange = (index, e) => {
//   const { name, value, type } = e.target; // Also get the 'type' property
//   const updatedSlabs = [...rentmodal.slabs];

//   // Apply date formatting only if the input type is 'date' and there's a non-empty value
//   if (type === 'date') {
//     updatedSlabs[index][name] = value
//       ? moment(value).format('DD-MM-YYYY') // Format if there's a valid value
//       : ''; // Keep empty fields as empty
//   } else {
//     updatedSlabs[index][name] = value; // Keep other types unchanged
//   }

//   setRentModal((prevState) => ({
//     ...prevState,
//     slabs: updatedSlabs,
//   }));
// };

// const handleSlabChange = (index, event) => {
//   const { name, value, type } = event.target;

//   // Format the date for display
//   const formattedValue = (type === 'date') ? format(new Date(value), 'dd-MM-yy') : value;

//   // Update the slab with the formatted value
//   const updatedSlabs = [...rentmodal.slabs];
//   updatedSlabs[index][name] = formattedValue;

//   // Update the state
//   setRentModal((prevState) => ({
//     ...prevState,
//     slabs: updatedSlabs,
//   }));
// };
// const handleSlabChange = (index, e) => {
//   const { name, value } = e.target;
//   const updatedSlabs = [...rentmodal.slabs];
//   updatedSlabs[index][name] = value; // Update the specific slab with new value
//   setRentModal((prevState) => ({
//     ...prevState,
//     slabs: updatedSlabs,
//   }));
// };


{/* {slabForms.map((form, index) => (
                <table className=" border border-gray-300 text-center mt-8 ">

                  <thead >
                    <tr className='text-center'>
                      <th className="border border-gray-300 p-2">ORDER-TO</th>
                      <th className="border border-gray-300 p-2"> ORDER-FROM</th>
                      <th className="border border-gray-300 p-2">MON-FRI </th>
                      <th className="border border-gray-300 p-2">SAT-SUN </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr key={index}>
              
                      <td className="border border-gray-300 p-2">
                        <input
                          type="date"
                          name="from_date"
                          placeholder="From Date"
                          value={form.from_date}
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="date"
                          name="to_date"
                          placeholder="To Date"
                          value={form.to_date}
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>
                    </tr>

                    <tr>

                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="zomato_first_order_start"
                          placeholder="First Order Start"
                          value={form.zomato_first_order_start}
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="zomato_first_order_end"
                          placeholder="First Order End"
                          value={form.zomato_first_order_end}
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="zomato_first_week_amount"
                          placeholder="First Week Amount"
                          value={form.zomato_first_week_amount}
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="zomato_first_weekend_amount"
                          placeholder="First Weekend Amount"
                          value={form.zomato_first_weekend_amount}
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>

                    </tr>

                    <tr>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="zomato_second_order_start"
                          placeholder="Second Order Start"
                          value={form.zomato_second_order_start}
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="zomato_second_order_end"
                          placeholder="Second Order End"
                          value={form.zomato_second_order_end}
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="zomato_second_week_amount"
                          placeholder="Second Week Amount"
                          value={form.zomato_second_week_amount}
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="zomato_second_weekend_amount"
                          placeholder="Second Weekend Amount"
                          value={form.zomato_second_weekend_amount}
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="zomato_order_greter_than"
                          placeholder="Order Greater Than"
                          value={form.zomato_order_greter_than}
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="zomato_third_week_amount"
                          placeholder="Third Week Amount"
                          value={form.zomato_third_week_amount}
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="zomato_third_weekend_amount"
                          placeholder="Third Weekend Amount"
                          value={form.zomato_third_weekend_amount}
                          onChange={(e) => handleSlabChange(index, e)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table >
              ))} */}



// const handleDateChange = (index, date, name) => {
//   try {


//     const formattedDate = format(date, 'dd-MM-yy'); // Format the date
//     const updatedSlabs = [...rentmodal.slabs];
//     updatedSlabs[index][name] = formattedDate;

//     setRentModal((prevState) => ({
//       ...prevState,
//       slabs: updatedSlabs,
//     }));
//   } catch (error) {
//     console.error("Error updating date:", error); // Log specific error
//   }
// };