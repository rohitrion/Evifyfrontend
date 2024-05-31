
import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";
import { useRecoilValue, useRecoilState } from 'recoil';
import { AuthState, BaseURLState } from '../Recoil';
import { Circles } from 'react-loader-spinner';
import Modal from "react-modal";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';
const Inventory_Form = () => {
    const baseurl = useRecoilValue(BaseURLState);
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState({
        category: [],
        color: [],
        city: [],
        size: [],
        bikeCategory: [],
        product_name: []
    });
    const defaultCategoryKey = 'category';
    const [input, setinput] = useState()
    const [hsn, sethsn] = useState('');
    const [productCategory, setproductcategory] = useState()
    const [authState, setauthstate] = useRecoilState(AuthState)

    const [selectedCategory, setSelectedCategory] = useState(defaultCategoryKey);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [showModalForProduct, setShowModalForProduct] = useState(null);
    const [holder, setholder] = useState()
    const [edit, itemforEdit] = useState()
    const [eidt2nd, setedit2] = useState()

    const [selectVal, setselectvalue] = useState('')
    const [sel, setsel] = useState([])
    const fetchData = async () => {

        setLoading(true);
        try {
            // const categoryData = await axios.get(`${baseurl}/categories`);
            // console.log(categoryData)





            const categoryData = await axios.get(`${baseurl}/categories`);
            const category = categoryData.data.category.map(category => ({
                value: category.category_id,
                label: category.category_name,
            }));
            setsel(category);








            const colorData = await axios.get(`${baseurl}/colors`);
            console.log(colorData)
            const cityData = await axios.get(`${baseurl}/cities`);
            console.log(cityData)
            const sizeData = await axios.get(`${baseurl}/sizes`);
            console.log(sizeData)
            const bikeCategoryData = await axios.get(`${baseurl}/bikes`);
            console.log(bikeCategoryData)
            const product_name = await axios.get(`${baseurl}/get/product_category`);
            console.log(product_name)


            const fetchedCategories = {
                category: categoryData.data.category,
                color: colorData.data.colors,
                city: cityData.data.cities,
                size: sizeData.data.size,
                bikeCategory: bikeCategoryData.data.bikes,
                product_name: product_name.data.products
            };


            setCategories(fetchedCategories);

            setSelectedItems(fetchedCategories[defaultCategoryKey]);


        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }


    };



    const handleCreate = (category) => {
        setIsOpen(true);
        setholder(category)
        // Logic to handle creating a new item
        setShowModalForProduct(category === "product_name")
        setselectvalue('')
        sethsn('')
        setinput('')

    };

    const handleCategoryClick = (categoryKey) => {

        if (categoryKey === selectedCategory) {
            setSelectedCategory(null);
            setSelectedItems([]);
        } else {
            setShowModalForProduct(categoryKey === "product_name")
            //   alert(categoryKey)
            setSelectedCategory(categoryKey);
            setSelectedItems(categories[categoryKey]);

        }
    };

    const renderCategoryItemName = (categoryKey, item) => {
        switch (categoryKey) {
            case 'category':
                return item.category_name;
            case 'color':
                return item.color_name;
            case 'city':
                return item.city_name;
            case 'size':
                return item.size_name;
            case 'bikeCategory':
                return item.bike_name;
            case 'product_name':
                return item.product_name;
            default:
                return item.item.name;
        }
    };

    const categoryApiMapping = {
        category: `${baseurl}/categories`,
        color: `${baseurl}/colors`,
        city: `${baseurl}/cities`,
        size: `${baseurl}/sizes`,
        bikeCategory: `${baseurl}/bikes`,
        product_name: `${baseurl}/product_category/category`
    };


    const categorynamess = {
        category: "category_name",
        color: "color_name",
        city: "city_name",
        size: "size_name",
        bikeCategory: "bike_name",
        product_name: "product_name"
    };






    const categoryApiedit = {
        category: `${baseurl}/categories`,
        color: `${baseurl}/colors`,
        city: `${baseurl}/cities`,
        size: `${baseurl}/sizes`,
        bikeCategory: `${baseurl}/bikes`,
        product_name: `${baseurl}/get/product_category`
    };



    const responseKeyMapping = {
        product_name: "product_category",
        city: "city",
        color: "color",
        bike: 'bike',
        size: 'size',
        category: 'category'
        // Add other mappings as needed
    };

    async function handlesubmit() {

        console.log(edit)

        if (edit) {

            let da = delcategoryIdMapping[eidt2nd]; // Dynamic property name
            let ide = edit[da]; //  id of selected data 

            // eb0a5a70-da88-4b54-9f48-750eee09f94d


            // let url = `${categoryApdel[category]}/${id}`

            const apiUrl = `${categoryApiedit[eidt2nd]}/${ide}`;

            // alert(apiUrl)
            let key = categorynamess[eidt2nd]

            const xinput = {

                [key]: input,
                hsn_code: hsn,
                category: selectVal.label
            };

            try {
                // Send the POST request to create a new item
                const response = await axios.patch(apiUrl, xinput, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const updatedItem = {
                    ...edit,
                    [key]: input,
                    hsn_code: hsn,
                    category: selectVal.label
                };

                const updatedItems = selectedItems.map(item =>
                    item[da] === ide ? updatedItem : item
                );

                const updatedCategories = {
                    ...categories,
                    [eidt2nd]: categories[eidt2nd].map(item =>
                        item[da] === ide ? updatedItem : item
                    )
                };


                setCategories(updatedCategories);
                setSelectedItems(updatedItems);
                toast.info("Item Update done", {
                    position: 'top-center',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })

                console.log('Item updated successfully:', updatedItem);



            } catch (error) {
                console.error('Error creating item:', error);
                toast.error(error.response.data.detail, {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            } finally {
                setinput('')
                setIsOpen(false)
                itemforEdit('')
            }



        } else {


            const apiUrl = categoryApiMapping[holder];

            let key = categorynamess[holder]

            const data = {

                [key]: input,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                is_deleted: false,
                hsn_code: hsn,
                category: selectVal.label
            };



            try {
                const headers = {
                    'Authorization': `Bearer ${authState.token}`,
                    'Content-Type': 'application/json', // Ensure correct Content-Type for JSON data
                };
                // Send the POST request to create a new item
                const response = await axios.post(apiUrl, data, { headers });

                console.log(response.data)

                const responseKey = responseKeyMapping[holder];
                const newItem = {
                    ...data,
                    ...response.data[responseKey], // Merge the response data for the correct key
                };
                // ,response.data.product_category
                const updatedCategories = {
                    ...categories,
                    [holder]: [...categories[holder], newItem]
                };

                // console.log('Updated categories:', updatedCategories);

                setCategories(updatedCategories);


                const newCategory = {
                    value: data, // Assuming the user input data contains the category_id
                    label: input, // Assuming the user input data contains the category_name
                  };
             
                    setsel([...sel, newCategory]);
                


                // console. log('Updating selected items');
                setSelectedItems(updatedCategories[holder]);
                toast.success("Item Added", {
                    position: 'top-center',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })

                // console.log('Categories state after update:', categories);
                // console.log('Selected items after update:', selectedItems);

                // console.log('Item created successfully:', newItem);


                // console.log('Item created successfully:', response.data);
                // fetchData(); // Refresh the data
            } catch (error) {
                console.error('Error creating item:', error);
                toast.error(error.response.data.detail, {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            } finally {
                setinput('')

                // sethsn('')
                setIsOpen(false)

            }
        }
    }

    // /colors/{color_id}

    const handleEdit = async (item, category) => {
        // Logic to handle editing an item

        setIsOpen(true)

        let name = renderCategoryItemName(selectedCategory, item)
        sethsn(item.HSN_code)
        setinput(name)
        setselectvalue({
            label: item.category
        });

        itemforEdit(item)
        setedit2(category)

    }






    const closeModal = () => {
        setIsOpen(false);
    };

    const handleClick = (product) => {
        // onProductSelect(product);
    };


    // function handleChnage(e) {
    //     setinput(e.target.value)
    //     sethsn(e.target.value)
    //     setproductcategory(e.target.value)
    // }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'input') setinput(value);
        if (name === 'hsn') sethsn(value);
        if (name === 'productCategory') setproductcategory(value);
    };



    const delcategoryIdMapping = {
        category: "category_id",
        color: "color_id",
        city: "city_id",
        size: "size_id",
        bikeCategory: "bike_id",
        product_name: "product_id"

        // Add other categories and their corresponding ID field names here
    };

    // http://54.237.210.197:8000/categories/567865
    const categoryApdel = {
        category: `${baseurl}/categories`,
        color: `${baseurl}/colors`,
        city: `${baseurl}/cities`,
        size: `${baseurl}/sizes`,
        bikeCategory: `${baseurl}/bikes`,
        product_name: `${baseurl}/get/product_category`
    };

    const handleDelete = async (item, category) => {


        setLoading(true);
        try {
            let da = delcategoryIdMapping[category]; // Dynamic property name
            let id = item[da]; //  id of selected data 

            let url = `${categoryApdel[category]}/${id}`

            const response = await axios.delete(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const updatedSelectedItems = selectedItems.filter(item => item[da] !== id);

            // Update the categories state by removing the deleted item from the corresponding category array
            const updatedCategories = {
                ...categories,
                [category]: categories[category].filter(item => item[da] !== id)
            };

            // Update states
            setCategories(updatedCategories);
            setSelectedItems(updatedSelectedItems);

            toast.error("Item deleted", {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            console.log(response.data); // Assuming the response contains meaningful data

        } catch (error) {
            console.error('Error deleting file:', error);
            // Handle error
        } finally {
            setLoading(false);
        }

        setShowModal(false);

    };


    useEffect(() => {
        fetchData();

    }, [baseurl]);




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

            <div className="container mx-auto  ">
                <h1 className="text-3xl font-bold mb-6 mt-8 text-center text-gray-800">Manage Categories</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6  place-content-center" >
                    {Object.keys(categories).map(categoryKey => (
                        <div key={categoryKey} className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-xl font-bold mb-4 text-center cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleCategoryClick(categoryKey)}>
                                {categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}
                            </h2>
                            <button onClick={() => handleCreate(categoryKey)} className="mt-4 px-4 py-2 bg-green-500 text-white text-center rounded hover:bg-green-600 transition duration-200">
                                Create New {categoryKey}
                            </button>

                            <ToastContainer />
                            <Modal
                                isOpen={isOpen}
                                onRequestClose={() => setShowModalForProduct(null)}
                                contentLabel="Add Category"
                                className="bg-white rounded-lg p-6 w-80 mx-auto mt-20 shadow-lg"
                                overlayClassName="fixed inset-0 flex   items-center justify-center "
                            >
                                <h2 className="text-2xl font-bold mb-4 text-gray-800"> Add {selectedCategory}</h2>


                                {showModalForProduct ?



                                    <div className='' >

                                        <Select
                                            className='mb-4'
                                            options={sel}
                                            placeholder="Select a Category name"
                                            isClearable
                                            onChange={(selectedOption) => setselectvalue(selectedOption)}
                                            value={selectVal}
                                        // filterOption={customFilterOption}
                                        />



                                        <input
                                            name="hsn"
                                            value={hsn}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                            onChange={handleInputChange}
                                            placeholder="Enter Hsn number"
                                        />


                                        <input
                                            name="input"
                                            value={input}
                                            className="w-full px-3 py-2 border mt-6 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                            onChange={handleInputChange}
                                            placeholder="Enter productcatgory name"
                                        />
                                    </div>


                                    : <input
                                        name="input"
                                        value={input}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                        onChange={handleInputChange}
                                        placeholder="Enter category name"
                                    />
                                }





                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handlesubmit(categoryKey)}
                                        disabled={loading}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                                    >
                                        {loading ? (
                                            <ThreeDots height={20} width={40} radius={9} color="#FFFFFF" ariaLabel="three-dots-loading" visible={true} />
                                        ) : (
                                            "Ok"
                                        )}
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="ml-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Modal>

                        </div>
                    ))}
                </div>




                {/* {selectedCategory && selectedItems?.length > 0 && (
                    <div className="mt-8 p-4 border border-gray-300 rounded shadow-lg bg-white">
                        <ul className="max-h-64 overflow-y-auto">
                            <div className='flex gap-60 items-center'>

                                <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h2>

                                {showModalForProduct && (
                                    <div className='flex gap-56' >
                                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Hsn</h2>

                                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Category</h2></div>
                                )
                                }
                            </div>

                            {selectedItems?.map(item => (
                                <div>

                                    <li key={item.id} className="flex justify-between  mx-auto  items-center mb-2 p-2 border-b border-gray-200">
                                        <span className=" text-black  ">{renderCategoryItemName(selectedCategory, item)}</span>
                                        {showModalForProduct && (
                                            <div className="flex  justify-center mx-auto  items-center  gap-64">
                                                <div className="flex flex-col mx-auto  items-center text-center ">

                                                    <li className="text-black ml-6 text-center">{item?.HSN_code}</li>
                                                </div>
                                                <div className="flex flex-col mx-auto   items-center text-center">

                                                    <li className="text-black  mx-auto  text-center">{item?.category}</li>
                                                </div>
                                            </div>
                                        )}


                                        <div className='flex gap-10 mr-7 '>





                                            <button onClick={() => handleEdit(item, selectedCategory)} class="edit-button">
                                                <svg class="edit-svgIcon" viewBox="0 0 512 512">
                                                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                                </svg>
                                            </button>



                                            <button onClick={() => handleDelete(item, selectedCategory)} class="delete-button">
                                                <svg class="delete-svgIcon" viewBox="0 0 448 512">
                                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                                </svg>
                                            </button>

                                        </div>
                                    </li>


                                </div>

                            ))}
                        </ul>
                    </div>
                )} */}






                {selectedCategory && selectedItems?.length > 0 && (
                    <div className="mt-8 ml-4 p-6 border border-gray-300 rounded shadow-lg bg-white fixed   w-8/12 overflow-y-auto  max-h-96" >
                        <div className="flex    ">
                            <h2 className="text-2xl font-bold mb-4  text-gray-800">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h2>

                        </div>

                        <table className="w-full text-left  ">
                            <thead>
                                <tr className="border-b border-gray-300   ">
                                    <th className="p-2   ">Item Name</th>
                                    {showModalForProduct && (
                                        <>
                                            <th className="p-2">HSN Code</th>
                                            <th className="p-2">Category</th>
                                        </>
                                    )}
                                    <th className="p-2">Edit</th>
                                    <th className="p-2">Delete</th>
                                </tr>
                            </thead>
                            <tbody className=' ' >
                                {selectedItems?.map(item => (
                                    <tr key={item.id} className="border-b border-gray-200  ">
                                        <td className="p-2">{renderCategoryItemName(selectedCategory, item)}</td>
                                        {showModalForProduct && (
                                            <>
                                                <td className="p-2">{item?.HSN_code}</td>
                                                <td className="p-2">{item?.category}</td>
                                            </>
                                        )}





                                        <td className=" px-2 py-2  ">
                                            <button onClick={() => handleEdit(item, selectedCategory)} className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
                                                <FaRegEdit className="h-4 w-4 text-[#5D7CF6]" />
                                                <span className="sr-only">Edit</span>
                                            </button>
                                        </td>
                                        <td className=" px-2 py-2  ">
                                            <button onClick={() => handleDelete(item, selectedCategory)} className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
                                                <FaTrashAlt className="h-4 w-4 text-gray-600" />
                                                <span className="sr-only ">Delete</span>
                                            </button>
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}


            </div>
        </>
    );
};

export default Inventory_Form;















{/* <td className="p-2 flex gap-2">


                                        
                                        <button onClick={() => handleEdit(item, selectedCategory)} className="edi-button">
                                            <svg className="edit-s" viewBox="0 0 512 512">
                                                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                            </svg>
                                        </button>
                                        <button onClick={() => handleDelete(item, selectedCategory)} className="delet-button">
                                            <svg className="delete-svgI" viewBox="0 0 448 512">
                                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                            </svg>
                                        </button>
                                    </td> */}







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ThreeDots } from "react-loader-spinner";
// import { useRecoilValue, useRecoilState } from 'recoil';
// import { AuthState, BaseURLState } from '../Recoil';
// import { Circles } from 'react-loader-spinner';
// import Modal from "react-modal";
// const Inventory_Form = () => {
//     const baseurl = useRecoilValue(BaseURLState);
//     const [isOpen, setIsOpen] = useState(false);
//     const [categories, setCategories] = useState({
//         category: [],
//         color: [],
//         city: [],
//         size: [],
//         bikeCategory: [],
//         product_name: []
//     });
//     const defaultCategoryKey = 'category';
//     const [input, setinput] = useState()
//     const [hsn, sethsn] = useState();
//     const [productCategory, setproductcategory] = useState()
//     const [authState, setauthstate] = useRecoilState(AuthState)

//     const [selectedCategory, setSelectedCategory] = useState(defaultCategoryKey);
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [showModal, setShowModal] = useState(false);

//     const [showModalForProduct, setShowModalForProduct] = useState(null);
//     const [holder, setholder] = useState()
//     const [edit, itemforEdit] = useState()
//     const [eidt2nd, setedit2] = useState()
//     const fetchData = async () => {

//         setLoading(true);
//         try {
//             // const categoryData = await axios.get(`${baseurl}/categories`);
//             // console.log(categoryData)





//             const categoryData = await axios.get(`${baseurl}/categories`);
//         const category = categoryData.data.category.map(category => ({
//           value: category.category_id,
//           label: category.category_name,
//         }));
//          setCategories(category);








//             const colorData = await axios.get(`${baseurl}/colors`);
//             console.log(colorData)
//             const cityData = await axios.get(`${baseurl}/cities`);
//             console.log(cityData)
//             const sizeData = await axios.get(`${baseurl}/sizes`);
//             console.log(sizeData)
//             const bikeCategoryData = await axios.get(`${baseurl}/bikes`);
//             console.log(bikeCategoryData)
//             const product_name = await axios.get(`${baseurl}/get/product_category`);
//             console.log(product_name)


//             const fetchedCategories = {
//                 category: categoryData.data.category,
//                 color: colorData.data.colors,
//                 city: cityData.data.cities,
//                 size: sizeData.data.size,
//                 bikeCategory: bikeCategoryData.data.bikes,
//                 product_name: product_name.data.products
//             };


//             setCategories(fetchedCategories);

//             setSelectedItems(fetchedCategories[defaultCategoryKey]);


//         } catch (error) {
//             console.error('Error fetching data: ', error);
//         } finally {
//             setLoading(false);
//         }


//     };



//     const handleCreate = (category) => {
//         setIsOpen(true);
//         setholder(category)

//         // Logic to handle creating a new item
//         setShowModalForProduct(category === "product_name")

//     };

//     const handleCategoryClick = (categoryKey) => {
//         if (categoryKey === selectedCategory) {
//             setSelectedCategory(null);
//             setSelectedItems([]);
//         } else {
//             setSelectedCategory(categoryKey);
//             setSelectedItems(categories[categoryKey]);
//         }
//     };

//     const renderCategoryItemName = (categoryKey, item) => {
//         switch (categoryKey) {
//             case 'category':
//                 return item.category_name;
//             case 'color':
//                 return item.color_name;
//             case 'city':
//                 return item.city_name;
//             case 'size':
//                 return item.size_name;
//             case 'bikeCategory':
//                 return item.bike_name;
//             case 'product_name':
//                 return item.product_name;
//             default:
//                 return item.item.name;
//         }
//     };

//     const categoryApiMapping = {
//         category: `${baseurl}/categories`,
//         color: `${baseurl}/colors`,
//         city: `${baseurl}/cities`,
//         size: `${baseurl}/sizes`,
//         bikeCategory: `${baseurl}/bikes`,
//         product_name: `${baseurl}/product_category/category`
//     };


//     const categorynamess = {
//         category: "category_name",
//         color: "color_name",
//         city: "city_name",
//         size: "size_name",
//         bikeCategory: "bike_name",
//         product_name: "product_name"
//     };






//     async function handlesubmit() {

//         console.log(edit)

//         if (edit) {

//             let da = delcategoryIdMapping[eidt2nd]; // Dynamic property name
//             let ide = edit[da]; //  id of selected data 

//             // eb0a5a70-da88-4b54-9f48-750eee09f94d


//             // let url = `${categoryApdel[category]}/${id}`

//             const apiUrl = `${categoryApiMapping[eidt2nd]}/${ide}`;

//             //  alert(apiUrl)
//             let key = categorynamess[eidt2nd]

//             const xinput = {

//                 [key]: input,

//             };

//             try {
//                 // Send the POST request to create a new item
//                 const response = await axios.patch(apiUrl, xinput, {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });

//                 const updatedItem = {
//                     ...edit,
//                     [key]: input
//                 };

//                 const updatedItems = selectedItems.map(item =>
//                     item[da] === ide ? updatedItem : item
//                 );

//                 const updatedCategories = {
//                     ...categories,
//                     [eidt2nd]: categories[eidt2nd].map(item =>
//                         item[da] === ide ? updatedItem : item
//                     )
//                 };

//                 setCategories(updatedCategories);
//                 setSelectedItems(updatedItems);

//                 console.log('Item updated successfully:', updatedItem);



//             } catch (error) {
//                 console.error('Error creating item:', error);
//             } finally {
//                 setinput('')
//                 setIsOpen(false)
//                 itemforEdit('')
//             }



//         } else {


//             const apiUrl = categoryApiMapping[holder];

//             var key = categorynamess[holder]

//             const xinput = {

//                 [key]: input,
//                 created_at: new Date().toISOString(),
//                 updated_at: new Date().toISOString(),
//                 is_deleted: false,
//                 hsn_code: hsn,
//                 category: productCategory
//             };

//             try {
//                 const headers = {
//                     'Authorization': `Bearer ${authState.token}`,
//                 };
//                 // Send the POST request to create a new item
//                 const response = await axios.post(apiUrl, xinput, {

//                     headers: {
//                         ...headers,
//                         'Content-Type': 'application/json', // Important for file uploads
//                     },

//                 });


//                 const newItem = {
//                     ...xinput,
//                 };

//                 const updatedCategories = {
//                     ...categories,
//                     [holder]: [...categories[holder], newItem]
//                 };

//                 console.log('Updated categories:', updatedCategories);

//                 setCategories(updatedCategories);

//                 console.log('Updating selected items');
//                 setSelectedItems(updatedCategories[holder]);

//                 console.log('Categories state after update:', categories);
//                 console.log('Selected items after update:', selectedItems);

//                 console.log('Item created successfully:', newItem);


//                 // console.log('Item created successfully:', response.data);
//                 // fetchData(); // Refresh the data
//             } catch (error) {
//                 console.error('Error creating item:', error);
//             } finally {
//                 setinput('')
//                 setIsOpen(false)

//             }
//         }
//     }

//     // /colors/{color_id}

//     const handleEdit = async (item, category) => {
//         // Logic to handle editing an item

//         setIsOpen(true)
//         let name = renderCategoryItemName(selectedCategory, item)
//         setinput(name)
//         itemforEdit(item)
//         setedit2(category)
//     }






//     const closeModal = () => {
//         setIsOpen(false);
//     };

//     const handleClick = (product) => {
//         // onProductSelect(product);
//     };


//     // function handleChnage(e) {
//     //     setinput(e.target.value)
//     //     sethsn(e.target.value)
//     //     setproductcategory(e.target.value)
//     // }


//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'input') setinput(value);
//         if (name === 'hsn') sethsn(value);
//         if (name === 'productCategory') setproductcategory(value);
//     };


//     const delcategoryIdMapping = {
//         category: "category_id",
//         color: "color_id",
//         city: "city_id",
//         size: "size_id",
//         bikeCategory: "bike_id"
//         // Add other categories and their corresponding ID field names here
//     };

//     // http://54.237.210.197:8000/categories/567865
//     const categoryApdel = {
//         category: `${baseurl}/categories`,
//         color: `${baseurl}/colors`,
//         city: `${baseurl}/cities`,
//         size: `${baseurl}/sizes`,
//         bikeCategory: `${baseurl}/bikes`
//     };

//     const handleDelete = async (item, category) => {


//         setLoading(true);
//         try {
//             let da = delcategoryIdMapping[category]; // Dynamic property name
//             let id = item[da]; //  id of selected data 

//             let url = `${categoryApdel[category]}/${id}`

//             // alert(url)
//             const response = await axios.delete(url, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             const updatedSelectedItems = selectedItems.filter(item => item[da] !== id);

//             // Update the categories state by removing the deleted item from the corresponding category array
//             const updatedCategories = {
//                 ...categories,
//                 [category]: categories[category].filter(item => item[da] !== id)
//             };

//             // Update states
//             setCategories(updatedCategories);
//             setSelectedItems(updatedSelectedItems);


//             console.log(response.data); // Assuming the response contains meaningful data

//         } catch (error) {
//             console.error('Error deleting file:', error);
//             // Handle error
//         } finally {
//             setLoading(false);
//         }

//         setShowModal(false);

//     };


//     useEffect(() => {
//         fetchData();

//     }, [baseurl]);



//     return (

//         <>
//             {loading && (
//                 <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-opacity-60 z-2 bg-gray-300">
//                     <div className="ml-40">
//                         <Circles
//                             height="80"
//                             width="80"
//                             color="#4fa94d"
//                             ariaLabel="circles-loading"
//                             wrapperStyle={{}}
//                             wrapperClass=""
//                             visible={true}
//                         />

//                     </div>
//                 </div>
//             )}
//             <div className="container mx-auto  ">
//                 <h1 className="text-3xl font-bold mb-6 mt-8 text-center text-gray-800">Manage Categories</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6  place-content-center" >
//                     {Object.keys(categories).map(categoryKey => (
//                         <div key={categoryKey} className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
//                             <h2 className="text-xl font-bold mb-4 text-center cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleCategoryClick(categoryKey)}>
//                                 {categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}
//                             </h2>
//                             <button onClick={() => handleCreate(categoryKey)} className="mt-4 px-4 py-2 bg-green-500 text-white text-center rounded hover:bg-green-600 transition duration-200">
//                                 Create New {categoryKey}
//                             </button>

//                             <Modal
//                                 isOpen={isOpen}
//                                 onRequestClose={() => setShowModalForProduct(null)}
//                                 contentLabel="Add Category"
//                                 className="bg-white rounded-lg p-6 w-80 mx-auto mt-20 shadow-lg"
//                                 overlayClassName="fixed inset-0 flex   items-center justify-center "
//                             >
//                                 <h2 className="text-2xl font-bold mb-4 text-gray-800"> Add {selectedCategory}</h2>


//                                 {showModalForProduct ?










//                                     <div className='mt-6' >

//                                         {/* <Select
//                                             options={cityOptions}
//                                             placeholder="Select a City name"
//                                             isClearable
//                                             onChange={(selectedOption) => setSelectedCity(selectedOption)}
//                                             value={selectedCity}
//                                         // filterOption={customFilterOption}
//                                         /> */}






//                                         {/* <select
//                     id="city"
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                     value={selectedCity}
//                     onChange={(e) => setSelectedCity(e.target.value)}
//                   >
//                     <option value="">Select City</option>
//                     {cityOptions.map((city) => (
//                       <option key={city.id} value={city.city_name}>{city.city_name}</option>
//                     ))}
//                             </select> */}




//                                         <input
//                                             name="hsn"
//                                             value={hsn}
//                                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//                                             onChange={handleInputChange}
//                                             placeholder="Enter Hsn number"
//                                         />


//                                         <input
//                                             name="productCategory"
//                                             value={productCategory}
//                                             className="w-full px-3 py-2 border mt-6 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//                                             onChange={handleInputChange}
//                                             placeholder="Enter productcatgory name"
//                                         />
//                                     </div>


//                                     : <input
//                                         name="input"
//                                         value={input}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//                                         onChange={handleInputChange}
//                                         placeholder="Enter category name"
//                                     />
//                                 }





//                                 <div className="flex justify-between mt-4">
//                                     <button
//                                         onClick={() => handlesubmit(categoryKey)}
//                                         disabled={loading}
//                                         className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
//                                     >
//                                         {loading ? (
//                                             <ThreeDots height={20} width={40} radius={9} color="#FFFFFF" ariaLabel="three-dots-loading" visible={true} />
//                                         ) : (
//                                             "Ok"
//                                         )}
//                                     </button>
//                                     <button
//                                         onClick={closeModal}
//                                         className="ml-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </Modal>

//                         </div>
//                     ))}
//                 </div>




//                 {selectedCategory && selectedItems.length > 0 && (
//                     <div className="mt-8 p-4 border border-gray-300 rounded shadow-lg bg-white">
//                         <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h2>
//                         <ul className="max-h-64 overflow-y-auto">
//                             {selectedItems.map(item => (
//                                 <div>
//                                     <li key={item.id} className="flex justify-between items-center mb-2 p-2 border-b border-gray-200">
//                                         <span className=" text-black  ">{renderCategoryItemName(selectedCategory, item)}</span>
//                                         <div className='flex gap-10 mr-7 '>





//                                             <button onClick={() => handleEdit(item, selectedCategory)} class="edit-button">
//                                                 <svg class="edit-svgIcon" viewBox="0 0 512 512">
//                                                     <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
//                                                 </svg>
//                                             </button>



//                                             <button onClick={() => handleDelete(item, selectedCategory)} class="delete-button">
//                                                 <svg class="delete-svgIcon" viewBox="0 0 448 512">
//                                                     <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
//                                                 </svg>
//                                             </button>
//                                             {/* 
//                                             <button onClick={() => handleEdit(item, selectedCategory)} className="px-3 py-1  bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 transition duration-200">Edit</button> */}
//                                             {/* <button onClick={() => handleDelete(item, selectedCategory)} className="px-3 mr-6 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200">Delete</button> */}
//                                         </div>
//                                     </li>


//                                 </div>

//                             ))}
//                         </ul>
//                     </div>
//                 )}

//             </div>
//         </>
//     );
// };

// export default Inventory_Form;









