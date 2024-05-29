// // ProductCategoryDropdown.js
// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import axios from 'axios';

// const ProductCategoryDropdown = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://54.237.210.197:8000/get/product_category');
//         const data=response.data.products
//         const categoryOptions = data.map(category => ({
//           value: category.product_id,
//           label: category.product_name,
//         }));
//         setCategories(categoryOptions);
//       } catch (err) {
//         setError('Failed to fetch categories');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <Select
//       options={categories}
//       placeholder="Select a category"
//       isClearable
//     />
//   );
// };

// export default ProductCategoryDropdown;




// ProductCategoryDropdown.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const ProductCategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://54.237.210.197:8000/get/product_category');
        const categoryOptions = response.data.products.map(category => ({
          value: category.product_id,
          label: category.product_name,
        }));
        setCategories(categoryOptions);
      } catch (err) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // const customFilterOption = (option, inputValue) => {
  //   const { label, value } = option;
  //   return (
  //     label.toLowerCase().includes(inputValue.toLowerCase()) ||
  //     value.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  // };

  return (
    <Select
      options={categories}
      placeholder="Select a category"
      isClearable
      // filterOption={customFilterOption}
    />
  );
};

export default ProductCategoryDropdown;
