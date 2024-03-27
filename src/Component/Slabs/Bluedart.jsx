




import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Circles } from 'react-loader-spinner'
import { BaseURLState, Finalresponse, GloablFile, Num, Response } from '../Recoil';


const Bluedart = () => {


    const baseurl = useRecoilValue(BaseURLState);

    const [num, setnum] = useRecoilState(Num)

    const [res, setres] = useRecoilState(Response);

    const [final, setfinal] = useRecoilState(Finalresponse)
    const [loading, setloding] = useState(false)

    const [rentmodal, setRentModal] = useState({

        from_order_document: 1,
        to_order_document: 44,
        first_amount_document: 5,
        second_condition_from_document: 45,
        second_condition_to_document: 64,
        second_condition_amount_document: 6,
        third_condition_from_document: 65,
        third_condition_to_document: 79,
        third_condtion_amount_document: 7,
        order_greater_than_document: 80,
        order_amount_document: 7.5,
        from_order_parcel: 1,
        to_order_parcel: 20,
        first_amount_parcel: 10,
        second_condition_from_parcel: 21,
        second_condition_to_parcel: 35,
        second_condition_amount_parcel: 12,
        third_condition_from_parcel: 36,
        third_condition_to_parcel: 45,
        third_condtion_amount_parcel: 13,
        order_greater_than_parcel: 46,
        order_amount_parcel: 13.5,


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

            const response = await axios.post(`${baseurl}/surat/bluedart/structure/${final.file_id}/${final.file_name}`, formData, {

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

            <div className="flex items-center justify-center   ">
                <main className="bg-white p-4 rounded shadow-lg  w-4/6   ">
                    <h3 className="text-3xl text-center pb-2 font-bold">BLUEDART BIKER</h3>
                    <div className='border-4 bg-slate-100 p-[50px]'>

                        <div className="overflow-x-auto    " style={{ maxHeight: '400px', overflowX: 'hidden' ,scrollbarWidth: 'none', msOverflowStyle: 'none'}}> {/* Set max height and enable vertical scrolling */}


                            <h3 className="text-3xl text-center  font-bold">DOCUMENT</h3>
                            <input
                                type="checkbox"
                                checked={rentmodal.include_bonus}
                                onChange={() => handleCheckboxChange('include_bonus')}
                            />
                            <table className="min-w-full border border-gray-300 mt-2 text-center  h-5/6   table-auto">
                                {/* ^-- Add 'table-auto' class for automatic table layout */}
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
                                                value={rentmodal.from_order_document}
                                                onChange={(e) => handleInputChange('from_order_document', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.to_order_document}
                                                onChange={(e) => handleInputChange('to_order_document', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.first_amount_document}
                                                onChange={(e) => handleInputChange('first_amount_document', e.target.value)}
                                            />
                                        </td>


                                    </tr>

                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text" placeholder='AVG_GRATHER_THEN' className='text-center'
                                                value={rentmodal.second_condition_from_document}
                                                onChange={(e) => handleInputChange('second_condition_from_document', 'vehicleChargesOrderFulltime', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.second_condition_to_document}
                                                onChange={(e) => handleInputChange('  second_condition_to_document', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.second_condition_amount_document}
                                                onChange={(e) => handleInputChange('second_condition_amount_document', e.target.value)}
                                            />
                                        </td>


                                    </tr>

                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text" placeholder='AVERAGE_LESS_THEN' className='text-center'
                                                value={rentmodal.third_condition_from_document}
                                                onChange={(e) => handleInputChange('third_condition_from_document', 'vehicleChargesOrderFulltime', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.third_condition_to_document}
                                                onChange={(e) => handleInputChange(' third_condition_to_document', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.third_condtion_amount_document}
                                                onChange={(e) => handleInputChange('third_condtion_amount_document', e.target.value)}
                                            />
                                        </td>


                                    </tr>







                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text" placeholder='AVERAGE_LESS_THEN' className='text-center' readOnly
                                                value={"AVG_GRATHER_THEN"}
                                                onChange={(e) => handleInputChange('third_condition_from_document', 'vehicleChargesOrderFulltime', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.order_greater_than_document}
                                                onChange={(e) => handleInputChange(' order_greater_than_document', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.order_amount_document}
                                                onChange={(e) => handleInputChange('order_amount_document', e.target.value)}
                                            />
                                        </td>


                                    </tr>

                                </tbody>
                            </table>








                            <h3 className="text-3xl text-center pt-4 mt-8 font-bold">PARCEL</h3>

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
                                                value={rentmodal.from_order_parcel}
                                                onChange={(e) => handleInputChange('from_order_parcel', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.to_order_parcel}
                                                onChange={(e) => handleInputChange('to_order_parcel', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.first_amount_parcel}
                                                onChange={(e) => handleInputChange('first_amount_parcel', e.target.value)}
                                            />
                                        </td>


                                    </tr>

                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text" placeholder='AVG_GRATHER_THEN' className='text-center'
                                                value={rentmodal.second_condition_from_parcel}
                                                onChange={(e) => handleInputChange('second_condition_from_parcel', 'vehicleChargesOrderFulltime', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.second_condition_to_parcel}
                                                onChange={(e) => handleInputChange('  second_condition_to_parcel', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.second_condition_amount_parcel}
                                                onChange={(e) => handleInputChange('second_condition_amount_parcel', e.target.value)}
                                            />
                                        </td>


                                    </tr>

                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text" placeholder='AVERAGE_LESS_THEN' className='text-center'
                                                value={rentmodal.third_condition_from_parcel}
                                                onChange={(e) => handleInputChange('third_condition_from_parcel', 'vehicleChargesOrderFulltime', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.third_condition_to_parcel}
                                                onChange={(e) => handleInputChange(' third_condition_to_parcel', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.third_condtion_amount_parcel}
                                                onChange={(e) => handleInputChange('third_condtion_amount_parcel', e.target.value)}
                                            />
                                        </td>


                                    </tr>







                                    <tr>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text" placeholder='AVERAGE_LESS_THEN' className='text-center' readOnly
                                                value={"AVG_GRATHER_THEN"}
                                                onChange={(e) => handleInputChange('third_condition_from_document', 'vehicleChargesOrderFulltime', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.order_greater_than_parcel}
                                                onChange={(e) => handleInputChange(' order_greater_than_parcel', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                value={rentmodal.order_amount_parcel}
                                                onChange={(e) => handleInputChange('order_amount_parcel', e.target.value)}
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

export default Bluedart;
