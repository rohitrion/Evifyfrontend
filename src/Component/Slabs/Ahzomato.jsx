
import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, Finalresponse, GloablFile, Num, Response } from '../Recoil';
import { Circles } from 'react-loader-spinner'

const Ahzomato = () => {


  const baseurl = useRecoilValue(BaseURLState);

  const [num, setnum] = useRecoilState(Num)

  const [res, setres] = useRecoilState(Response)
 const [error,seterror]=useState()
  const [final, setfinal] = useRecoilState(Finalresponse)

  const [loading, setloding] = useState(false)
  const [rentmodal, setRentModal] = useState({
    include_slab: false,
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
      setloding(true)
      const formData = new FormData();


      formData.append('rentmodal', JSON.stringify(rentmodal));


      Object.entries(rentmodal).forEach(([key, value]) => {
        formData.append(key, value);
      });


      formData.append('file', file);
      console.log(formData)


      const response = await axios.post(`${baseurl}/ahmedabad/zomato/v2/structure1?`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Data sent successfully', response.data);
      // console.log('Data sent successfully', JSON.stringify(response.data));
      setnum(15)
      setres(response.data)
      setfinal(response.data)
      console.log(res + "the response" + setres)
      console.log(res + "the data ")
      console.log("api12 successfully ");
    } catch (error) {
      seterror(error)
      console.error('Error sending data', error);
      console.log('Response data:', error.response.data);
      console.log('Response status:', error.response.status);
      console.log('Response headers:', error.response.headers);
    } finally {
      setloding(false)
    }
  };


  function handleclick(val) {
    setnum(val)
  }


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

        <main className="bg-white p-4 rounded shadow-lg w-120 lg:w-144  ">
          <h3 className="text-3xl text-center pb-2 font-bold">AHEBDABAD Zomato</h3>
          <div className='border-4 bg-slate-100 p-[50px] '>
          <div className="overflow-x-auto    " style={{ maxHeight: '500px', overflowX: 'hidden' ,scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <h3 className="text-3xl text-center pb-9 font-bold">Slab Sturcture</h3>
            {
              error? <div>{error.response.status}</div>:""
            }
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
                        value={rentmodal.zomato_first_order_start}
                        placeholder='ordeTO'
                        onChange={(e) => handleInputChange('zomato_first_order_start', e.target.value)}
                      />

                    </td>

                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        value={rentmodal.zomato_first_order_end}
                        onChange={(e) => handleInputChange('zomato_first_order_end', e.target.value)}
                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        value={rentmodal.zomato_first_week_amount}
                        onChange={(e) => handleInputChange('zomato_first_week_amount', e.target.value)}
                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        value={rentmodal.zomato_first_weekend_amount}
                        onChange={(e) => handleInputChange('zomato_first_weekend_amount', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>

                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        value={rentmodal.zomato_second_order_start}
                        onChange={(e) => handleInputChange('zomato_second_order_start', e.target.value)}
                        placeholder='ordeTO'

                      />

                    </td>

                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        value={rentmodal.zomato_second_order_end}
                        onChange={(e) => handleInputChange('zomato_second_order_end', e.target.value)}
                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        value={rentmodal.zomato_second_week_amount}
                        onChange={(e) => handleInputChange('zomato_second_week_amount', e.target.value)}
                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        value={rentmodal.zomato_second_weekend_amount}
                        onChange={(e) => handleInputChange('zomato_second_weekend_amount', e.target.value)}
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
                        value={rentmodal.zomato_order_greter_than}
                        onChange={(e) => handleInputChange('zomato_order_greter_than', e.target.value)}
                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        value={rentmodal.zomato_third_week_amount}
                        onChange={(e) => handleInputChange('zomato_third_week_amount', e.target.value)}
                      />

                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        value={rentmodal.zomato_third_weekend_amount}
                        onChange={(e) => handleInputChange('zomato_third_weekend_amount', e.target.value)}
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



            
             <div className='flex justify-between '>
              <button onClick={handleUpload2} className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
              <button onClick={() => handleclick(15)} className="mt-4 bg-blue-500 text-white p-2 rounded">back</button>
              </div>
            </div>


          </div>

          </div>
        </main>
      </div>

    </>
  );
};

export default Ahzomato;
