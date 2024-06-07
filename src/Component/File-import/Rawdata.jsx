



import React, { useState, useEffect } from "react";
import axios from "axios";
import { Circles } from 'react-loader-spinner';
import Rawtabs from "./Rawtabs";
import { useRecoilState } from "recoil";
import { BaseURLState, Search } from "../Recoil";

function Rawdata({ activetab }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [baseurl, setBaseurl] = useRecoilState(BaseURLState);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useRecoilState(Search)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${baseurl}/${activetab}`, {
                    headers: {
                        'ngrok-skip-browser-warning': '69429'
                    }
                });

                setData(response.data.data);
                setFilteredData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activetab, baseurl]);

    useEffect(() => {
        const filteredResults = data.filter(item =>
            item.file_name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(filteredResults);
    }, [search, data]);


    return (
        <>
            {loading && (
                <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-opacity-60 z-2 bg-gray-300">
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


            <div className="overflow-y-auto transition ease-in-out duration-500 transform hover:shadow-xl z-0 h-[50rem] scrollbar">
                {filteredData && filteredData.length > 0 ? (
                    filteredData.map((item, key) => (
                        <Rawtabs
                            key={item.filekey}
                            item={item}
                            activetab={activetab}
                            data={data}
                            val={key}
                            setData={setData}
                            filteredData={filteredData}
                            setFilteredData={setFilteredData}

                        />
                    ))
                ) : (
                    <div className="text-center font-sans font-large font-extrabold  mt-16">No data Found</div>
                )}
            </div>

        </>
    );
}

export default Rawdata;
