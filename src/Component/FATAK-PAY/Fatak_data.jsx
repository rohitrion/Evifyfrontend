



import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { AuthState, BaseURLState } from '../Recoil';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Circles } from 'react-loader-spinner';

function Fatak_data() {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [week, setweek] = useState("")


    const [data, setData] = useState([]);
    const [authState, setauthstate] = useRecoilState(AuthState);
    const [isLoading, setIsLoading] = useState(false);
    const [baseurl, setBaseurl] = useRecoilState(BaseURLState);
    const [searchTerm, setSearchTerm] = useState('');

    const [showTable, setShowTable] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!month || !year) {
            return
        }
        setIsLoading(true);

        try {
            ;
            const response = await axios.post(`${baseurl}/date-by-month/${week}?month=${month}&year=${year}`, {
                headers: {
                    'Authorization': `Bearer ${authState.token}`,
                }
            });
            const og = response.data
            setData(og);
            setShowTable(true); //
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };





    const filteredData = data.filter(item =>
        item.DRIVER_NAME.toLowerCase().includes(searchTerm.toLowerCase()) || item.CLIENT_NAME.toLowerCase().includes(searchTerm.toLowerCase()) || item.DRIVER_ID.toLowerCase().includes(searchTerm.toLowerCase()) || item.AADHAR_NUMBER.toLowerCase().includes(searchTerm.toLowerCase()) || item.CLIENT_NAME.toLowerCase().includes(searchTerm.toLowerCase())

    );

    return (
        <>
            {isLoading && (
                <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-opacity-60 z-50 bg-gray-300">
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

            <div className="flex max-h-[56rem]  bg-gray-100">
                <div className="bg-white dark:bg-gray-950 shadow-lg rounded-lg p-8   max-w-screen-2xl  mx-auto my-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex w-full justify-between	 items-end text-center gap-8">
                            <h2 className="text-4xl text-[#000000] font-bold mr-32">Off-Role Fatak Pay Data</h2>
                            <div className="space-y-2">
                                <select
                                    id="week"
                                    value={week}
                                    onChange={(e) => setweek(e.target.value)}
                                    className="block w-full mt-1 py-2 px-6 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Week</option>
                                    <option value="weekone">weekone</option>
                                    <option value="weektwo">weektwo</option>
                                    <option value="weekthree">weekthree</option>
                                    <option value="weekfour">weekfour</option>
                                    <option value="weekfive">weekfive</option>

                                </select>
                            </div>
                            <div className="space-y-2">
                                <select
                                    id="month"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    className="block w-full mt-1 py-2 px-6 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select month</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <select
                                    id="year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="block w-full mt-1 py-2 px-6 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select year</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder=" 🔍️   Search  driver details"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full mt-1 py-2 px-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Fetch Data</button>
                            </div>
                        </div>
                    </form>
                    {showTable && (
                        <div className="overflow-auto mt-12 max-h-[38rem] ">
                            <table className="border-collapse border-2 w-full mx-auto">
                                <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                    <tr className="bg-[#FFB603] text-[#000000]">
                                        <th className="border px-4 text-center py-2">DATE</th>
                                        <th className="border px-4 text-center py-2">WEEK_NAME</th>
                                        <th className="border px-4 text-center py-2">STATUS</th>
                                        <th className="border px-4 text-center py-2">COMPANY</th>
                                        <th className="border px-4 text-center py-2">SALARY_DAY</th>
                                        <th className="border text-center px-4 py-2">JOINING_DATE</th>
                                        <th className="border text-center px-4 py-2">CITY_NAME</th>
                                        <th className="border text-center px-4 py-2">CLIENT_NAME</th>
                                        <th className="border px-4 text-center py-2">EXIT_DATE</th>
                                        <th className="border px-4 text-center py-2">AADHAR_NUMBER</th>
                                        <th className="border px-4 text-center py-2">PHONE_NUMBER</th>


                                        <th className="border px-4 text-center py-2">DESIGNATION_NAME</th>
                                        <th className="border px-4 text-center py-2">DRIVER_ID</th>
                                        <th className="border px-4 text-center py-2">DRIVER_NAME</th>
                                        <th className="border px-4 text-center py-2">FINAL_AMOUNT</th>



                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item, index) => (
                                        <tr key={index} className="hover:bg-blue-100/40 text-sm text-[#000000]">
                                            <td className="border font-bold text-center px-4 py-2">{item?.DATE}</td>
                                            <td className="border font-bold text-center px-4 py-2">{item?.WEEK_NAME}</td>
                                            <td className="border font-bold text-center px-4 py-2">{item?.STATUS}</td>
                                            <td className="border font-bold text-center px-4 py-2">{item?.COMPANY}</td>
                                            <td className="border font-bold text-center px-4 py-2">{item?.SALARY_DAY}</td>
                                            <td className="border font-bold text-center px-4 py-2">{item?.JOINING_DATE}</td>
                                            <td className="border font-bold text-center px-4 py-2">{item?.CITY_NAME}</td>
                                            <td className="border font-bold text-center px-4 py-2">{item?.CLIENT_NAME}</td>
                                            <td className="border font-bold text-center px-4 py-2">{item?.EXIT_DATE}</td>
                                            <td className="border font-bold text-center px-4 py-2">{item?.AADHAR_NUMBER}</td>
                                            <td className="border font-bold text-center px-4 py-2">{item?.PHONE_NUMBER}</td>
                                            <td className="border font-bold text-center px-4 py-2">{item?.DESIGNATION_NAME}</td>
                                            <td className="border font-bold text-center px-4 py-2">{item?.DRIVER_ID}</td>

                                            <td className="border font-bold text-center px-4 py-2">{item?.DRIVER_NAME}</td>

                                            <td className="border font-bold text-center px-4 py-2">{item?.FINAL_AMOUNT}</td>


                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {!showTable && (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <p className="text-xl md:text-2xl font-semibold text-gray-600">
                                    Please select a month and year to fetch data.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Fatak_data;
