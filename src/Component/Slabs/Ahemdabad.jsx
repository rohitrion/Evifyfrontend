
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, Finalresponse, GloablFile, Num, TextState } from '../Recoil';
import Ahzomato from './Ahzomato';
import Ahblinkit from './Ahblinkit';
import Ahflipkart from './Ahflipkart';
import Ahecom from './Ahecom';
import Ahbigbasket from './Ahbigbasket';
import File from '../Dashbord/File';
import { useNavigate } from 'react-router-dom';
import Ahbbnow from './Ahbbnow';


const Ahemdabad = ({ setsucess }) => {
    const [num, setnum] = useRecoilState(Num);
    const baseurl = useRecoilValue(BaseURLState);
    const [final, setfinal] = useRecoilState(Finalresponse);
    const [gfile, setgfile] = useRecoilState(GloablFile)
    const [error, seterror] = useState();
    const handleclick = (val) => {
        setnum(val);
        console.log("teh valur " + val)
    };

    const navigate = useNavigate();
    const handleprev = (val) => {
        setnum(val)
        setsucess(false)
        setgfile(null)
    }

    const handleDownload = async () => {
        try {
            const url = `${baseurl}/download_salary_file/${final.file_key}`;
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "download.xlsx");

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading file:", error.message);
        }
    };

    return (
        <>

            {num === 0 ? (
                <File />
            ) :



                num === 8 ? (
                    <Ahzomato />
                ) :

                    num === 9 ? (
                        <Ahblinkit />
                    ) :

                        num === 19 ? (
                            <Ahbbnow />

                        ) :
                            num === 11 ? (
                                <Ahflipkart />
                            ) :

                                num === 12 ? (
                                    <Ahecom />
                                ) :

                                    num === 13 ? (
                                        <Ahbigbasket />
                                    ) :


                                        (

                                            num === 15 &&


                                            // <div className="flex items-center justify-center pl-[80px]  mb-60 ml-96">
                                            //     <main className="bg-white p-8 rounded shadow-lg w-[500px]">

                                            //         <div className="container mx-auto mt-8 ">





                                            //             <div className="mb-4  flex flex-col justify-center items-center gap-8 ">
                                            //                 <h3 className="text-2xl font-bold text-center  ">  SALARY STRUCTURE AHEMDABAD </h3>

                                            //                 <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
                                            //                     <span className="text-xl font-bold">ZOMATO</span>

                                            //                     <button onClick={() => handleclick(8)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                            //                         Update Structure
                                            //                     </button>


                                            //                 </div>

                                            //                 <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded  ">
                                            //                     <span className="text-xl font-bold">BLINKIT</span>
                                            //                     <button onClick={() => handleclick(9)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                            //                         Update Structure
                                            //                     </button>


                                            //                 </div>



                                            //                 <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
                                            //                     <span className="text-xl font-bold" >BB-NOW</span>
                                            //                     <button onClick={() => handleclick(10)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                            //                         Update Structure
                                            //                     </button>


                                            //                 </div>



                                            //                 <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
                                            //                     <span className="text-xl font-bold" >FLIPKART</span>
                                            //                     <button onClick={() => handleclick(11)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                            //                         Update Structure
                                            //                     </button>


                                            //                 </div>




                                            //                 <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
                                            //                     <span className="text-xl font-bold" >ECOM</span>
                                            //                     <button onClick={() => handleclick(12)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                            //                         Update Structure
                                            //                     </button>


                                            //                 </div>



                                            //                 <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
                                            //                     <span className="text-xl font-bold" >BIGBASKET</span>
                                            //                     <button onClick={() => handleclick(13)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                            //                         Update Structure
                                            //                     </button>


                                            //                 </div>






                                            //                 <div className='flex gap-16  mt-3  justify-between' >

                                            //                     <button className="bg-blue-500 text-black px-4 py-2  rounded-lg " onClick={() => handleprev(0)} >previous</button>
                                            //                     <button className="bg-blue-500 text-black px-4 py-2  rounded-lg  " onClick={handleDownload} >Finish</button>
                                            //                 </div>
                                            //             </div>

                                            //         </div>
                                            //     </main>
                                            // </div>



                                            <div className="flex items-center justify-center h-full overflow-y-auto  overflow-x-auto  ">
                                                <main className="bg-white p-4 sm:p-8 rounded shadow-lg w-full sm:w-11/12 md:w-6/12 lg:w-6/12 xl:w-8/12 ">
                                                    <div className="container mx-auto mt-4 sm:mt-8 h-full">
                                                        <div className="mb-4 flex flex-col justify-center items-center gap-4 sm:gap-8 h-full">
                                                            <h3 className="text-xl sm:text-3xl font-bold"> SALARY STRUCTURE AHEMDABAD </h3>

                                                            {/* Cards */}
                                                            <div className="flex flex-col gap-4 sm:gap-8 w-full    overflow-y-auto  overflow-x-auto ">
                                                                {/* ZOMATO Card */}
                                                                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3  justify-between rounded">
                                                                    <span className="text-xl font-bold">ZOMATO</span>
                                                                    <button onClick={() => handleclick(8)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                                                        Update Structure
                                                                    </button>
                                                                </div>

                                                                {/* SWIGGY Card */}
                                                                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3 justify-between rounded">
                                                                    <span className="text-xl font-bold">BLINKIT</span>
                                                                    <button onClick={() => handleclick(9)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                                                        Update Structure
                                                                    </button>
                                                                </div>

                                                                {/* BB-NOW Card */}
                                                                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3 justify-between rounded">
                                                                    <span className="text-xl font-bold">BB-NOW</span>
                                                                    <button onClick={() => handleclick(10)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                                                        Update Structure
                                                                    </button>
                                                                </div>

                                                                {/* FLIPKART Card */}
                                                                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3 justify-between rounded">
                                                                    <span className="text-xl font-bold">FLIPKART</span>
                                                                    <button onClick={() => handleclick(11)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                                                        Update Structure
                                                                    </button>
                                                                </div>

                                                                {/* ECOM Card */}
                                                                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3  justify-between rounded">
                                                                    <span className="text-xl font-bold">ECOM</span>
                                                                    <button onClick={() => handleclick(12)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                                                        Update Structure
                                                                    </button>
                                                                </div>

                                                                {/* BLUEDART Card */}
                                                                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-200 p-3 justify-between  rounded">
                                                                    <span className="text-xl font-bold">BIGBASKET</span>
                                                                    <button onClick={() => handleclick(13)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                                                        Update Structure
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Buttons */}
                                                            <div className="flex gap-4 sm:gap-16 mt-1 w-full justify-between">
                                                                <button className="bg-blue-500 text-black px-2 sm:px-4 py-1 sm:py-2 rounded-lg" onClick={() => handleprev(0)}>Previous</button>
                                                                <button className="bg-blue-500 text-black px-2 sm:px-4 py-1 sm:py-2 rounded-lg" onClick={handleDownload}>Finish</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </main>
                                            </div>



                                        )}




        </>
    );
};

export default Ahemdabad;
