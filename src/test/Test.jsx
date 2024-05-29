import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

// Function to fetch product categories from the API
const fetchProductCategories = async () => {
  try {
    const response = await axios.get('http://54.237.210.197:8000/get/product_category');
    console.log('Fetched products:', response.data.products);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return [];
  }
};

// Function to load and filter options based on user input
const loadOptions = async (inputValue, callback) => {
  try {
    const products = await fetchProductCategories();
    const filteredProducts = products.filter(product =>
      product.product_name.toLowerCase().includes(inputValue.toLowerCase())
    );
    const options = filteredProducts.map(product => ({
      label: product.product_name,
      value: product.product_id
    }));
    callback(options);
  } catch (error) {
    console.error("Error loading options:", error);
    callback([]);
  }
};

// Component rendering the AsyncSelect dropdown
const ProductSelect = () => {
  const [defaultOptions, setDefaultOptions] = useState([]);

  useEffect(() => {
    const loadDefaultOptions = async () => {
      const products = await fetchProductCategories();
      const options = products.map(product => ({
        label: product.product_name,
        value: product.product_id
      }));
      setDefaultOptions(options);
    };

    loadDefaultOptions();
  }, []);

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      placeholder="Search for a product..."
    />
  );
};

export default ProductSelect;
