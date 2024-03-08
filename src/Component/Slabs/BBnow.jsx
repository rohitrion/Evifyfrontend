




import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';

import { BaseURLState, Finalresponse, GloablFile, Num, Response } from '../Recoil';


const BBnow = () => {


    const baseurl = useRecoilValue(BaseURLState);

    const [num, setnum] = useRecoilState(Num)

    const [res, setres] = useRecoilState(Response);

    const [final, setfinal] = useRecoilState(Finalresponse)


    const [rentmodal, setRentModal] = useState({

        average_order: 13,
        average_amount: 400,
        from_order: 1,
        to_order: 14,
        order_amount2: 30,
        order_grether_than: 15,
        order_amount3: 35,
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
            const formData = new FormData();


            formData.append('rentmodal', JSON.stringify(rentmodal));


            Object.entries(rentmodal).forEach(([key, value]) => {
                formData.append(key, value);
            });


            formData.append('file', file);
            console.log(formData)

            const response = await axios.post(`${baseurl}/surat/bbnow/structure1/${final.file_id}/${final.file_name}`, formData, {

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
        }
    };


    console.log(res.file_id + "the data from zomatao" + res.file_name)
    return (


        <div className="flex items-center justify-center mt-2 pl-[190px] mb-40 ml-16">

            <main className="bg-white p-4 rounded shadow-lg w-120 lg:w-144 overflow-y-auto max-h-[900px] ">
                <h3 className="text-3xl text-center pb-2 font-bold">BB-NOW</h3>
                <div className='border-4 bg-slate-100 p-[50px] '>

                    <div>



                        <h3 className="text-3xl text-center pt-2 mt-2 font-bold">SALARY</h3>
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
                                            value={rentmodal.order_amount2}
                                            onChange={(e) => handleInputChange('order_amount2', e.target.value)}
                                        />
                                    </td>


                                </tr>

                                <tr>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text" placeholder='AVG_GRATHER_THEN' className='text-center' readOnly
                                            value={"AVG_GRATHER_THEN"}
                                            onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.order_grether_than}
                                            onChange={(e) => handleInputChange('order_grether_than', e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.order_amount3}
                                            onChange={(e) => handleInputChange('order_amount3', e.target.value)}
                                        />
                                    </td>


                                </tr>

                                <tr>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text" placeholder='AVERAGE_LESS_THEN' className='text-center' readOnly
                                            value={"AVERAGE_LESS_THEN"}
                                            onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.average_order}
                                            onChange={(e) => handleInputChange('average_order', e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.average_amount}
                                            onChange={(e) => handleInputChange('average_amount', e.target.value)}
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
    );
};

export default BBnow;
