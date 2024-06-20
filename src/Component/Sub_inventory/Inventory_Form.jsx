

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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Inventory_Form = () => {
    const baseurl = useRecoilValue(BaseURLState);
    const [isOpen, setIsOpen] = useState(false);


    const [key, setkey] = useState()

    const [categories, setCategories] = useState({
        category: [],
        color: [],
        city: [],
        size: [],
        bikeCategory: [],
        product_name: []
    });




    const [searchQueries, setSearchQueries] = useState({
        category: '',
        color: '',
        city: '',
        size: '',
        bikeCategory: '',
        product_name: '',
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



    const handleSearchChange = (categoryKey, value) => {
        setSearchQueries((prevSearchQueries) => ({
            ...prevSearchQueries,
            [categoryKey]: value,
        }));
    };


    // const fetchData = async () => {

    //     setLoading(true);
    //     try {
    //         // const categoryData = await axios.get(`${baseurl}/categories`);
    //         // console.log(categoryData)





    //         const categoryData = await axios.get(`${baseurl}/categories`);
    //         const category = categoryData.data.category.map(category => ({
    //             value: category.category_id,
    //             label: category.category_name,
    //         }));
    //         setsel(category);








    //         const colorData = await axios.get(`${baseurl}/colors`);
    //         console.log(colorData)
    //         const cityData = await axios.get(`${baseurl}/cities`);
    //         console.log(cityData)
    //         const sizeData = await axios.get(`${baseurl}/sizes`);
    //         console.log(sizeData)
    //         const bikeCategoryData = await axios.get(`${baseurl}/bikes`);
    //         console.log(bikeCategoryData)
    //         const product_name = await axios.get(`${baseurl}/get/product_category`);
    //         console.log(product_name)


    //         const fetchedCategories = {
    //             category: categoryData.data.category,
    //             color: colorData.data.colors,
    //             city: cityData.data.cities,
    //             size: sizeData.data.size,
    //             bikeCategory: bikeCategoryData.data.bikes,
    //             product_name: product_name.data.products
    //         };


    //         setCategories(fetchedCategories);

    //         setSelectedItems(fetchedCategories[defaultCategoryKey]);


    //     } catch (error) {
    //         console.error('Error fetching data: ', error);
    //     } finally {
    //         setLoading(false);
    //     }


    // }; teh fetch daat 
    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch category data first
            const categoryData = await axios.get(`${baseurl}/categories`);
            const category = categoryData.data.category.map(category => ({
                value: category.category_id,
                label: category.category_name,
            }));
            setsel(category);
            setCategories((prevCategories) => ({
                ...prevCategories,
                category: categoryData.data.category,
            }));
            setSelectedItems(categoryData.data.category);

            // After fetching category data, fetch remaining data in parallel
            const [colorData, cityData, sizeData, bikeCategoryData, productNameData] = await Promise.all([
                axios.get(`${baseurl}/colors`),
                axios.get(`${baseurl}/cities`),
                axios.get(`${baseurl}/sizes`),
                axios.get(`${baseurl}/bikes`),
                axios.get(`${baseurl}/get/product_category`),
            ]);

            const fetchedCategories = {
                color: colorData.data.colors,
                city: cityData.data.cities,
                size: sizeData.data.size,
                bikeCategory: bikeCategoryData.data.bikes,
                product_name: productNameData.data.products,
            };

            setCategories((prevCategories) => ({
                ...prevCategories,
                ...fetchedCategories,
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };


    // Logic to handle creating a new item
    const handleCreate = (category) => {
        if (key == category) {
            setIsOpen(true);
            setholder(category)
            setShowModalForProduct(category === "product_name")
            setselectvalue('')
            sethsn('')
            setinput('')

        } else {
            toast.error(`Click on  ${category} first `, {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }

    };

    const handleCategoryClick = (categoryKey) => {
        setkey(categoryKey)
        if (categoryKey === selectedCategory) {
            // setSelectedCategory(null);
            // setSelectedItems([]);
        } else {
            setShowModalForProduct(categoryKey === "product_name")
            //   alert(categoryKey)
            setSelectedCategory(categoryKey);
            setSelectedItems(categories[categoryKey]);

        }
    };







    const renderCategoryItemName = (categoryKey, item) => {

        const searchQuery = searchQueries[categoryKey].toLowerCase();
        const itemName = item[categorynamess[categoryKey]].toLowerCase();
        const hsnCode = item.HSN_code ? item.HSN_code.toLowerCase() : '';

        if (
            itemName.includes(searchQuery) ||
            (showModalForProduct && hsnCode.includes(searchQuery))
        ) {
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
        }
        return null;
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


                {selectedCategory && selectedItems?.length > 0 && (
                    <div className="mt-8 ml-4 p-6 border border-gray-300 rounded-md shadow-lg bg-white fixed w-8/12 ">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                            </h2>
                            <span className="">
                                <input
                                    placeholder="  🔍️    Search"
                                    value={searchQueries[selectedCategory]}
                                    onChange={(e) => handleSearchChange(selectedCategory, e.target.value)}
                                    type="text"
                                    className="w-96 border border-black px-2 py-1 rounded-md focus:border-indigo-500"
                                />
                            </span>
                        </div>

                        <div className="relative overflow-y-auto max-h-80 ">
                            <table className="w-full text-left">
                                <thead className="sticky top-0 bg-white">
                                    <tr className="border-b border-gray-300 bg-[#008F901A]  text-[#000000]">
                                        <th className="p-2">Item Name</th>
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
                                <tbody className="">
                                    {selectedItems
                                        ?.filter((item) => renderCategoryItemName(selectedCategory, item))
                                        .map((item) => (
                                            <tr
                                                key={item.id}
                                                className="border-b border-gray-200 hover:bg-blue-100/40 text-[#000000]"
                                            >
                                                <td className="p-3">
                                                    {renderCategoryItemName(selectedCategory, item)}
                                                </td>
                                                {showModalForProduct && (
                                                    <>
                                                        <td className="p-2">{item?.HSN_code}</td>
                                                        <td className="p-2">{item?.category}</td>
                                                    </>
                                                )}
                                                <td className="px-2 py-2 text-[#000000]">
                                                    <button
                                                        onClick={() => handleEdit(item, selectedCategory)}
                                                        className="rounded-full p-2 bg-gray-200 hover:bg-gray-300"
                                                    >
                                                        <FaRegEdit className="h-4 w-4 text-[#5D7CF6]" />
                                                        <span className="sr-only">Edit</span>
                                                    </button>
                                                </td>
                                                <td className="px-2 py-2">
                                                    <button
                                                        onClick={() => handleDelete(item, selectedCategory)}
                                                        className="rounded-full p-2 bg-gray-200 hover:bg-gray-300"
                                                    >
                                                        <FaTrashAlt className="h-4 w-4 text-gray-600" />
                                                        <span className="sr-only">Delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
                }




            </div>
        </>
    );
};

export default Inventory_Form;











