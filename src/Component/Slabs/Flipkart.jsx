




import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Circles } from 'react-loader-spinner'
import { BaseURLState, Finalresponse, GloablFile, Num, Response } from '../Recoil';


const Flipkart = () => {


    const baseurl = useRecoilValue(BaseURLState);

    const [num, setnum] = useRecoilState(Num)

    const [res, setres] = useRecoilState(Response);

    const [final, setfinal] = useRecoilState(Finalresponse)

    const [loading, setloding] = useState(false)
    const [rentmodal, setRentModal] = useState({

        from_order: 1,
        to_order: 40,
        first_amount: 12,
        second_condition_from: 41,
        second_condition_to: 55,
        second_condition_amount: 13,
        third_condition: 55,
        third_condition_amount: 14,
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

            const response = await axios.post(`${baseurl}/surat/flipkart/structure1/${final.file_id}/${final.file_name}`, formData, {

                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Data sent successfully', response.data);
            setnum(1)
            console.log("api12 successfully ");
            setfinal(response.data);

        } catch (error) {
            console.error('Error sending data', error);
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
        } finally {
            setloding(false)
        }
    };


    console.log(res.file_id + "the data from zomatao" + res.file_name)
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

            <div className="flex items-center justify-center">

                <main className="bg-white p-4 rounded shadow-lg w-120 lg:w-144 overflow-y-auto max-h-[900px] ">
                    <h3 className="text-3xl text-center pb-2 font-bold">FLIPKART</h3>
                    <div className='border-4 bg-slate-100 p-[50px] '>

                        <div>

                        <input
                            type="checkbox"
                            checked={rentmodal.include_slab}
                            onChange={() => handleCheckboxChange('include_slab')}
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
                                                type="text"
                                                className='text-center'
                                                value={rentmodal.from_order}
                                                onChange={(e) => handleInputChange('from_order', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.to_order}
                                                onChange={(e) => handleInputChange('to_order', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.first_amount}
                                                onChange={(e) => handleInputChange('first_amount', e.target.value)}
                                            />
                                        </td>


                                    </tr>

                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text" placeholder='AVG_GRATHER_THEN' className='text-center'
                                                value={rentmodal.second_condition_from}
                                                onChange={(e) => handleInputChange('second_condition_from', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.second_condition_to}
                                                onChange={(e) => handleInputChange('second_condition_to', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.second_condition_amount}
                                                onChange={(e) => handleInputChange('second_condition_amount', e.target.value)}
                                            />
                                        </td>


                                    </tr>

                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text" placeholder='AVERAGE_LESS_THEN' className='text-center' readOnly
                                                value={"AVERAGE_GRATHER_THEN"}
                                                onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.third_condition}
                                                onChange={(e) => handleInputChange('third_condition', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.third_condition_amount}
                                                onChange={(e) => handleInputChange('third_condition_amount', e.target.value)}
                                            />
                                        </td>


                                    </tr>


                                </tbody>
                            </table>


                            <button onClick={handleUpload2} className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
                        </div>


                    </div>
                </main>
            </div>
        </>

    );
};

export default Flipkart;
