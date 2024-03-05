



import React, { useState } from 'react';

const Salary = () => {
    const initialInputValues = [
        { orderTo: 10, orderFrom: 20, weekdays: 0, weekend: 0 },
        { orderTo: 20, orderFrom: 100, weekdays: 0, weekend: 0 },
        { orderTo: null, orderFrom: 0, weekdays: 0, weekend: 0 },
        // Add more rows as needed
    ];


    const rent = [
        { orderTo: 10, orderFrom: 20, weekdays: 0, weekend: 0 },
        { orderTo: 20, orderFrom: 100, weekdays: 0, weekend: 0 },
        // Add more rows as needed
    ];
  


    const Incentive = [
        { orderTo: null, orderFrom: 20, weekdays: 0, weekend: 0 },
        { orderTo: null, orderFrom: 100, weekdays: 0, weekend: 0 },
        // Add more rows as needed
    ];
  


    const [inputValues, setInputValues] = useState(initialInputValues);
  
    const[rant,setrant]=useState(rent)


    const[incentive,setIncentive]=useState(Incentive)

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



    const handleInputChange3 = (e, rowIndex, columnName) => {
        const { value } = e.target;
        const numericValue = parseInt(value, 10) || 0;

        setIncentive((prevValues) => {
            const newValues = [...prevValues];
            newValues[rowIndex][columnName] = value;
            return newValues;
        });
    };


    const logValues = () => {
        console.log(inputValues);
    };

    
  
    const logValues2 = () => {
        console.log(rant);
    };


     
    const logValues3 = () => {
        console.log(incentive);
    };

    return (
        <div className="flex items-center justify-center pl-[80px] mb-10 ml-40 ">
                   
            <main className="bg-white p-4 rounded shadow-lg w-120 lg:w-144 overflow-y-auto max-h-[900px] ">
            <h3 className="text-3xl text-center pb-9 font-bold">Zomato</h3>
                <div className='border-4 bg-slate-100 p-[50px] '>
                    <h3 className="text-3xl text-center pb-9 font-bold">Slab Sturcture</h3>
                  
                <input     type="checkbox"  className='mb-4' />  

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
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[0].orderTo}
                                        onChange={(e) => handleInputChange(e, 0, 'orderTo')}
                                        placeholder="Placeholder 1"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[0].orderFrom}
                                        onChange={(e) => handleInputChange(e, 0, 'orderFrom')}
                                        placeholder="Placeholder 2"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[0].weekdays}
                                        onChange={(e) => handleInputChange(e, 0, 'weekdays')}
                                        placeholder="Placeholder 3"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[0].weekend}
                                        onChange={(e) => handleInputChange(e, 0, 'weekend')}
                                        placeholder="Placeholder 4"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[1].orderTo}
                                        onChange={(e) => handleInputChange(e, 1, 'orderTo')}
                                        placeholder="Placeholder 5"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[1].orderFrom}
                                        onChange={(e) => handleInputChange(e, 1, 'orderFrom')}
                                        placeholder="Placeholder 6"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[1].weekdays}
                                        onChange={(e) => handleInputChange(e, 1, 'weekdays')}
                                        placeholder="Placeholder 7"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[1].weekend}
                                        onChange={(e) => handleInputChange(e, 1, 'weekend')}
                                        placeholder="Placeholder 8"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[2].orderTo}
                                        onChange={(e) => handleInputChange(e, 2, 'orderTo')}
                                        placeholder="Order greather than"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[2].orderFrom}
                                        onChange={(e) => handleInputChange(e, 2, 'orderFrom')}
                                        placeholder="Placeholder 10"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[2].weekdays}
                                        onChange={(e) => handleInputChange(e, 2, 'weekdays')}
                                        placeholder="Placeholder 11"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={inputValues[2].weekend}
                                        onChange={(e) => handleInputChange(e, 2, 'weekend')}
                                        placeholder="Placeholder 12"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* <button onClick={logValues} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Log Values</button> */}
                </div>
     
                <div className='border-4 bg-slate-100 p-[50px]'>
                    <h3 className="text-3xl text-center pb-9 font-bold">Rent Modal</h3>
                    <input     type="checkbox"  className='mb-4' />  
                    <table className="w-[800px] h-60 border-collapse border border-gray-800">
                        <thead>
                            <tr>
                                <th className="border border-gray-800 p-2">Work_Type</th>
                                <th className="border border-gray-800 p-2">Order Grether Than equal to</th>
                                <th className="border border-gray-800 p-2">Log_Hr-Greather_than</th>
                                <th className="border border-gray-800 p-2">Rant_per_than</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[0].orderTo}
                                        onChange={(e) => handleInputChange2(e, 0, 'orderTo')}
                                        placeholder="Placeholder 1"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[0].orderFrom}
                                        onChange={(e) => handleInputChange2(e, 0, 'orderFrom')}
                                        placeholder="Placeholder 2"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[0].weekdays}
                                        onChange={(e) => handleInputChange2(e, 0, 'weekdays')}
                                        placeholder="Placeholder 3"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[0].weekend}
                                        onChange={(e) => handleInputChange2(e, 0, 'weekend')}
                                        placeholder="Placeholder 4"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[1].orderTo}
                                        onChange={(e) => handleInputChange2(e, 1, 'orderTo')}
                                        placeholder="Placeholder 5"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[1].orderFrom}
                                        onChange={(e) => handleInputChange2(e, 1, 'orderFrom')}
                                        placeholder="Placeholder 6"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[1].weekdays}
                                        onChange={(e) => handleInputChange2(e, 1, 'weekdays')}
                                        placeholder="Placeholder 7"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={rant[1].weekend}
                                        onChange={(e) => handleInputChange2(e, 1, 'weekend')}
                                        placeholder="Placeholder 8"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                            </tr>
                 
                        </tbody>
                    </table>

                    {/* <button onClick={logValues2} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Log Values</button> */}
                </div>




                <div className='border-4 bg-slate-100 p-[50px]'>
                    <h3 className="text-3xl text-center pb-9 font-bold">Monthly Incentive</h3>
                    <input     type="checkbox"  className='mb-4' />  
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
                                        type="number"
                                        value={incentive[0].orderTo}
                                        onChange={(e) => handleInputChange2(e, 0, 'orderTo')}
                                        placeholder="Full Time"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={incentive[0].orderFrom}
                                        onChange={(e) => handleInputChange2(e, 0, 'orderFrom')}
                                        placeholder="Placeholder 2"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={incentive[0].weekdays}
                                        onChange={(e) => handleInputChange2(e, 0, 'weekdays')}
                                        placeholder="Placeholder 3"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={incentive[0].weekend}
                                        onChange={(e) => handleInputChange2(e, 0, 'weekend')}
                                        placeholder="Placeholder 4"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={incentive[1].orderTo}
                                        onChange={(e) => handleInputChange2(e, 1, 'orderTo')}
                                        placeholder="Part_Time"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={incentive[1].orderFrom}
                                        onChange={(e) => handleInputChange2(e, 1, 'orderFrom')}
                                        placeholder="Placeholder 6"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={incentive[1].weekdays}
                                        onChange={(e) => handleInputChange2(e, 1, 'weekdays')}
                                        placeholder="Placeholder 7"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                                <td className="border border-gray-800 p-2">
                                    <input
                                        type="number"
                                        value={incentive[1].weekend}
                                        onChange={(e) => handleInputChange2(e, 1, 'weekend')}
                                        placeholder="Placeholder 8"
                                        className="w-full p-1"
                                        min={0}
                                    />
                                </td>
                            </tr>
                 
                        </tbody>
                    </table>
               
                   
                </div>

                <button onClick={logValues2} className="mt-4  ml-[800px] bg-blue-500 text-white px-4 py-2   text-left rounded">Save</button>     
            </main>





        </div>
    );
};

export default Salary;
