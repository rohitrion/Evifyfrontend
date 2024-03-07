

import axios from 'axios';

import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, GloablFile, Num } from '../Recoil';




const Salary = () => {



    // const [api1Checked, setApi1Checked] = useState(false);
    // const [api2Checked, setApi2Checked] = useState(false);
    const baseurl = useRecoilValue(BaseURLState);

    const [num, setnum] = useRecoilState(Num)

    // const handleCheckboxChange = (apiFunction) => {
    //     switch (apiFunction) {
    //         case 'api1':
    //             setApi1Checked(!api1Checked);
    //             break;
    //         case 'api2':
    //             setApi2Checked(!api2Checked);
    //             break;
    //         default:
    //             break;
    //     }
    // };


    const handleButtonClick = () => {
        // Check which checkboxes are checked and call the corresponding API functions


            handleUpload();

            handleUpload2();


            setnum(1)

    };


    const initialInputValues = [

        { first_order_to: 1, first_order_from: 20, first_weekdays: 0, first_weekend: 0 },
        { second_order_to: 20, second_order_from: 100, second_weekdays: 0, second_weekend: 0 },
        { order_grether_than: null, week_amount: 0, weekend_amount: 0 },
        { maximum_rejection: null, rejection_amount: 0, maximum_bad_orders: 0, bad_order_amount: 0 },
        // Add more rows as needed
    ];



    const [isChecked, setIsChecked] = useState({
      slab: false,
      vehicle_charges: false,
      bonus: false,
      rejection: false,
  });


  const handleCheckboxChange = (type) => {
    setIsChecked((prevChecked) => ({
        ...prevChecked,
        [type]: !prevChecked[type],
    }));
};

    const rentmodal = [
        { Full_Time: 'Full_Time', vahicle_charges_order_fulltime: 20, dash: null, vahicle_charges_fulltime: 100 },
        { Part_time: 'Part_time', vehicle_charges_order_partime: 12, dash: null, vahicle_charges_partime: 70 },

        { Full_Time: 'Full_Time', bonus_order_fulltime: 700, dash: null, bonus_amount_fulltime: 1000 },
        { Part_time: 'Part_time', bonus_order_partime: 400, dash: null, bonus_amount_partime: 500 }

        // Add more rows as needed
    ];





    // const Incentive = [
    //     { orderTo: null, orderFrom: 20, weekdays: 0, weekend: 0 },
    //     { orderTo: null, orderFrom: 100, weekdays: 0, weekend: 0 },
    //     // Add more rows as needed
    // ];



    const [file, setfile] = useRecoilState(GloablFile)


    const [inputValues, setInputValues] = useState(initialInputValues);

    const [rant, setrant] = useState(rentmodal)



    const handleInputChange = (e, rowIndex, columnName) => {
        const { value } = e.target;
        const numericValue = parseInt(value, 10) || 0;

        setInputValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[rowIndex][columnName] = value;
            return newValues;
        });
    };




    const handleInputChange2 = (e, rowIndex, columnName) => {
        const { value } = e.target;
        const numericValue = parseInt(value, 10) || 0;

        setrant((prevValues) => {
            const newValues = [...prevValues];
            newValues[rowIndex][columnName] = value;
            return newValues;
        });
    };



    // const handleInputChange3 = (e, rowIndex, columnName) => {
    //     const { value } = e.target;
    //     const numericValue = parseInt(value, 10) || 0;

    //     setIncentive((prevValues) => {
    //         const newValues = [...prevValues];
    //         newValues[rowIndex][columnName] = value;
    //         return newValues;
    //     });
    // };


    const logValues = () => {
        console.log(inputValues,isChecked.slab);

    };



    const logValues2 = () => {
        console.log(rant);
    };



    // const logValues3 = () => {
    //     console.log(incentive);
    // };





    const handleUpload = async () => {
        try {


            const formData = new FormData();

            // Append input values as JSON data
            formData.append('inputValues', JSON.stringify(initialInputValues));

            // Append the global file
            formData.append('file', file);

            Object.entries(isChecked).forEach(([type, value]) => {
              formData.append(`isChecked_${type}`, value);
          });
            // Replace 'your-api-endpoint' with the actual endpoint of your API
            const response = await axios.post(`${baseurl}/surat/zomato/structure1`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Data sent successfully', response.data);

            console.log("api1 successfully ")

        } catch (error) {
            console.error('Error sending data', error);
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
        } finally {

        }
    };





    const handleUpload2 = async () => {
        try {


            const formData = new FormData();

            // Append input values as JSON data
            formData.append('inputValues', JSON.stringify(rentmodal));

            // Append the global file
            formData.append('file', file);
            Object.entries(isChecked).forEach(([type, value]) => {
              formData.append(`isChecked_${type}`, value);
          });
            // Replace 'your-api-endpoint' with the actual endpoint of your API
            const response = await axios.post(`${baseurl}/surat/zomato/structure2?`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Data sent successfully', response.data);
            console.log("api12  successfully ")

        } catch (error) {
            console.error('Error sending data', error);
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
        } finally {

        }
    };









    return (
        <div className="flex items-center justify-center pl-[80px] mb-10 ml-40 ">

            <main className="bg-white p-4 rounded shadow-lg w-120 lg:w-144 overflow-y-auto max-h-[900px] ">
                <h3 className="text-3xl text-center pb-9 font-bold">Zomato</h3>
                <div className='border-4 bg-slate-100 p-[50px] '>
                    <h3 className="text-3xl text-center pb-9 font-bold">Slab Sturcture</h3>


                    <input
                        className='mb-4'
                        type="checkbox"

                        checked={isChecked.slab}
                        onChange={() => handleCheckboxChange('slab')}
                    />
                    <table className="w-[800px] h-60 border-collapse border border-gray-800">
                        <thead>
                            <tr>
                                <th className="border border-gray-800 p-2">Order To</th>
                                <th className="border border-gray-800 p-2">Order From</th>
                                <th className="border border-gray-800 p-2">Weekdays</th>
                                <th className="border border-gray-800 p-2">Weekend</th>
                            </tr>
                        </thead>
                        <tbody>
           
                            <tr>
                                {/* Input fields for Table 1 */}
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[0].first_order_to}
                                        onChange={(e) => handleInputChange(e, 0, 'first_order_to')}
                                        placeholder="Order To "
                                        className="w-full p-1"
                                        min={0}
                                        name={`first_order_to_${0}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[0].first_order_from}
                                        onChange={(e) => handleInputChange(e, 0, 'first_order_from')}
                                        placeholder="Order From"
                                        className="w-full p-1"
                                        min={0}
                                        name={`first_order_from_${0}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[0].first_weekdays}
                                        onChange={(e) => handleInputChange(e, 0, 'first_weekdays')}
                                        placeholder="Weekdays"
                                        className="w-full p-1"
                                        min={0}
                                        name={`first_weekdays_${0}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[0].first_weekend}
                                        onChange={(e) => handleInputChange(e, 0, 'first_weekend')}
                                        placeholder="Weekend"
                                        className="w-full p-1"
                                        min={0}
                                        name={`first_weekend_${0}`}
                                    />
                                </td>
                            </tr>

                            <tr>
                                {/* Input fields for Table 2 */}
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[1].second_order_to}
                                        onChange={(e) => handleInputChange(e, 1, 'second_order_to')}
                                        placeholder="Second Order To"
                                        className="w-full p-1"
                                        min={0}
                                        name={`second_order_to_${1}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[1].second_order_from}
                                        onChange={(e) => handleInputChange(e, 1, 'second_order_from')}
                                        placeholder="Second Order From"
                                        className="w-full p-1"
                                        min={0}
                                        name={`second_order_from_${1}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[1].second_weekdays}
                                        onChange={(e) => handleInputChange(e, 1, 'second_weekdays')}
                                        placeholder="Second Weekdays"
                                        className="w-full p-1"
                                        min={0}
                                        name={`second_weekdays_${1}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[1].second_weekend}
                                        onChange={(e) => handleInputChange(e, 1, 'second_weekend')}
                                        placeholder="Second Weekend"
                                        className="w-full p-1"
                                        min={0}
                                        name={`second_weekend_${1}`}
                                    />
                                </td>
                            </tr>

                       

                            <tr>
                                {/* Input fields for Table 3 */}
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[2].order_grether_than}
                                        onChange={(e) => handleInputChange(e, 2, 'order_grether_than')}
                                        placeholder="Order Greater Than"
                                        className="w-full p-1"
                                        min={0}
                                        name={`order_grether_than_${2}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[2].week_amount}
                                        onChange={(e) => handleInputChange(e, 2, 'week_amount')}
                                        placeholder="Week Amount"
                                        className="w-full p-1"
                                        min={0}
                                        name={`week_amount_${2}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[2].weekend_amount}
                                        onChange={(e) => handleInputChange(e, 2, 'weekend_amount')}
                                        placeholder="Weekend Amount"
                                        className="w-full p-1"
                                        min={0}
                                        name={`weekend_amount_${2}`}
                                    />
                                </td>
                            </tr>


                            <tr>
                                {/* Input fields for Table 4 */}
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[3].maximum_rejection}
                                        onChange={(e) => handleInputChange(e, 3, 'maximum_rejection')}
                                        placeholder="Maximum Rejection"
                                        className="w-full p-1"
                                        min={0}
                                        name={`maximum_rejection_${3}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[3].rejection_amount}
                                        onChange={(e) => handleInputChange(e, 3, 'rejection_amount')}
                                        placeholder="Rejection Amount"
                                        className="w-full p-1"
                                        min={0}
                                        name={`rejection_amount_${3}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[3].maximum_bad_orders}
                                        onChange={(e) => handleInputChange(e, 3, 'maximum_bad_orders')}
                                        placeholder="Maximum Bad Orders"
                                        className="w-full p-1"
                                        min={0}
                                        name={`maximum_bad_orders_${3}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[3].bad_order_amount}
                                        onChange={(e) => handleInputChange(e, 3, 'bad_order_amount')}
                                        placeholder="Bad Order Amount"
                                        className="w-full p-1"
                                        min={0}
                                        name={`bad_order_amount_${3}`}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>

                {/* rent models */}

                <div className='border-4 bg-slate-100 p-[50px]'>
                    <h3 className="text-3xl text-center pb-9 font-bold">Rent Modal</h3>
                    <input
                        className='mb-4'
                        type="checkbox"
                        checked={isChecked.vehicle_charges}
                        onChange={() => handleCheckboxChange('vehicle_charges')}
                    />
                    <table className="w-[800px] h-60 border-collapse border border-gray-800">
                        <thead>
                            <tr>
                                <th className="border border-gray-800 p-2">Work_Type</th>
                                <th className="border border-gray-800 p-2">Average</th>
                                <th className="border border-gray-800 p-2">logs</th>
                                <th className="border border-gray-800 p-2">Rant_per_than</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="text"

                                        value={rant[0].Full_Time}
                                        onChange={(e) => handleInputChange2(e, 0, 'Full_Time')}
                                        placeholder="Full_Time"
                                        className="w-full p-1 text-white bg-black text-center"
                                        min={0}
                                        name={`Full_Time${0}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[0].vahicle_charges_order_fulltime}
                                        onChange={(e) => handleInputChange2(e, 0, 'vahicle_charges_order_fulltime')}
                                        placeholder="Full_Time"
                                        className="w-full p-1"
                                        min={0}
                                        name={`vahicle_charges_order_fulltime${0}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[0].dash}
                                        onChange={(e) => handleInputChange2(e, 0, 'dash')}
                                        placeholder="null"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[0].vahicle_charges_fulltime}
                                        onChange={(e) => handleInputChange2(e, 0, 'vahicle_charges_fulltime')}
                                        placeholder="vahicle_charges_fulltime"
                                        className="w-full p-1"
                                        min={0}
                                        name={`vahicle_charges_fulltime${0}`}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="text"
                                        value={rant[1].Part_time}
                                        onChange={(e) => handleInputChange2(e, 1, 'Part_time')}
                                        placeholder="Part_time"
                                        className="w-full p-1 text-white bg-black text-center"
                                        min={0}
                                        name={`Part_time${1}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[1].vehicle_charges_order_partime}
                                        onChange={(e) => handleInputChange2(e, 1, 'vehicle_charges_order_partime')}
                                        placeholder="Placeholder 6"
                                        className="w-full p-1"
                                        min={0}
                                        name={`vehicle_charges_order_partime${1}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[1].dash}
                                        onChange={(e) => handleInputChange2(e, 1, 'dash')}
                                        placeholder="null"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[1].vahicle_charges_partime}
                                        onChange={(e) => handleInputChange2(e, 1, 'vahicle_charges_partime')}
                                        placeholder="Placeholder 8"
                                        className="w-full p-1"
                                        min={0}
                                        name={`vahicle_charges_partime${1}`}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>

                    {/* <button onClick={logValues2} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Log Values</button> */}
                </div>

                {/* month rentmodal */}
                <div className='border-4 bg-slate-100 p-[50px]'>
                    <h3 className="text-3xl text-center pb-9 font-bold">Monthly Incentive</h3>

                    <input
                        className='mb-4'
                        type="checkbox"
                        checked={isChecked.vehicle_charges}
                        onChange={() => handleCheckboxChange('vehicle_charges')}
                    />
                    <table className="w-[800px] h-60 border-collapse border border-gray-800">
                        <thead>
                            <tr>
                                <th className="border border-gray-800 p-2">Work_Type</th>
                                <th className="border border-gray-800 p-2">Order Grether Than equal to</th>
                                <th className="border border-gray-800 p-2">Log_Hr-Greather_than</th>
                                <th className="border border-gray-800 p-2">Incentive</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="text"
                                        value={rant[2].Full_Time}
                                        onChange={(e) => handleInputChange2(e, 2, 'Full_Time')}
                                        placeholder="Full_Time"
                                        className="w-full p-1 text-white text-center bg-black "
                                        min={0}
                                        name={`Full_Time${2}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[2].bonus_order_fulltime}
                                        onChange={(e) => handleInputChange2(e, 2, 'bonus_order_fulltime')}
                                        placeholder="Placeholder 2"
                                        className="w-full p-1"
                                        min={0}
                                        name={`bonus_order_fulltime${2}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[2].dash}
                                        onChange={(e) => handleInputChange2(e, 2, 'dash')}
                                        placeholder="null"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[2].bonus_amount_fulltime}
                                        onChange={(e) => handleInputChange2(e, 2, 'bonus_amount_fulltime')}
                                        placeholder="Placeholder 2"
                                        className="w-full p-1"
                                        min={0}
                                        name={`bonus_amount_fulltime${2}`}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="text"
                                        value={rant[3].Part_time}
                                        onChange={(e) => handleInputChange2(e, 3, 'Part_time')}
                                        placeholder="Part_time "
                                        className="w-full p-1 text-white bg-black text-center"
                                        min={0}
                                        name={`Part_time${3}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[3].bonus_order_partime}
                                        onChange={(e) => handleInputChange2(e, 3, 'bonus_order_partime')}
                                        placeholder="Placeholder 6"
                                        className="w-full p-1"
                                        min={0}
                                        name={`bonus_order_partime${3}`}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[3].dash}
                                        onChange={(e) => handleInputChange2(e, 3, 'dash')}
                                        placeholder="null"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[3].bonus_amount_partime}
                                        onChange={(e) => handleInputChange2(e, 3, 'bonus_amount_partime')}
                                        placeholder="bonus_amount_partime"
                                        className="w-full p-1"
                                        min={0}
                                        name={`bonus_amount_partime${3}`}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>


                </div>
                <button onClick={() => { logValues(); logValues2(); }} > submit </button>
                <button onClick={handleButtonClick} className="mt-4  ml-[800px] bg-blue-500 text-white px-4 py-2   text-left rounded">Save</button>
            </main>

        </div>
    );
};

export default Salary;


















// <div>
    //   {/* Your form JSX with checkboxes, input fields, and file input */}
    //   {/* Example: */}
    //   <input
    //     type="checkbox"
    //     checked={rentmodal.slab}
    //     onChange={() => handleCheckboxChange('slab')}
    //   />
    //   <input
    //     type="text"
    //     value={rentmodal.zomatoFirstOrder.zomato_first_order_start}
    //     onChange={(e) => handleInputChange('zomatoFirstOrder', 'zomato_first_order_start', e.target.value)}
    //   />

    //   <input
    //     type="text"
    //     value={rentmodal.zomatoFirstOrder.zomato_first_order_end}
    //     onChange={(e) => handleInputChange('zomatoFirstOrder', 'zomato_first_order_end', e.target.value)}
    //   />



    //   <input
    //     type="text"
    //     value={rentmodal.zomatoFirstOrder.zomato_first_order_amount}
    //     onChange={(e) => handleInputChange('zomatoFirstOrder', 'zomato_first_order_amount', e.target.value)}
    //   />

    //   <input
    //     type="text"
    //     value={rentmodal.zomatoFirstOrder.zomato_order_greter_than}
    //     onChange={(e) => handleInputChange('zomatoFirstOrder', 'zomato_order_greter_than', e.target.value)}
    //   />


    //   <input
    //     type="text"
    //     value={rentmodal.zomatoFirstOrder.zomato_second_order_amount}
    //     onChange={(e) => handleInputChange('zomatoFirstOrder', 'zomato_second_order_amount', e.target.value)}
    //   />




    //   {/* ... Repeat for other input fields */}

    //   <input
    //     type="checkbox"
    //     checked={rentmodal.vehicle}
    //     onChange={() => handleCheckboxChange('vehicle')}
    //   />
    //   <input
    //     type="text"
    //     value={rentmodal.vehicle.vehicleChargesOrderFulltime}
    //     onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
    //     placeholder="Vehicle Charges Order Fulltime"
    //   />
    //   <input
    //     type="text"
    //     value={rentmodal.vehicle.vehicleChargesFulltime}
    //     onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesFulltime', e.target.value)}
    //     placeholder="Vehicle Charges Fulltime"
    //   />
    //   <input
    //     type="text"
    //     value={rentmodal.vehicle.vehicleChargesOrderPartime}
    //     onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderPartime', e.target.value)}
    //     placeholder="Vehicle Charges Order Partime"
    //   />
    //   <input
    //     type="text"
    //     value={rentmodal.vehicle.vehicleChargesPartime}
    //     onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesPartime', e.target.value)}
    //     placeholder="Vehicle Charges Partime"
    //   />
    //   {/* <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} /> */}
    //   <button onClick={handleUpload2}>Submit</button>
    // </div>