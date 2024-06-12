

import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { AuthState, BaseURLState } from '../Recoil';
import axios from 'axios';
import Modal from 'react-modal';
import Select from 'react-select';
import DataInventory from './DataInventory';
import { Circles } from 'react-loader-spinner';
import Singleproduct from './Singleproduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductDetail = ({ product, onProductSelect }) => {
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



  const [Differnce, SetDiffernce] = useState()

  const [Edit, SetEdit] = useState(false)

  const [productname, setproductname] = useState('');
  const [category, setCategory] = useState('');
  const [bikeCategory, setBikeCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [Amount, setamount] = useState('')
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [Gst, setGst] = useState(null);
  const [unit, setUnit] = useState(null);
  const [hsn, Sethsn] = useState('')

  const [categories, setCategories] = useState([]);
  const [bikeCategories, setBikeCategories] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [products, setproducts] = useState([]);
  const [authState, setauthstate] = useRecoilState(AuthState)


  // const [inputFields, setInputFields] = useState({
  //   invoice_number: '',
  //   invoice_amount: '',
  //   invoice_date: '',
  //   inventory_paydate: '',
  //   vendor: '',
  //   invoice_image_id: ''
  // });
  const formRef = useRef(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        // const categoryResponse = await axios.get(`${baseurl}/categories`);
        // setCategories(categoryResponse.data.category);


        // response.data.products[0].category

        const categoryResponse = await axios.get(`${baseurl}/get/product_category/${hsn}`);
        const category = categoryResponse.data.products.map(category => ({
          value: category.category,
          label: category.category,
        }));
        setCategories(category);




        // const productname = await axios.get(`${baseurl}/get/product_category/${hsn}`);
        const categoryOptions = categoryResponse.data.products.map(category => ({
          value: category.product_name,
          label: category.product_name,
        }));
        setproducts(categoryOptions);



        // Fetch bike categories
        // const bikeCategoryResponse = await axios.get(`${baseurl}/bikes`);
        // setBikeCategories(bikeCategoryResponse.data.bikes);





        const bikeCategoryResponse = await axios.get(`${baseurl}/bikes`);
        const Bike = bikeCategoryResponse.data.bikes.map(category => ({
          value: category.bike_id,
          label: category.bike_name,
        }));
        setBikeCategories(Bike);







        // Fetch sizes
        // const sizeResponse = await axios.get(`${baseurl}/sizes`);
        // setSizeOptions(sizeResponse.data.size);




        const sizeResponse = await axios.get(`${baseurl}/sizes`);
        const size = sizeResponse.data.size.map(category => ({
          value: category.size_id,
          label: category.size_name,
        }));
        setSizeOptions(size);



        // // Fetch colors
        // const colorResponse = await axios.get(`${baseurl}/colors`);
        // setColorOptions(colorResponse.data.colors);


        const colorResponse = await axios.get(`${baseurl}/colors`);
        const colors = colorResponse.data.colors.map(category => ({
          value: category.color_id,
          label: category.color_name,
        }));
        setColorOptions(colors);




        // // Fetch cities
        // const cityResponse = await axios.get(`${baseurl}/cities`);
        // setCityOptions(cityResponse.data.cities);


        const cityResponse = await axios.get(`${baseurl}/cities`);
        const City = cityResponse.data.cities.map(category => ({
          value: category.city_id,
          label: category.city_name,
        }));
        setCityOptions(City);




        // const productname = await axios.get(`${baseurl}/get/product_category`);
        // setproducts(productname.data.products);




      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [baseurl, hsn]);




  const openModal = () => {
    setIsOpen(true);
    // setInputFields({
    //   invoice_number: '',
    //   invoice_amount: '',
    //   invoice_date: '',
    //   inventory_paydate: '',
    //   vendor: '',
    //   invoice_image_id: ''
    // });


    // setSelectedInventory(null);
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
      maxHeight: '80vh', // Limit height for small screens
      overflow: 'auto', // Enable scrolling if content overflows
      background: '#f8f8ff',
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
    Sethsn('')
    setamount('')
    setGst('')
  };

  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setInputFields(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  const handleEdit = (inventory) => {
    setSelectedInventory(inventory);
    setIsOpen(true);
    SetEdit(true)
    setproductname({
      label: inventory.product_name
    })

    setCategory({
      label: inventory.category
    });

    setBikeCategory({ label: inventory.bike_category });
    setQuantity(inventory.quantity);
    setSelectedSize({ label: inventory.size });
    setSelectedColor({ label: inventory.color });
    setSelectedCity({ label: inventory.city });
    Sethsn(inventory.HSN_code)
    setUnit(inventory.unit)
    setGst(inventory.GST)
    setamount(inventory.total_amount)
    console.log(inventory)
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);




    const requiredFields = [
      { name: 'productname', value: productname },
      { name: 'category', value: category },
      { name: 'bikeCategory', value: bikeCategory },
      { name: 'quantity', value: quantity },
      { name: 'Amount', value: Amount },
      { name: 'selectedSize', value: selectedSize },
      { name: 'selectedColor', value: selectedColor },
      { name: 'selectedCity', value: selectedCity },
      { name: 'Gst', value: Gst },
      { name: 'unit', value: unit },
      { name: 'hsn', value: hsn },
    ];

    const hasEmptyRequiredField = requiredFields.some(field => field.value === '');

    if (hasEmptyRequiredField) {
      toast.error("Please fill all the required fields", {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

      });
      setIsLoading(false);

      return;
    }

    try {


      const formData = new FormData();
      formData.append('product_name', productname.label);
      formData.append('category', category.label);
      formData.append('bike_category', bikeCategory.label);
      formData.append('quantity', quantity);
      formData.append('size', selectedSize.label);
      formData.append('color', selectedColor.label);
      formData.append('city', selectedCity.label);
      formData.append('HSN_code', hsn);
      formData.append('GST', Gst);
      formData.append('unit', unit);
      formData.append('amount', Amount);


      if (selectedInventory) {
        const response = await axios.patch(`${baseurl}/products/${selectedInventory.product_id}`, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Inventory updated successfully!');
        toast.success("product updated successfully", {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        console.log(response.data);

        setFilteredData(prevData => prevData.map(item => {
          if (item.product_id === selectedInventory.product_id) {
            return {
              ...item,
              product_name: productname.label,
              category: category.label,
              bike_category: bikeCategory.label,
              quantity: parseInt(quantity),
              size: selectedSize.label,
              color: selectedColor.label,
              city: selectedCity.label,
              GST: Gst,
              unit: unit,
              amount: Amount,
              HSN_code: hsn

            };

          } else {
            return item;
          }
        }));
      } else {

        const headers = {
          'Authorization': `Bearer ${authState.token}`,
        };
        const response = await axios.post(`${baseurl}/product/${product.invoice_id}`, formData, {
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data, ' the response')
        // setgetapi(prevData => [...prevData, response.data.invoice]);
        setgetapi(prevData => [...prevData, response.data]);
        console.log('product created successfully!');

        setFilteredData(prevData => [...prevData, response.data])
        setError(null);

        toast.success("product created successfully", {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    } catch (error) {
      toast.error(error)

    } finally {
      setIsLoading(false);
      closeModal();
    }
  };







  const handleGstChange = (event) => {
    setGst(event.target.value);
  };




  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };



  const fetchProductAndCategory = async (hsn) => {
    try {
      const response = await axios.get(`${baseurl}/get/product_category/${hsn}`)
      // const response = await fetch(`/get/product_category/${hsnCode}`);
      // const data = await response.json();
      // Handle the API response data and update the respective states
      // for the product and category dropdowns
      console.log(response.data.products, "zandubababab")

      // setCategory({
      //   value: response.data.products,
      //   label: category.city_name,
      // });





      // setproductname({
      //   label:  response.data.products.product_name
      // });
      if (response.data.products.length > 0) {
        setCategory({
          value: response.data.products[0].category, // Assuming 'city_name' is the desired label
          label: response.data.products[0].category,
        });

        setproductname({
          value: response.data.products[0].product_name, // Assuming 'product_name' is the desired label
          label: response.data.products[0].product_name,
        });



      } else {
        // Handle the case when the products array is empty
        setCategory({ value: '', label: '' });
        setproductname({ value: '', label: '' });
      }

    } catch (error) {
      console.error('Error fetching product and category:', error);
    }
  };

  useEffect(() => {
    //debounce
    const timeoutId = setTimeout(() => {

      if (hsn.trim() !== "") {

        fetchProductAndCategory(hsn);
      }
    }, 1000);

    return () => {

      clearTimeout(timeoutId);
    };
  }, [hsn]);

  // useEffect(() => {

  //    setTimeout(() => {
  //     fetchProductAndCategory();
  //    }, 5000);

  //    return () => {
  //     clearTimeout(debounceTimeout);
  //   };
  // }, [hsn]);


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

        const dif = await axios.get(`${baseurl}/products/amount/sum/${product.invoice_id}`);
        const priceDifference = dif.data["Price Difference"];

        SetDiffernce(priceDifference.toFixed(2))

        const response = await axios.get(`${baseurl}/products/invoice/${product.invoice_id}`);
        if (response.status === 204) {
          // Handle scenario where invoice does not exist
          console.log('Invoice not found.');
        } else {
          // Invoice found, update state with invoice date
          setgetapi(response.data.product);
          console.log(response.data.product, "data fetched ")
          setFilteredData(response.data.product);
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
      {/* {
        error && " no product"
      } */}
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

        <ToastContainer />
        <div>

          <div className="w-10/12 mx-auto py-4">
            <h1 className="text-center mb-4 text-2xl font-bold">
              Product Details of {product.vendor}
            </h1>
            <div className="flex items-center justify-between gap-2">

              <div className="relative w-full mr-4">
                <input
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder=" 🔍️    Search"
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
                Create
              </button>
              <button className="px-4 py-2 bg-[#357D71] text-white text-end rounded hover:bg-[#1f6f62]" onClick={() => onProductSelect(null)}>Back </button>
            </div>
          </div>

          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"

          >
            <h2 className="text-lg  text-black text-bold font-bold mb-4">Product Details</h2>
            <form onSubmit={handleSubmit} ref={formRef}>


              <div className="mb-4">
                <label htmlFor="invoice_amount" className="block  text-black text-bold text-sm font-bold mb-2">HSN-Code</label>
                <div className="relative">
                  <input
                    type="number"
                    id="Enter Hsn"
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-md"
                    value={hsn}
                    onChange={(e) => Sethsn(e.target.value)}



                  />

                </div>



              </div>




              <div className="mb-4">
                <label htmlFor="invoice_number" className="block text-black  text-sm font-bold mb-2">Product Name:</label>
                {/* <input
                  type="text"
                  name="invoice_number"
                  value={productname}
                  onChange={(e) => setproductname(e.target.value)}
                  placeholder="Enter Product Name"
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                /> */}

                <Select
                  options={products}
                  onChange={(selectedOption) => setproductname(selectedOption)}
                  value={productname}
                  placeholder="Select a Product name"
                  isClearable
                // filterOption={customFilterOption}
                />
              </div>



              <div className="mb-4    ">
                <label htmlFor="invoice_number" className="block  text-black text-bold text-sm font-bold mb-2">Category:</label>

                {/* <select
                  id="category"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.category_name}>{category.category_name}</option>
                  ))}
                </select> */}

                <Select
                  options={categories}
                  placeholder="Select a Category name"
                  isClearable
                  onChange={(selectedOption) => setCategory(selectedOption)}
                  value={category}
                // filterOption={customFilterOption}
                />


              </div>



              <div className="mb-4">
                <label htmlFor="invoice_number" className="block  text-black text-bold text-sm font-bold mb-2">Bike-Category:</label>
                {/* <select
                  id="bikeCategory"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={bikeCategory}
                  onChange={(e) => setBikeCategory(e.target.value)}
                >
                  <option value="">Select Bike Category</option>
                  {bikeCategories.map((bikeCategory) => (
                    <option key={bikeCategory.id} value={bikeCategory.bike_name}>{bikeCategory.bike_name}</option>
                  ))}
                </select> */}

                <Select
                  options={bikeCategories}
                  placeholder="Select a Bike name"
                  isClearable
                  onChange={(selectedOption) => setBikeCategory(selectedOption)}
                  value={bikeCategory}
                // filterOption={customFilterOption}
                />
              </div>


              <div className="mb-4">
                <label htmlFor="invoice_amount" className="block  text-black text-bold text-sm font-bold  mb-2">Quantity</label>
                <div className="relative">
                  <input
                    type="number"
                    // onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                    onWheel={event => event.currentTarget.blur()}
                    placeholder='enter qunatity'
                    id="quantity"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                      appearance: "textfield",
                      margin: 0,
                    }}
                  />
                  <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none text-gray-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="invoice_date" className="block  text-black  text-sm font-bold mb-2">SIZE</label>
                <div className="relative">
                  {/* <select
                    id="size"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="">Select Size</option>
                    {sizeOptions.map((size) => (
                      <option key={size.id} value={size.size_name}>{size.size_name}</option>
                    ))}
                  </select> */}




                  <Select
                    options={sizeOptions}
                    placeholder="Select a Size name"
                    isClearable
                    onChange={(selectedOption) => setSelectedSize(selectedOption)}
                    value={selectedSize}
                  // filterOption={customFilterOption}
                  />
                  <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none text-gray-500">

                  </span>
                </div>
              </div>


              <div className="mb-4">
                <label htmlFor="inventory_paydate" className="block  text-black text-bold text-sm font-bold mb-2">Colour</label>
                <div className="relative">
                  {/* <select
                    id="color"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    <option value="">Select Color</option>
                    {colorOptions.map((color) => (
                      <option key={color.id} value={color.color_name}>{color.color_name}</option>
                    ))}
                  </select> */}



                  <Select
                    options={colorOptions}
                    placeholder="Select a Colour name"
                    isClearable
                    onChange={(selectedOption) => setSelectedColor(selectedOption)}
                    value={selectedColor}
                  // filterOption={customFilterOption}
                  />

                  <span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none">
                    {/* <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg> */}
                  </span>
                </div>
              </div>






              <div className="mb-4">
                <label htmlFor="vendor" className="block text-black text-bold text-sm font-bold mb-2">Gst</label>
                <div className="relative">

                  {/* <Select
                    options={cityOptions}
                    placeholder="Select a City name"
                    isClearable
                  // filterOption={customFilterOption}
                  /> */}




                  <select
                    className="px-4 py-1 mr-2 bg-[#EFEFEF] w-full rounded-lg font-bold  hover:bg-slate-200 transition duration-300 ease-in-out transform hover:scale-105 text-black "
                    value={Gst}
                    onChange={handleGstChange}
                  >
                    <option value="Select">Select </option>
                    <option value="GST 5">GST 5 </option>
                    <option value="GST 12">GST 12</option>
                    <option value="GST 18">GST 18</option>
                    <option value="GST 28"> GST 28</option>

                  </select>




                </div>
              </div>











              <div className="mb-4">
                <label htmlFor="vendor" className="block text-black text-bold text-sm font-bold mb-2">Unit</label>
                <div className="relative">

                  {/* <Select
                    options={cityOptions}
                    placeholder="Select a City name"
                    isClearable
                  // filterOption={customFilterOption}
                  /> */}




                  <select
                    className="px-4 py-1 mr-2 bg-[#EFEFEF] w-full rounded-lg font-bold  hover:bg-slate-200 transition duration-300 ease-in-out transform hover:scale-105 text-black "
                    value={unit}
                    onChange={handleUnitChange}
                  >
                    <option value="Select">Select </option>
                    <option value="NOS">NOS </option>
                    <option value="PACKET">PACKET</option>


                  </select>




                </div>
              </div>




              <div className="mb-4">
                <label htmlFor="invoice_amount" className="block  text-black text-boldtext-sm font-bold mb-2">Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    id="quantity"
                    onWheel={event => event.currentTarget.blur()}
                    placeholder='rate per item'
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={Amount}
                    onChange={(e) => setamount(e.target.value)}
                    style={{
                      WebkitAppearance: 'none',  // For Chrome, Safari, and Opera
                      MozAppearance: 'textfield',  // For Firefox
                      appearance: 'textfield'  // For modern browsers
                    }}
                  />

                </div>
              </div>






              <div className="mb-4">
                <label htmlFor="vendor" className="block  text-black text-bold text-sm font-bold mb-2">City</label>
                <div className="relative">
                  {/* <select
                    id="city"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">Select City</option>
                    {cityOptions.map((city) => (
                      <option key={city.id} value={city.city_name}>{city.city_name}</option>
                    ))}
                  </select> */}



                  <Select
                    options={cityOptions}
                    placeholder="Select a City name"
                    isClearable
                    onChange={(selectedOption) => setSelectedCity(selectedOption)}
                    value={selectedCity}
                  // filterOption={customFilterOption}
                  />


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

          </Modal>


        </div>

      </div>
      {/* style={{ maxHeight: '800px', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }} */}
      <div >

        {
          <Singleproduct filteredData={filteredData} onProductSelect={onProductSelect}
            data={getapidata} setFilteredData={setFilteredData}
            setdata={setgetapi} modal={openModal} onEdit={handleEdit} closemodal={closeModal} Differnce={Differnce} />
        }
      </div>


    </>

  )
}

export default ProductDetail