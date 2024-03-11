
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseURLState, Finalresponse, Num, TextState } from '../Recoil';
import Ahzomato from './Ahzomato';
import Ahblinkit from './Ahblinkit';
import Ahbbnow from './Ahbbnow';
import Ahflipkart from './Ahflipkart';
import Ahecom from './Ahecom';
import Bluedart from './Bluedart';
import Ahbludedart from './Ahbigbasket';
import Ahbigbasket from './Ahbigbasket';

const Ahemdabad = () => {
    const [num, setnum] = useRecoilState(Num);
    const baseurl = useRecoilValue(BaseURLState);
    const [final, setfinal] = useRecoilState(Finalresponse);

    const handleclick = (val) => {
        setnum(val);
    };

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


            {num === 8 ? (
                <Ahzomato />
            ) :

                num === 9 ? (
                    <Ahblinkit />
                ) :

                    num === 10 ? (
                        <Ahbbnow />

                    ) : num === 11 ? (
                        <Ahflipkart />
                    ) :

                        num === 12 ? (
                            <Ahecom />
                        ) :


                            num === 13 ? (
                                <Ahbigbasket />
                            ) :




                                (

                                    <div className="flex items-center justify-center pl-[80px]  mb-60 ml-96">
                                        <main className="bg-white p-8 rounded shadow-lg w-[500px]">

                                            <div className="container mx-auto mt-8 ">





                                                <div className="mb-4  flex flex-col justify-center items-center gap-8 ">
                                                    <h3 className="text-2xl font-bold text-center  ">  SALARY STRUCTURE AHEMDABAD </h3>

                                                    <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
                                                        <span className="text-xl font-bold">ZOMATO</span>

                                                        <button onClick={() => handleclick(8)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                                            Update Structure
                                                        </button>


                                                    </div>

                                                    <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded  ">
                                                        <span className="text-xl font-bold">BLINKIT</span>
                                                        <button onClick={() => handleclick(9)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                                            Update Structure
                                                        </button>


                                                    </div>



                                                    <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
                                                        <span className="text-xl font-bold" >BB-NOW</span>
                                                        <button onClick={() => handleclick(10)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                                            Update Structure
                                                        </button>


                                                    </div>



                                                    <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
                                                        <span className="text-xl font-bold" >FLIPKART</span>
                                                        <button onClick={() => handleclick(11)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                                            Update Structure
                                                        </button>


                                                    </div>




                                                    <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
                                                        <span className="text-xl font-bold" >ECOM</span>
                                                        <button onClick={() => handleclick(12)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                                            Update Structure
                                                        </button>


                                                    </div>



                                                    <div className="flex items-center gap-[38px] justify-between w-96 bg-gray-200 p-3 rounded ">
                                                        <span className="text-xl font-bold" >BIGBASKET</span>
                                                        <button onClick={() => handleclick(13)} className="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                                            Update Structure
                                                        </button>


                                                    </div>






                                                    <div className='flex gap-16  mt-3  justify-between' >

                                                        <button className="bg-blue-500 text-black px-4 py-2  rounded-lg " onClick={() => handleclick(1)} >previous</button>
                                                        <button className="bg-blue-500 text-black px-4 py-2  rounded-lg  " onClick={handleDownload} >Finish</button>
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
