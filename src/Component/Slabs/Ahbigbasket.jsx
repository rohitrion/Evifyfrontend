




import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Circles } from 'react-loader-spinner'
import { BaseURLState, Finalresponse, GloablFile, Num, Response } from '../Recoil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Ahbigbasket = () => {


    const baseurl = useRecoilValue(BaseURLState);

    const [num, setnum] = useRecoilState(Num)

    const [res, setres] = useRecoilState(Response);

    const [final, setfinal] = useRecoilState(Finalresponse)

    const [loading, setloding] = useState(false)
    const [rentmodal, setRentModal] = useState({




        biker_from_delivery: 1,
        biker_to_delivery: 8,
        first_biker_amount: 24,
        second_biker_from_delivery: 9,
        second_biker_to_delivery: 16,
        second_biker_amount: 27,
        third_biker_from_delivery: 17,
        third_biker_to_delivery: 22,
        third_biker_amount: 30,
        fourth_biker_from_delivery: 23,
        fourth_biker_to_delivery: 28,
        fourth_biker_amount: 33,
        biker_order_greter_than: 29,
        biker_second_amount: 26,
        micro_from_delivery: 1,
        micro_to_delivery: 22,
        micro_first_amount: 20,
        micro_order_greter_than: 23,
        micro_second_amount: 22









    });

    const [file, setfile] = useRecoilState(GloablFile)

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
            const response = await axios.post(`${baseurl}/ahmedabad/bigbasket/structure1/${final.file_id}/${final.file_name}`, formData, {

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

            <div className="flex items-center justify-center mt-2 ">

                <main className="bg-white p-4 rounded shadow-lg w-120 lg:w-144 overflow-y-auto max-h-[900px] ">
                    <h3 className="text-3xl text-center pb-2 font-bold">BIGBASKET</h3>
                    <div className='border-4 bg-slate-100 p-[50px] '>

                        <div className="overflow-x-auto    " style={{ maxHeight: '400px', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>



                            <h3 className="text-3xl text-center pt-2 mt-2 font-bold">BIKE</h3>
                            <input
                                type="checkbox"
                                checked={rentmodal.include_bonus}
                                onChange={() => handleCheckboxChange('include_bonus')}
                            />
                            <table className="min-w-full border border-gray-300 mt-2 text-center">

                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 p-2"> ORDERS TO</th>
                                        <th className="border border-gray-300 p-2">ORDERS FROM</th>
                                        <th className="border border-gray-300 p-2">MON-SUN</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"

                                                value={rentmodal.biker_from_delivery}
                                                onChange={(e) => handleInputChange('biker_from_delivery', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.biker_to_delivery}
                                                onChange={(e) => handleInputChange('biker_to_delivery', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.first_biker_amount}
                                                onChange={(e) => handleInputChange('first_biker_amount', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>


                                    </tr>


                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number" placeholder='AVERAGE_LESS_THEN'
                                                value={rentmodal.second_biker_from_delivery}
                                                onChange={(e) => handleInputChange('second_biker_from_delivery', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.second_biker_to_delivery}
                                                onChange={(e) => handleInputChange('second_biker_to_delivery', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.second_biker_amount}
                                                onChange={(e) => handleInputChange('second_biker_amount', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>


                                    </tr>















                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number" placeholder='AVERAGE_LESS_THEN'
                                                value={rentmodal.third_biker_from_delivery}
                                                onChange={(e) => handleInputChange('third_biker_from_delivery', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}

                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.third_biker_to_delivery}
                                                onChange={(e) => handleInputChange('third_biker_to_delivery', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.third_biker_amount}
                                                onChange={(e) => handleInputChange('third_biker_amount', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>


                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.fourth_biker_from_delivery}
                                                onChange={(e) => handleInputChange('fourth_biker_from_delivery', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.fourth_biker_to_delivery}
                                                onChange={(e) => handleInputChange('fourth_biker_to_delivery', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.fourth_biker_amount}
                                                onChange={(e) => handleInputChange('fourth_biker_amount', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>


                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number" placeholder='AVERAGE_LESS_THEN' className='text-center' readOnly
                                                value={"GRATHER_THEN"}
                                                onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.biker_order_greter_than}
                                                onChange={(e) => handleInputChange('biker_order_greter_than', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.biker_second_amount}
                                                onChange={(e) => handleInputChange('biker_second_amount', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>


                                    </tr>





                                </tbody>
                            </table>













                            <h3 className="text-3xl text-center pt-2 mt-8 font-bold">MICRO</h3>
                            <input
                                type="checkbox"
                                checked={rentmodal.include_bonus}
                                onChange={() => handleCheckboxChange('include_bonus')}
                            />
                            <table className="min-w-full border border-gray-300 mt-2 text-center">

                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 p-2"> ORDERS TO</th>
                                        <th className="border border-gray-300 p-2">ORDERS FROM</th>
                                        <th className="border border-gray-300 p-2">MON-SUN</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"

                                                value={rentmodal.micro_from_delivery}
                                                onChange={(e) => handleInputChange('micro_from_delivery', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.micro_to_delivery}
                                                onChange={(e) => handleInputChange('micro_to_delivery', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.micro_first_amount}
                                                onChange={(e) => handleInputChange('micro_first_amount', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>


                                    </tr>


                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number" placeholder='AVERAGE_LESS_THEN' className='text-center' readOnly
                                                value={"GRATHER_THEN"}
                                                onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.micro_order_greter_than}
                                                onChange={(e) => handleInputChange('micro_order_greter_than', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="number"
                                                value={rentmodal.micro_second_amount}
                                                onChange={(e) => handleInputChange('micro_second_amount', e.target.value)}
                                                className='text-center'
                                                onKeyDown={handleInputKeyDown}
                                                min={0}
                                            />
                                        </td>


                                    </tr>


                                </tbody>
                            </table>



                            <ToastContainer />
                            <div className='flex justify-between '>
                                <button onClick={handleUpload2} className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
                                <button onClick={() => handleclick(15)} className="mt-4 bg-blue-500 text-white p-2 rounded">back</button>
                            </div>
                        </div>


                    </div>
                </main>
            </div>
        </>
    );
};

export default Ahbigbasket;
