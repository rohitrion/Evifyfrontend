




import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { BaseURLState } from '../Recoil';
import axios from 'axios';
import Modal from 'react-modal';
// import DataInventory from './DataInventory';
import { Circles } from 'react-loader-spinner';
import Catdata from './Catdata';
// import Category_data from './Category_data';
// import Singleproduct from './Singleproduct';
const Container_1 = ({ product, onProductSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [baseurl, setBaseurl] = useRecoilState(BaseURLState);
    const [getapidata, setgetapi] = useState([])
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedInventory, setSelectedInventory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [Edit, SetEdit] = useState(false)

    const [productname, setproductname] = useState('');
    const [category, setCategory] = useState('');
    const [bikeCategory, setBikeCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [categories, setCategories] = useState([]);
    const [bikeCategories, setBikeCategories] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);



    const formRef = useRef(null);








    const openModal = () => {
        setIsOpen(true);

    };




    // const handleProductSelect = (product) => {
    //   setSelectedProduct(product);
    // };


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '30%', // Adjusted width for responsiveness
            width: 'auto', // Set to auto for responsiveness
            maxHeight: '90vh', // Limit height for small screens
            overflow: 'auto', // Enable scrolling if content overflows
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            position: 'relative'

        },
        overlay: {
            background: 'rgba(0,0,0,0.6)'
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setproductname('')
        setCategory('')
        setSelectedCity('')
        setBikeCategory('')
        setSelectedColor('')
        setSelectedSize('')
        setQuantity('')
    };



    const handleEdit = (inventory) => {
        setSelectedInventory(inventory);
        setIsOpen(true);
        SetEdit(true)
        setproductname(inventory.product_name)
        setCategory(inventory.category);
        setBikeCategory(inventory.bike_category);
        setQuantity(inventory.quantity);
        setSelectedSize(inventory.size);
        setSelectedColor(inventory.color);
        setSelectedCity(inventory.city);


        console.log(inventory)
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('product_name', productname);
            formData.append('category', category);
            formData.append('bike_category', bikeCategory);
            formData.append('quantity', quantity);
            formData.append('size', selectedSize);
            formData.append('color', selectedColor);
            formData.append('city', selectedCity);

            if (selectedInventory) {
                const response = await axios.patch(`${baseurl}/products/${selectedInventory.product_id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Inventory updated successfully!');
                console.log(response.data);

                setFilteredData(prevData => prevData.map(item => {
                    if (item.product_id === selectedInventory.product_id) {
                        return {
                            ...item,
                            product_name: productname,
                            category: category,
                            bike_category: bikeCategory,
                            quantity: parseInt(quantity), // Assuming quantity is a number
                            size: selectedSize,
                            color: selectedColor,
                            city: selectedCity
                        };
                    } else {
                        return item;
                    }
                }));
            } else {


                const response = await axios.post(`${baseurl}/product/${product.invoice_id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data, ' the response')
                // setgetapi(prevData => [...prevData, response.data.invoice]);
                setgetapi(prevData => [...prevData, response.data]);
                console.log('product created successfully!');

                setFilteredData(prevData => [...prevData, response.data])
                setError(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to submit form data. Please try again later.');
        } finally {
            setIsLoading(false);
            closeModal();
        }
    };



    useEffect(() => {

        const filteredResults = getapidata.filter(item =>
            item?.product_name && item.product_name.toLowerCase().includes(search.toLowerCase()) || item?.HSN_code && item.HSN_code.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredData(filteredResults);
    }, [search]);




    useEffect(() => {
        const fetchData = async () => {
            try {

                setLoading(true);
                const response = await axios.get(`${baseurl}/get/inventory/used`);
                console.log(response.data.products, "the data of products")
                if (response.status === 204) {
                    // Handle scenario where invoice does not exist
                    console.log('Invoice not found.');
                } else {
                    // Invoice found, update state with invoice date

                    setgetapi(response.data.products);

                    setFilteredData(response.data.products);

                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [baseurl]);

    return (
        <>
            <div>


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


                <div>

                    <div className="w-full mx-auto pt-1  pb-4 ">
                        <h1 className="text-center mb-4 text-2xl font-bold">
                            {/* Product Details of {product.vendor} */}
                        </h1>
                        <div className="flex items-center justify-between gap-2">

                            <div className="relative w-full mr-4">
                                <input
                                    type="text"
                                    name="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder=" 🔍️     Search"
                                    className="border rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg
                                        className="w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 15l5-5m0 0l-5-5m5 5H4"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                                Download
                            </button>
                            {/* <button className="px-4 py-2 bg-gray-800 text-white text-end rounded hover:bg-gray-700" onClick={() => onProductSelect(null)}>Back </button> */}
                        </div>
                    </div>

                    <Modal
                        isOpen={isOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"

                    >
                        <h2 className="text-lg font-bold mb-4">Product DETAILS</h2>
                        <form onSubmit={handleSubmit} ref={formRef}>



                            <div className="mb-4">
                                <label htmlFor="invoice_number" className="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
                                <input
                                    type="text"
                                    name="invoice_number"
                                    value={productname}
                                    onChange={(e) => setproductname(e.target.value)}
                                    placeholder="Enter Product Name"
                                    className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>



                            <div className="mb-4    ">
                                <label htmlFor="invoice_number" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>

                                <select
                                    id="category"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.category_name}>{category.category_name}</option>
                                    ))}
                                </select>
                            </div>



                            <div className="mb-4">
                                <label htmlFor="invoice_number" className="block text-gray-700 text-sm font-bold mb-2">Bike-Category:</label>
                                <select
                                    id="bikeCategory"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={bikeCategory}
                                    onChange={(e) => setBikeCategory(e.target.value)}
                                >
                                    <option value="">Select Bike Category</option>
                                    {bikeCategories.map((bikeCategory) => (
                                        <option key={bikeCategory.id} value={bikeCategory.bike_name}>{bikeCategory.bike_name}</option>
                                    ))}
                                </select>
                            </div>


                            <div className="mb-4">
                                <label htmlFor="invoice_amount" className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="quantity"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                    <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="invoice_date" className="block text-gray-700 text-sm font-bold mb-2">SIZE</label>
                                <div className="relative">
                                    <select
                                        id="size"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                    >
                                        <option value="">Select Size</option>
                                        {sizeOptions.map((size) => (
                                            <option key={size.id} value={size.size_name}>{size.size_name}</option>
                                        ))}
                                    </select>
                                    <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none text-gray-500">

                                    </span>
                                </div>
                            </div>


                            <div className="mb-4">
                                <label htmlFor="inventory_paydate" className="block text-gray-700 text-sm font-bold mb-2">Colour</label>
                                <div className="relative">
                                    <select
                                        id="color"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        value={selectedColor}
                                        onChange={(e) => setSelectedColor(e.target.value)}
                                    >
                                        <option value="">Select Color</option>
                                        {colorOptions.map((color) => (
                                            <option key={color.id} value={color.color_name}>{color.color_name}</option>
                                        ))}
                                    </select>
                                    <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none">
                                        {/* <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg> */}
                                    </span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="vendor" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                                <div className="relative">
                                    <select
                                        id="city"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                    >
                                        <option value="">Select City</option>
                                        {cityOptions.map((city) => (
                                            <option key={city.id} value={city.city_name}>{city.city_name}</option>
                                        ))}
                                    </select>
                                    <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                        {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg> */}
                                    </span>
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    {isLoading ? 'Submitting...' : 'Submit'}
                                </button>
                                <button onClick={closeModal} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Close
                                </button>
                            </div>
                        </form>
                        {error && <div>{error}</div>}
                    </Modal>


                </div>


                <div style={{ maxHeight: '800px', overflowX: 'scroll' }} >


                    {
                        < Catdata filteredData={filteredData} onProductSelect={onProductSelect}
                            data={getapidata} setFilteredData={setFilteredData}
                            setdata={setgetapi} modal={openModal} onEdit={handleEdit} closemodal={closeModal} />
                    }
                </div>


            </div>
        </>

    )
}





export default Container_1