// src/components/LoginForm.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Test = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-8 rounded-md shadow-md bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-800 relative"
    >
      <div className="text-3xl font-bold mb-6 text-yellow-800">EVIFY</div>
      <form>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-4"
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border-none rounded-md bg-white text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-6"
        >
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border-none rounded-md bg-white text-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </motion.div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05, backgroundColor: '#FFB603' }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md focus:outline-none focus:ring focus:border-yellow-400"
          onClick={handleLogin}
        >
          Log in
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Test;
