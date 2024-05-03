
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, FileUploadresponse, Finalresponse, GloablFile, Num, Response } from '../Recoil';
import { Circles } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format, isValid } from 'date-fns'; // Importing the isValid function to check date validity
import { parse } from 'date-fns';

const Swiggy = () => {


    const baseurl = useRecoilValue(BaseURLState);

    const [num, setnum] = useRecoilState(Num)

    const [res, setres] = useRecoilState(Response);

    const [final, setfinal] = useRecoilState(Finalresponse)
    const [loading, setloding] = useState(false)
    const [show, setshow] = useState(false)
    const [file, setfile] = useRecoilState(GloablFile)
    const [filerespose, setfileresponse] = useRecoilState(FileUploadresponse)

    const initialData = {

        raw_file_key: filerespose,
        file_id: res.file_id,
        file_name: res.file_name,
        include_slab: true,
        slabs: [
            {
                from_date: "",
                to_date: "",
                swiggy_first_order_start: 1,
                swiggy_first_order_end: 19,
                swiggy_first_week_amount: 20,
                swiggy_first_weekend_amount: 22,
                swiggy_second_order_start: 20,
                swiggy_second_order_end: 25,
                swiggy_second_week_amount: 25,
                swiggy_second_weekend_amount: 27,
                swiggy_order_greater_than: 26,
                swiggy_third_week_amount: 30,
                swiggy_third_weekend_amount: 32
            }
        ],
        include_vehicle_charges: true,
        fulltime_average: 20,
        fulltime_greater_than_order: 20,
        vehicle_charges_fulltime: 100,
        parttime_average: 11,
        parttime_greater_than_order: 12,
        vehicle_charges_parttime: 70,
        include_bonus: true,
        bonus_order_fulltime: 700,
        bonus_amount_fulltime: 1000,
        bonus_order_parttime: 400,
        bonus_amount_parttime: 500,
        include_rejection: true,
        rejection_orders: 2,
        rejection_amount: 20,
        include_bad_order: true,
        bad_orders: 2,
        bad_orders_amount: 20
    }



    const [rentmodal, setRentModal] = useState(initialData)






    const addSlabForm = () => {
        setshow(true)
        const newSlab = {
            from_date: "",
            to_date: "",
            swiggy_first_order_start: 1,
            swiggy_first_order_end: 19,
            swiggy_first_week_amount: 20,
            swiggy_first_weekend_amount: 22,
            swiggy_second_order_start: 20,
            swiggy_second_order_end: 25,
            swiggy_second_week_amount: 25,
            swiggy_second_weekend_amount: 27,
            swiggy_order_greater_than: 26,
            swiggy_third_week_amount: 30,
            swiggy_third_weekend_amount: 32
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
                `${baseurl}/surat/swiggy/datemodel/${res.file_id}/${res.file_name}`,
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

    // const handleUpload2 = async () => {
    //     try {
    //         setloding(true)
    //         const formData = new FormData();


    //         formData.append('rentmodal', JSON.stringify(rentmodal));


    //         Object.entries(rentmodal).forEach(([key, value]) => {
    //             formData.append(key, value);
    //         });


    //         formData.append('file_key', res.file_key);
    //         console.log(formData)

    //         const response = await axios.post(`${baseurl}/surat/swiggy/rentmodel/${res.file_id}/${res.file_name}`, formData, {

    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         console.log('Data sent successfully', response.data);
    //         setnum(1)
    //         console.log("api12 successfully ");
    //         setfinal(response.data);

    //     } catch (error) {
    //         toast.error(error.response.data.detail)
    //         console.error('Error sending data', error);
    //         console.log('Response data:', error.response.data);
    //         console.log('Response status:', error.response.status);
    //         console.log('Response headers:', error.response.headers);

    //     } finally {
    //         setloding(false)
    //     }
    // };


    // console.log(res.file_id + "the data from zomatao" + res.file_name)


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

    // useEffect(() => {
    //     const savedInputValues = localStorage.getItem('suratswiggy');
    //     if (savedInputValues) {
    //         setRentModal(JSON.parse(savedInputValues));
    //     }
    // }, []);

    // // Effect to save inputValues to localStorage whenever it changes
    // useEffect(() => {
    //     console.log('bava');
    //     localStorage.setItem('suratswiggy', JSON.stringify(rentmodal));
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

            <div className="flex items-center justify-center ">

                <main className="bg-white p-4 rounded shadow-lg w-120 lg:w-144 ">
                    <h3 className="text-3xl text-center  font-bold">Swiggy</h3>
                    <div className='border-4 bg-slate-100 p-[50px]  mb-4  '>


                        <div className="overflow-x-auto    " style={{ maxHeight: '400px', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <h3 className="text-3xl text-center pb-6 font-bold">Slab Sturcture</h3>

                            <input
                                type="checkbox"
                                checked={rentmodal.include_slab}
                                onChange={() => handleCheckboxChange('include_slab')}
                            />


                            {rentmodal.slabs.map((form, index) => (
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
                                                <tr key={index}>
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
                                                        name="swiggy_first_order_start"
                                                        placeholder="First Order Start"
                                                        value={form.swiggy_first_order_start}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                        className="text-center"
                                                        onKeyDown={handleInputKeyDown}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        name="swiggy_first_order_end"
                                                        placeholder="First Order End"
                                                        value={form.swiggy_first_order_end}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                        className="text-center"
                                                        onKeyDown={handleInputKeyDown}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        name="swiggy_first_week_amount"
                                                        placeholder="First Week Amount"
                                                        value={form.swiggy_first_week_amount}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                        className="text-center"
                                                        onKeyDown={handleInputKeyDown}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        name="swiggy_first_weekend_amount"
                                                        placeholder="First Weekend Amount"
                                                        value={form.swiggy_first_weekend_amount}
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
                                                        name="swiggy_second_order_start"
                                                        placeholder="Second Order Start"
                                                        value={form.swiggy_second_order_start}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                        className="text-center"
                                                        onKeyDown={handleInputKeyDown}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        name="swiggy_second_order_end"
                                                        placeholder="Second Order End"
                                                        value={form.swiggy_second_order_end}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                        className="text-center"
                                                        onKeyDown={handleInputKeyDown}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        name="swiggy_second_week_amount"
                                                        placeholder="Second Week Amount"
                                                        value={form.swiggy_second_week_amount}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                        className="text-center"
                                                        onKeyDown={handleInputKeyDown}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        name="swiggy_second_weekend_amount"
                                                        placeholder="Second Weekend Amount"
                                                        value={form.swiggy_second_weekend_amount}
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
                                                        name="swiggy_order_greater_than"
                                                        placeholder="Order Greater Than"
                                                        value={form.swiggy_order_greater_than}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                        className="text-center"
                                                        onKeyDown={handleInputKeyDown}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        name="swiggy_third_week_amount"
                                                        placeholder="Third Week Amount"
                                                        value={form.swiggy_third_week_amount}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                        className="text-center"
                                                        onKeyDown={handleInputKeyDown}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        name="swiggy_third_weekend_amount"
                                                        placeholder="Third Weekend Amount"
                                                        value={form.swiggy_third_weekend_amount}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                        className="text-center"
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
                                    <table className="border border-gray-300 text-center mt-4">
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
                                                <tr key={index}>
                                                    <td className="border border-gray-300 p-2">
                                                        <input
                                                            type="date"
                                                            name="from_date"
                                                            value={form.from_date ? format(parse(form.from_date, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd') : ''}
                                                            onChange={(e) => handleSlabChange(index, e)}
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 p-2">
                                                        <input
                                                            type="date"
                                                            name="to_date"
                                                            value={form.to_date ? format(parse(form.to_date, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd') : ''}
                                                            onChange={(e) => handleSlabChange(index, e)}
                                                        />
                                                    </td>
                                                </tr>
                                            )}

                                            <tr>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="text"
                                                        name="swiggy_first_order_start"
                                                        placeholder="First Order Start"
                                                        value={form.swiggy_first_order_start}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="text"
                                                        name="swiggy_first_order_end"
                                                        placeholder="First Order End"
                                                        value={form.swiggy_first_order_end}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="text"
                                                        name="swiggy_first_week_amount"
                                                        placeholder="First Week Amount"
                                                        value={form.swiggy_first_week_amount}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="text"
                                                        name="swiggy_first_weekend_amount"
                                                        placeholder="First Weekend Amount"
                                                        value={form.swiggy_first_weekend_amount}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                    />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="text"
                                                        name="swiggy_second_order_start"
                                                        placeholder="Second Order Start"
                                                        value={form.swiggy_second_order_start}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="text"
                                                        name="swiggy_second_order_end"
                                                        placeholder="Second Order End"
                                                        value={form.swiggy_second_order_end}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="text"
                                                        name="swiggy_second_week_amount"
                                                        placeholder="Second Week Amount"
                                                        value={form.swiggy_second_week_amount}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="text"
                                                        name="swiggy_second_weekend_amount"
                                                        placeholder="Second Weekend Amount"
                                                        value={form.swiggy_second_weekend_amount}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                    />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="text"
                                                        name="swiggy_order_greater_than"
                                                        placeholder="Order Greater Than"
                                                        value={form.swiggy_order_greater_than}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="text"
                                                        name="swiggy_third_week_amount"
                                                        placeholder="Third Week Amount"
                                                        value={form.swiggy_third_week_amount}
                                                        onChange={(e) => handleSlabChange(index, e)}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="text"
                                                        name="swiggy_third_weekend_amount"
                                                        placeholder="Third Weekend Amount"
                                                        value={form.swiggy_third_weekend_amount}
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








                            <h3 className="text-3xl text-center pt-4 font-bold">Rent Sturcture</h3>
                            <input
                                type="checkbox"
                                checked={rentmodal.include_vehicle_charges}
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
                                                value={rentmodal.fulltime_greater_than_order}
                                                onChange={(e) => handleInputChange('fulltime_greter_than_order', e.target.value)}
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                                className='text-center'
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
                                                value={rentmodal.vehicle_charges_fulltime}
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
                                                value={rentmodal.parttime_greater_than_order}
                                                onChange={(e) => handleInputChange('partime_greter_than_order', e.target.value)}
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                                className='text-center'
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.parttime_average}
                                                onChange={(e) => handleInputChange('partime_average', e.target.value)}
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                                className='text-center'
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.vehicle_charges_parttime}
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
                            <table className="min-w-full border border-gray-300 mt-2 text-center">

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

                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number" placeholder='PART-TIME' className='text-center' readOnly
                                                value={"PART_TIME"}
                                                onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.bonus_order_parttime}
                                                onChange={(e) => handleInputChange('bonus_order_partime', e.target.value)}
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                                className='text-center'
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.bonus_amount_parttime}
                                                onChange={(e) => handleInputChange('bonus_amount_partime', e.target.value)}
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                                className='text-center'
                                            />
                                        </td>


                                    </tr>
                                </tbody>
                            </table>








                            <h3 className="text-3xl text-center pt-4 mt-4 font-bold">Rejection ORDER</h3>
                            <input
                                type="checkbox"
                                checked={rentmodal.include_rejection}
                                onChange={() => handleCheckboxChange('include_rejection')}
                            />
                            <table className="min-w-full border border-gray-300 mt-3 text-center">

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









                            <h3 className="text-3xl text-center pt-4 mt-4 font-bold">BAD ORDER</h3>
                            <input
                                type="checkbox"
                                checked={rentmodal.include_bad_order}
                                onChange={() => handleCheckboxChange('include_bad_order')}
                            />
                            <table className="min-w-full border border-gray-300 mt-2 text-center">

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




                            <ToastContainer />
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

export default Swiggy;
