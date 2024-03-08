




import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, GloablFile, Num, Response } from '../Recoil';


const Swiggy = () => {


    const baseurl = useRecoilValue(BaseURLState);

    const [num, setnum] = useRecoilState(Num)

    const [res, setres] = useRecoilState(Response);


    const [rentmodal, setRentModal] = useState({
        include_slab: false,
        swiggy_first_order_start: 1,
        swiggy_first_order_end: 29,
        swiggy_first_week_amount: 30,
        swiggy_first_weekend_amount: 32,
        swiggy_second_order_start: 20,
        swiggy_second_order_end: 25,
        swiggy_second_week_amount: 25,
        swiggy_second_weekend_amount: 27,
        swiggy_order_greter_than: 26,
        swiggy_third_week_amount: 30,
        swiggy_third_weekend_amount: 32,
        include_vahicle_charges: false,
        fulltime_average: 20,
        fulltime_greter_than_order: 20,
        vahicle_charges_fulltime: 100,
        partime_average: 11,
        partime_greter_than_order: 12,
        vahicle_charges_partime: 70,
        include_bonus: false,
        bonus_order_fulltime: 700,
        bonus_amount_fulltime: 1000,
        bonus_order_partime: 400,
        bonus_amount_partime: 500,
        include_rejection: false,
        rejection_orders: 2,
        rejection_amount: 20,
        include_bad_order: false,
        bad_orders: 2,
        bad_orders_amount: 20,

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

            const response = await axios.post(`${baseurl}/surat/swiggy/rentmodel/${res.file_id}/${res.file_name}`, formData, {

                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Data sent successfully', response.data);
            setnum(1)
            console.log("api12 successfully ");
        } catch (error) {
            console.error('Error sending data', error);
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
        }
    };


    console.log(res.file_id + "the data from zomatao" + res.file_name)
    return (


        <div className="flex items-center justify-center mt-2 pl-[190px] mb-40 ml-2">

            <main className="bg-white p-4 rounded shadow-lg w-120 lg:w-144 overflow-y-auto max-h-[900px] ">
                <h3 className="text-3xl text-center pb-2 font-bold">Swiggy</h3>
                <div className='border-4 bg-slate-100 p-[50px] '>

                    <h3 className="text-3xl text-center pb-9 font-bold">Slab Sturcture</h3>
                    <div>


                        <input
                            type="checkbox"
                            checked={rentmodal.include_slab}
                            onChange={() => handleCheckboxChange('include_slab')}
                        />
                        <table className="min-w-full border border-gray-300 text-center ">
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
                                            type="text"
                                            value={rentmodal.swiggy_first_order_start}
                                            placeholder='ordeTO'
                                            onChange={(e) => handleInputChange('swiggy_first_order_start', e.target.value)}
                                        />

                                    </td>

                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.swiggy_first_order_end}
                                            onChange={(e) => handleInputChange('swiggy_first_order_end', e.target.value)}
                                        />

                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.swiggy_first_week_amount}
                                            onChange={(e) => handleInputChange('swiggy_first_week_amount', e.target.value)}
                                        />

                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.swiggy_first_weekend_amount}
                                            onChange={(e) => handleInputChange('swiggy_first_weekend_amount', e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>

                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.swiggy_second_order_start}
                                            onChange={(e) => handleInputChange('swiggy_second_order_start', e.target.value)}
                                            placeholder='ordeTO'

                                        />

                                    </td>

                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.swiggy_second_order_end}
                                            onChange={(e) => handleInputChange('swiggy_second_order_end', e.target.value)}
                                        />

                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.swiggy_second_week_amount}
                                            onChange={(e) => handleInputChange('swiggy_second_week_amount', e.target.value)}
                                        />

                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.swiggy_second_weekend_amount}
                                            onChange={(e) => handleInputChange('swiggy_second_weekend_amount', e.target.value)}
                                        />
                                    </td>
                                </tr>


                                <tr>

                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={null}
                                            className='text-center'
                                            placeholder='ORDERTO >='
                                            readOnly
                                            onChange={(e) => handleInputChange('bonusorder', 'bonus_order_partime', e.target.value)}
                                        />

                                    </td>

                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.swiggy_order_greter_than}
                                            onChange={(e) => handleInputChange('swiggy_order_greter_than', e.target.value)}
                                        />

                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.swiggy_third_week_amount}
                                            onChange={(e) => handleInputChange('swiggy_third_week_amount', e.target.value)}
                                        />

                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.swiggy_third_weekend_amount}
                                            onChange={(e) => handleInputChange('swiggy_third_weekend_amount', e.target.value)}
                                        />
                                    </td>
                                </tr>


                                {/* ... Repeat for other input fields */}
                            </tbody>
                        </table>



                        <h3 className="text-3xl text-center pt-4 font-bold">Rent Sturcture</h3>
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
                                            type="text"
                                            value={rentmodal.fulltime_greter_than_order}
                                            onChange={(e) => handleInputChange(' fulltime_greter_than_order', e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.fulltime_average}
                                            onChange={(e) => handleInputChange('fulltime_average', e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.vahicle_charges_fulltime}
                                            onChange={(e) => handleInputChange('vahicle_charges_fulltime', e.target.value)}
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
                                            type="text"
                                            value={rentmodal.partime_greter_than_order}
                                            onChange={(e) => handleInputChange('partime_greter_than_order', e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.partime_average}
                                            onChange={(e) => handleInputChange('partime_average', e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.vahicle_charges_partime}
                                            onChange={(e) => handleInputChange('vahicle_charges_partime', e.target.value)}
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
                                            type="text"
                                            value={rentmodal.bonus_order_fulltime}
                                            onChange={(e) => handleInputChange('bonus_order_fulltime', e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.bonus_amount_fulltime}
                                            onChange={(e) => handleInputChange('bonus_amount_fulltime', e.target.value)}
                                        />
                                    </td>


                                </tr>

                                <tr>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text" placeholder='PART-TIME' className='text-center' readOnly
                                            value={"PART_TIME"}
                                            onChange={(e) => handleInputChange('vehicleCharges', 'vehicleChargesOrderFulltime', e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.bonus_order_partime}
                                            onChange={(e) => handleInputChange('bonus_order_partime', e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.bonus_amount_partime}
                                            onChange={(e) => handleInputChange('bonus_amount_partime', e.target.value)}
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
                                            type="text"
                                            value={rentmodal.rejection_orders}
                                            onChange={(e) => handleInputChange('rejection_orders', e.target.value)}
                                        />

                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.rejection_amount}
                                            onChange={(e) => handleInputChange('rejection_amount', e.target.value)}
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
                                            type="text"
                                            value={rentmodal.bad_orders}
                                            onChange={(e) => handleInputChange('bad_orders', e.target.value)}
                                        />

                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            value={rentmodal.bad_orders_amount}
                                            onChange={(e) => handleInputChange('bad_orders_amount', e.target.value)}
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

export default Swiggy;
