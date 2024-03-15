import axios from "axios";
import { useEffect, useState } from "react";
import Rawtabs from "./Rawtabs";
import { useRecoilState } from "recoil";
import { BaseURLState } from "../Recoil";
import { Circles } from 'react-loader-spinner'

function Rawdata({ activetab }) {
    const [data, setData] = useState([]);
    const [loading, setloding] = useState(false)
    const [baseurl, setbaseurl] = useRecoilState(BaseURLState)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloding(true)
                const response = await axios.get(`${baseurl}/${activetab}`, {
                    headers: {
                        'ngrok-skip-browser-warning': '69429'
                    }
                });

                setData(response.data.data);
               
            } catch (error) {
                // console.error("Error fetching data:", error);
            } finally {
                setloding(false)
            }
        };

        fetchData();
    }, [activetab]);

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

            <div className="overflow-y-auto transition ease-in-out duration-500 transform hover:shadow-xl z-1 h-screen  scrollbar  ">
                {data.map((item,key) => (
                    <Rawtabs key={item.filekey} item={item} activetab={activetab}   data={data}   val={key} setdata={setData}  />
                ))}
            </div>

        </>
    );
}

export default Rawdata;





