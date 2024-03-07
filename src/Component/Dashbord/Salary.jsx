




import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, GloablFile, Num } from '../Recoil';


const Salary = () => {


  const baseurl = useRecoilValue(BaseURLState);

  const [num, setnum] = useRecoilState(Num)

  const [rentmodal, setRentModal] = useState({
    include_slab: false,
    zomato: {
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
      zomato_third_weekend_amount: 32

    },
    include_vahicle_charges: false,
    vehicleCharges: {
      fulltime_average: '20',
      fulltime_greter_than_order: '20',
      vahicle_charges_fulltime: '100',
      partime_average: '11',
      partime_greter_than_order:"12",
      vahicle_charges_partime:"70"
    },

    include_bonus: false,
    bonusorder: {
      bonus_order_fulltime: '700',
      bonus_amount_fulltime: '1000',
      bonus_order_partime: '400',
      bonus_amount_partime: '500',
    },

    include_rejection: false,
    rejectionOrder: {
      rejection_orders: '2',
      rejection_amount: '20',

    },
    include_bad_order:false,
    badorders:{
      bad_orders:2,
      bad_orders_amount:20
    }
    // ... other fields
  });
  const [file, setfile] = useRecoilState(GloablFile)

  console.log(rentmodal)

  const handleInputChange = (section, fieldName, value) => {
    setRentModal((prevRentModal) => ({
      ...prevRentModal,
      [section]: {
        ...prevRentModal[section],
        [fieldName]: value,
      },
    }));
  };

  const handleCheckboxChange = (fieldName) => {
    setRentModal((prevRentModal) => ({
      ...prevRentModal,
      [fieldName]: !prevRentModal[fieldName],
    }));
  };

  // const handleFileUpload = (uploadedFile) => {
  //   setFile(uploadedFile);
  // };

  const handleUpload2 = async () => {
    try {
      const formData = new FormData();

      // Append input values as JSON data
      formData.append('inputValues', JSON.stringify(rentmodal));

      // Append the global file
      formData.append('file', file);
      console.log(formData)
      // Replace 'your-api-endpoint' with the actual endpoint of your API
      const response = await axios.post(`${baseurl}/surat/zomato/structure3?`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Data sent successfully', response.data);
      console.log("api12 successfully ");
    } catch (error) {
      console.error('Error sending data', error);
      console.log('Response data:', error.response.data);
      console.log('Response status:', error.response.status);
      console.log('Response headers:', error.response.headers);
    }
  };

  return (


    <div className="flex items-center justify-center mt-2 pl-[190px] mb-40 ml-2">

      <main className="bg-white p-4 rounded shadow-lg w-120 lg:w-144 overflow-y-auto max-h-[900px] ">
        <h3 className="text-3xl text-center pb-2 font-bold">Zomato</h3>
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
                      value={rentmodal.zomato.zomato_first_order_start}
                      placeholder='ordeTO'
                      onChange={(e) => handleInputChange('zomato', 'zomato_first_order_start', e.target.value)}
                    />

                  </td>

                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomato.zomato_first_order_end}
                      onChange={(e) => handleInputChange('zomato', 'zomato_first_order_end', e.target.value)}
                    />

                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomato.zomato_first_week_amount}
                      onChange={(e) => handleInputChange('zomato', 'zomato_first_week_amount', e.target.value)}
                    />

                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomato.zomato_first_weekend_amount}
                      onChange={(e) => handleInputChange('zomato', 'zomato_first_weekend_amount', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>

                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomato.zomato_second_order_start}
                      onChange={(e) => handleInputChange('zomato', 'zomato_second_order_start', e.target.value)}
                      placeholder='ordeTO'
                 
                    />

                  </td>

                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomato.zomato_second_order_end}
                      onChange={(e) => handleInputChange('zomato', 'zomato_second_order_end', e.target.value)}
                    />

                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomato.zomato_second_week_amount}
                      onChange={(e) => handleInputChange('zomato', 'zomato_second_week_amount', e.target.value)}
                    />

                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomato.zomato_second_weekend_amount}
                      onChange={(e) => handleInputChange('zomato', 'zomato_second_weekend_amount', e.target.value)}
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
                      value={rentmodal.zomato.zomato_order_greter_than}
                      onChange={(e) => handleInputChange('zomato', 'zomato_order_greter_than', e.target.value)}
                    />

                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomato.zomato_third_week_amount}
                      onChange={(e) => handleInputChange('zomato', 'zomato_third_week_amount', e.target.value)}
                    />

                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomato.zomato_third_weekend_amount}
                      onChange={(e) => handleInputChange('zomato', 'zomato_third_weekend_amount', e.target.value)}
                    />
                  </td>
                </tr>

                {/* <tr>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="checkbox"
                      checked={rentmodal.slab}
                      onChange={() => handleCheckboxChange('slab')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomatoFirstOrder.zomato_first_order_start}
                      onChange={(e) => handleInputChange('zomatoFirstOrder', 'zomato_first_order_start', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomatoFirstOrder.zomato_first_order_end}
                      onChange={(e) => handleInputChange('zomatoFirstOrder', 'zomato_first_order_end', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomatoFirstOrder.zomato_first_order_amount}
                      onChange={(e) => handleInputChange('zomatoFirstOrder', 'zomato_first_order_amount', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomatoFirstOrder.zomato_order_greter_than}
                      onChange={(e) => handleInputChange('zomatoFirstOrder', 'zomato_order_greter_than', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.zomatoFirstOrder.zomato_second_order_amount}
                      onChange={(e) => handleInputChange('zomatoFirstOrder', 'zomato_second_order_amount', e.target.value)}
                    />
                  </td>
                </tr>  */}
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
                      onChange={(e) => handleInputChange( e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.vehicleCharges.fulltime_greter_than_order}
                      onChange={(e) => handleInputChange('vehicleCharges', 'fulltime_greter_than_order', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.vehicleCharges.fulltime_average}
                      onChange={(e) => handleInputChange('vehicleCharges', 'fulltime_average', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.vehicleCharges.vahicle_charges_fulltime}
                      onChange={(e) => handleInputChange('vehicleCharges', 'vahicle_charges_fulltime', e.target.value)}
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
                      value={rentmodal.vehicleCharges.partime_greter_than_order}
                      onChange={(e) => handleInputChange('vehicleCharges', 'partime_greter_than_order', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.vehicleCharges.partime_average}
                      onChange={(e) => handleInputChange('vehicleCharges', 'partime_average', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.vehicleCharges.vahicle_charges_partime}
                      onChange={(e) => handleInputChange('vehicleCharges', 'vahicle_charges_partime', e.target.value)}
                    />
                  </td>

                </tr>
              </tbody>
            </table>









            <h3 className="text-3xl text-center pt-4 font-bold">MONTHLY-BONUS</h3>
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
                      type="text"
                      value={rentmodal.bonusorder.bonus_order_fulltime}
                      onChange={(e) => handleInputChange('bonusorder', 'bonus_order_fulltime', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.bonusorder.bonus_amount_fulltime}
                      onChange={(e) => handleInputChange('bonusorder', 'bonus_amount_fulltime', e.target.value)}
                    />
                  </td>


                </tr>
                {/* ... Repeat for other input fields */}
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
                      value={rentmodal.badorders.bad_orders}
                      onChange={(e) => handleInputChange('badorders', 'bad_orders', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.badorders.bad_orders_amount}
                      onChange={(e) => handleInputChange('badorders', 'bad_orders_amount', e.target.value)}
                    />
                  </td>


                </tr>
              </tbody>
            </table>




























            {/* 
            <h3 className="text-3xl text-center pt-4 font-bold">MONTHLY-BONUS</h3>

            <table className="min-w-full border border-gray-300 mt-4">

              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Full time </th>
                  <th className="border border-gray-300 p-2">Order Fulltime</th>
                  <th className="border border-gray-300 p-2">Charges Fulltime</th>
                  
                </tr>

                </thead>
                <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="checkbox"
                      checked={rentmodal.bonus}
                      onChange={() => handleCheckboxChange('bonus')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.bonusorder.bonus_order_fulltime}
                      onChange={(e) => handleInputChange('bonusorder', 'bonus_order_fulltime', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.bonusorder.bonus_amount_fulltime}
                      onChange={(e) => handleInputChange('bonusorder', 'bonus_amount_fulltime', e.target.value)}
                    />
                  </td>
                 
                </tr>
                </tbody>
                <thead>
                <tr>
                <th className="border border-gray-300 p-2">Part time</th>
                <th className="border border-gray-300 p-2">Order Partime</th>
                  <th className="border border-gray-300 p-2">Charges Partime</th>
                </tr>
              </thead>
               <tbody>
                <tr>
         
                <td className="border border-gray-300 p-2">
                    <input
                      type="checkbox"
                      checked={rentmodal.bonus}
                      onChange={() => handleCheckboxChange('bonus')}
                    />
                  </td>
        
                <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.bonusorder.bonus_order_partime}
                      onChange={(e) => handleInputChange('bonusorder', 'bonus_order_partime', e.target.value)}
                    />

                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.bonusorder.bonus_amount_partime}
                      onChange={(e) => handleInputChange('bonusorder', 'bonus_amount_partime', e.target.value)}
                    />
                  </td>
                </tr>
       
              </tbody>
            </table> */}









            <h3 className="text-3xl text-center pt-4 font-bold">Rejection ORDER</h3>
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
                      type="text"
                      value={rentmodal.rejectionOrder.rejection_orders}
                      onChange={(e) => handleInputChange('rejectionOrder', 'rejection_orders', e.target.value)}
                    />

                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.rejectionOrder.rejection_amount}
                      onChange={(e) => handleInputChange('rejectionOrder', 'rejection_amount', e.target.value)}
                    />
                  </td>
                </tr>
                {/* ... Repeat for other input fields */}
              </tbody>
            </table>









            <h3 className="text-3xl text-center pt-4 font-bold">BAD ORDER</h3>
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
                      type="text"
                      value={rentmodal.rejectionOrder.rejection_orders}
                      onChange={(e) => handleInputChange('rejectionOrder', 'rejection_orders', e.target.value)}
                    />

                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={rentmodal.rejectionOrder.rejection_amount}
                      onChange={(e) => handleInputChange('rejectionOrder', 'rejection_amount', e.target.value)}
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

export default Salary;
